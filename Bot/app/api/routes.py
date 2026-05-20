from pathlib import Path
from typing import List, Dict, Any, Optional
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.db.database import get_db
from app.db import crud
from app.core.config import settings
from app.core.logging_config import logger
from app.services import export

router = APIRouter()

# Pydantic Schemas
class SpeakerRenameRequest(BaseModel):
    speaker_label: str
    real_name: str

class SegmentResponse(BaseModel):
    start_time: float
    end_time: float
    text: str
    speaker_label: str
    confidence: Optional[float] = None

class JobResponse(BaseModel):
    id: str
    status: str
    original_filename: Optional[str]
    mime_type: Optional[str]
    file_size_bytes: Optional[int]
    duration_seconds: Optional[float]
    language_code: Optional[str]
    speakers_count: Optional[int]
    created_at: str
    completed_at: Optional[str]
    error_message: Optional[str]

# --- Endpoints ---

@router.get("/health")
def health_check():
    return {"status": "ok", "message": "Telegram AI Transcriber API is running"}

@router.get("/api/jobs")
def list_jobs(db: Session = Depends(get_db)):
    jobs = crud.get_all_jobs(db)
    result = []
    for j in jobs:
        result.append({
            "id": j.id,
            "status": j.status,
            "original_filename": j.original_filename,
            "file_size_bytes": j.file_size_bytes,
            "duration_seconds": j.duration_seconds,
            "language_code": j.language_code,
            "speakers_count": j.speakers_count,
            "created_at": j.created_at.isoformat(),
            "completed_at": j.completed_at.isoformat() if j.completed_at else None,
        })
    return result

@router.get("/api/jobs/{job_id}")
def get_job_status(job_id: str, db: Session = Depends(get_db)):
    job = crud.get_job(db, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    files = crud.get_job_files(db, job_id)
    files_list = [{"file_type": f.file_type, "file_name": f.file_name} for f in files]
    
    speaker_map = crud.get_speaker_map(db, job_id)
    
    return {
        "id": job.id,
        "status": job.status,
        "original_filename": job.original_filename,
        "mime_type": job.mime_type,
        "file_size_bytes": job.file_size_bytes,
        "duration_seconds": job.duration_seconds,
        "language_code": job.language_code,
        "speakers_count": job.speakers_count,
        "summary": job.summary,
        "translation": job.translation,
        "created_at": job.created_at.isoformat(),
        "completed_at": job.completed_at.isoformat() if job.completed_at else None,
        "error_message": job.error_message,
        "speaker_map": speaker_map,
        "files": files_list
    }

@router.get("/api/jobs/{job_id}/segments")
def get_job_segments(job_id: str, db: Session = Depends(get_db)):
    job = crud.get_job(db, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
        
    segments = crud.get_job_segments(db, job_id)
    return [
        {
            "start_time": s.start_time,
            "end_time": s.end_time,
            "text": s.text,
            "speaker_label": s.speaker_label,
            "confidence": s.confidence
        }
        for s in segments
    ]

@router.post("/api/jobs/{job_id}/rename-speaker")
def rename_speaker(
    job_id: str, 
    payload: SpeakerRenameRequest, 
    db: Session = Depends(get_db)
):
    """
    Renames a speaker label for a specific job (e.g. Speaker 1 -> Abdulloh).
    Triggers reconstruction/regeneration of the TXT and Word DOCX exports.
    """
    job = crud.get_job(db, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
        
    if job.status != "completed":
        raise HTTPException(status_code=400, detail="Cannot rename speakers for an uncompleted job")

    # Set new name mapping
    crud.set_speaker_name(db, job_id, payload.speaker_label, payload.real_name)
    logger.info(f"Renamed speaker '{payload.speaker_label}' to '{payload.real_name}' for job {job_id}")

    # Retrieve updated speaker map
    speaker_map = crud.get_speaker_map(db, job_id)
    
    # Retrieve segments
    db_segments = crud.get_job_segments(db, job_id)
    segments = [
        {
            "start_time": s.start_time,
            "end_time": s.end_time,
            "text": s.text,
            "speaker_label": s.speaker_label
        }
        for s in db_segments
    ]

    try:
        # Regenerate speaker txt
        speaker_txt_file = crud.get_job_file_by_type(db, job_id, "txt_speakers")
        if speaker_txt_file:
            export.generate_speaker_txt(segments, speaker_map, Path(speaker_txt_file.file_path))
            
        # Regenerate Word DOCX
        docx_file = crud.get_job_file_by_type(db, job_id, "docx")
        if docx_file:
            job_info = {
                "id": job.id,
                "original_filename": job.original_filename,
                "duration_seconds": job.duration_seconds,
                "language_code": job.language_code,
                "speakers_count": job.speakers_count
            }
            export.generate_docx(job_info, segments, speaker_map, job.summary, Path(docx_file.file_path))
            
        logger.info(f"Exports successfully regenerated for job {job_id} with new speaker mappings.")
    except Exception as e:
        logger.error(f"Failed to regenerate files after speaker rename: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to rebuild export files: {str(e)}")

    return {
        "status": "success",
        "message": f"Renamed {payload.speaker_label} to {payload.real_name}",
        "speaker_map": speaker_map
    }

@router.get("/api/jobs/{job_id}/download/{file_type}")
def download_job_file(job_id: str, file_type: str, db: Session = Depends(get_db)):
    """
    Downloads exported transcription documents.
    Supported types: txt, txt_speakers, docx, srt, json
    """
    file_record = crud.get_job_file_by_type(db, job_id, file_type)
    if not file_record:
        raise HTTPException(status_code=404, detail="Requested file type not found for this job")
        
    path = Path(file_record.file_path)
    if not path.exists():
        raise HTTPException(status_code=404, detail="File does not exist on disk storage")
        
    return FileResponse(
        path=path,
        media_type="application/octet-stream",
        filename=file_record.file_name
    )

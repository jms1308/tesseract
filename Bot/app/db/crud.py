from typing import List, Dict, Optional, Any
from datetime import datetime
from sqlalchemy.orm import Session
from app.db import models

# --- User CRUD ---
def get_user(db: Session, telegram_id: int) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.telegram_id == telegram_id).first()

def get_or_create_user(
    db: Session, 
    telegram_id: int, 
    username: Optional[str] = None, 
    first_name: Optional[str] = None
) -> models.User:
    user = get_user(db, telegram_id)
    if not user:
        user = models.User(
            telegram_id=telegram_id,
            username=username,
            first_name=first_name
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    return user

# --- Job CRUD ---
def get_job(db: Session, job_id: str) -> Optional[models.Job]:
    return db.query(models.Job).filter(models.Job.id == job_id).first()

def create_job(
    db: Session,
    telegram_user_id: Optional[int],
    telegram_chat_id: Optional[str],
    telegram_message_id: Optional[int] = None,
    original_filename: Optional[str] = None,
    mime_type: Optional[str] = None,
    file_size_bytes: Optional[int] = None,
) -> models.Job:
    job = models.Job(
        telegram_user_id=telegram_user_id,
        telegram_chat_id=telegram_chat_id,
        telegram_message_id=telegram_message_id,
        original_filename=original_filename,
        mime_type=mime_type,
        file_size_bytes=file_size_bytes,
        status="received"
    )
    db.add(job)
    db.commit()
    db.refresh(job)
    return job

def update_job_status(db: Session, job_id: str, status: str, error_message: Optional[str] = None) -> Optional[models.Job]:
    job = get_job(db, job_id)
    if job:
        job.status = status
        if error_message:
            job.error_message = error_message
        if status == "completed":
            job.completed_at = datetime.utcnow()
        elif status == "failed":
            job.completed_at = datetime.utcnow()
        db.commit()
        db.refresh(job)
    return job

def update_job(db: Session, job_id: str, updates: Dict[str, Any]) -> Optional[models.Job]:
    job = get_job(db, job_id)
    if job:
        for key, value in updates.items():
            if hasattr(job, key):
                setattr(job, key, value)
        db.commit()
        db.refresh(job)
    return job

def get_user_jobs(db: Session, telegram_user_id: int) -> List[models.Job]:
    return db.query(models.Job).filter(models.Job.telegram_user_id == telegram_user_id).order_by(models.Job.created_at.desc()).all()

def get_all_jobs(db: Session) -> List[models.Job]:
    return db.query(models.Job).order_by(models.Job.created_at.desc()).all()

# --- File CRUD ---
def create_file(
    db: Session, 
    job_id: str, 
    file_type: str, 
    file_path: str, 
    file_name: str
) -> models.File:
    db_file = models.File(
        job_id=job_id,
        file_type=file_type,
        file_path=file_path,
        file_name=file_name
    )
    db.add(db_file)
    db.commit()
    db.refresh(db_file)
    return db_file

def get_job_files(db: Session, job_id: str) -> List[models.File]:
    return db.query(models.File).filter(models.File.job_id == job_id).all()

def get_job_file_by_type(db: Session, job_id: str, file_type: str) -> Optional[models.File]:
    return db.query(models.File).filter(
        models.File.job_id == job_id, 
        models.File.file_type == file_type
    ).first()

# --- TranscriptSegment CRUD ---
def bulk_create_segments(db: Session, job_id: str, segments: List[Dict[str, Any]]):
    db_segments = [
        models.TranscriptSegment(
            job_id=job_id,
            start_time=s["start_time"],
            end_time=s["end_time"],
            text=s["text"],
            speaker_label=s.get("speaker_label", "Speaker 1"),
            confidence=s.get("confidence")
        )
        for s in segments
    ]
    db.bulk_save_objects(db_segments)
    db.commit()

def get_job_segments(db: Session, job_id: str) -> List[models.TranscriptSegment]:
    return db.query(models.TranscriptSegment).filter(
        models.TranscriptSegment.job_id == job_id
    ).order_by(models.TranscriptSegment.start_time.asc()).all()

# --- Speaker CRUD ---
def get_speaker_map(db: Session, job_id: str) -> Dict[str, str]:
    db_speakers = db.query(models.Speaker).filter(models.Speaker.job_id == job_id).all()
    return {s.speaker_label: s.real_name for s in db_speakers}

def set_speaker_name(db: Session, job_id: str, speaker_label: str, real_name: str) -> models.Speaker:
    speaker = db.query(models.Speaker).filter(
        models.Speaker.job_id == job_id,
        models.Speaker.speaker_label == speaker_label
    ).first()
    if speaker:
        speaker.real_name = real_name
    else:
        speaker = models.Speaker(
            job_id=job_id,
            speaker_label=speaker_label,
            real_name=real_name
        )
        db.add(speaker)
    db.commit()
    db.refresh(speaker)
    return speaker

# --- ErrorLog CRUD ---
def create_error_log(
    db: Session, 
    job_id: Optional[str], 
    step: str, 
    error_message: str, 
    traceback: Optional[str] = None
) -> models.ErrorLog:
    log = models.ErrorLog(
        job_id=job_id,
        step=step,
        error_message=error_message,
        traceback=traceback
    )
    db.add(log)
    db.commit()
    db.refresh(log)
    return log

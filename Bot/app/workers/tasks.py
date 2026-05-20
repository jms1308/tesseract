import asyncio
import time
import traceback
from pathlib import Path
from typing import List, Dict, Any, Optional
from telegram import Bot
from app.workers.celery_app import celery_app
from app.core.config import settings
from app.core.logging_config import logger
from app.db.database import SessionLocal
from app.db import crud
from app.services import (
    audio_preprocessing,
    transcription,
    diarization,
    alignment,
    translation,
    summarization,
    export
)
from app.utils.time_utils import format_seconds_to_hms

async def _send_telegram_message_async(chat_id: str, text: str):
    """
    Helper to send a text message via Telegram bot async.
    """
    try:
        bot = Bot(token=settings.TELEGRAM_BOT_TOKEN)
        await bot.send_message(chat_id=chat_id, text=text, parse_mode="HTML")
    except Exception as e:
        logger.error(f"Failed to send Telegram message: {str(e)}")

async def _send_telegram_docs_async(chat_id: str, document_paths: List[str], caption: str):
    """
    Helper to send documents via Telegram bot async.
    """
    try:
        bot = Bot(token=settings.TELEGRAM_BOT_TOKEN)
        await bot.send_message(chat_id=chat_id, text=caption, parse_mode="HTML")
        for path_str in document_paths:
            path = Path(path_str)
            if path.exists():
                logger.info(f"Sending document {path.name} to chat {chat_id}")
                with open(path, "rb") as f:
                    await bot.send_document(chat_id=chat_id, document=f, filename=path.name)
    except Exception as e:
        logger.error(f"Failed to send Telegram documents: {str(e)}")

def send_telegram_notification(chat_id: str, text: str, document_paths: Optional[List[str]] = None, is_error: bool = False):
    """
    Synchronous wrapper to run async Telegram notifications.
    """
    if not chat_id:
        return
        
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    try:
        if is_error or not document_paths:
            loop.run_until_complete(_send_telegram_message_async(chat_id, text))
        else:
            loop.run_until_complete(_send_telegram_docs_async(chat_id, document_paths, text))
    finally:
        loop.close()

@celery_app.task(name="app.workers.tasks.process_transcription_job", bind=True, max_retries=1)
def process_transcription_job(self, job_id: str, raw_file_path_str: str):
    """
    The main Celery task running the transcription & analysis pipeline.
    """
    logger.info(f"Worker received job {job_id} for file {raw_file_path_str}")
    start_time = time.time()
    
    db = SessionLocal()
    job = crud.get_job(db, job_id)
    if not job:
        logger.error(f"Job {job_id} not found in database.")
        db.close()
        return

    # Set up notification variables
    chat_id = job.telegram_chat_id
    original_filename = job.original_filename or "audio_file"
    
    try:
        # Step 1: Preprocessing
        crud.update_job_status(db, job_id, "preprocessing")
        send_telegram_notification(chat_id, f"⚙️ Preprocessing file: <b>{original_filename}</b>")
        
        raw_file_path = Path(raw_file_path_str)
        metadata = audio_preprocessing.validate_and_preprocess_file(raw_file_path, job_id)
        
        duration = metadata["duration"]
        file_size_bytes = metadata["file_size_bytes"]
        processed_wav_path = metadata["processed_wav_path"]
        chunks = metadata["chunks"]  # List[Tuple[Path, float]]
        
        crud.update_job(db, job_id, {
            "duration_seconds": duration,
            "file_size_bytes": file_size_bytes
        })

        # Step 2: Transcription
        crud.update_job_status(db, job_id, "transcribing")
        send_telegram_notification(chat_id, f"🎙️ Transcribing audio (Duration: {int(duration)}s)...")
        
        whisper_segments = []
        detected_languages = []
        
        for chunk_path, offset in chunks:
            logger.info(f"Transcribing chunk {chunk_path.name} at offset {offset}s")
            chunk_segments, chunk_lang = transcription.transcribe_audio(chunk_path, language=job.language_code or settings.LANGUAGE)
            
            detected_languages.append(chunk_lang)
            
            # Shift timestamps for this chunk back to match original WAV timeline
            for seg in chunk_segments:
                seg["start_time"] += offset
                seg["end_time"] += offset
                whisper_segments.append(seg)
                
        # Resolve detected language (majority vote or first chunk)
        detected_lang = detected_languages[0] if detected_languages else "en"
        crud.update_job(db, job_id, {
            "language_code": detected_lang
        })

        # Step 3: Speaker Diarization
        crud.update_job_status(db, job_id, "diarizing")
        send_telegram_notification(chat_id, "👥 Identifying speakers...")
        
        # Diarize the full processed audio file so speakers are consistent
        diarization_segments = diarization.diarize_audio(processed_wav_path)
        
        # Step 4: Alignment
        crud.update_job_status(db, job_id, "aligning")
        aligned_segments = alignment.align_segments(whisper_segments, diarization_segments)
        
        # Save segments to database
        crud.bulk_create_segments(db, job_id, aligned_segments)
        
        # Determine number of speakers
        speakers_set = {seg["speaker_label"] for seg in aligned_segments if seg.get("speaker_label")}
        speakers_count = len(speakers_set) if speakers_set else 1
        crud.update_job(db, job_id, {
            "speakers_count": speakers_count
        })

        # Pre-assemble full transcript text for LLM services
        # Formatted: Speaker Name: Text
        full_formatted_transcript_list = []
        for seg in aligned_segments:
            full_formatted_transcript_list.append(f"{seg['speaker_label']}: {seg['text']}")
        full_transcript_text = "\n".join(full_formatted_transcript_list)

        # Step 5: Translation (if enabled)
        translated_text = None
        if settings.ENABLE_TRANSLATION:
            crud.update_job_status(db, job_id, "translating")
            send_telegram_notification(chat_id, "🌐 Translating transcript...")
            translated_text = translation.translate_text(full_transcript_text)
            crud.update_job(db, job_id, {"translation": translated_text})

        # Step 6: Summarization (if enabled)
        summary_text = None
        if settings.ENABLE_SUMMARY:
            crud.update_job_status(db, job_id, "summarizing")
            send_telegram_notification(chat_id, "📝 Generating summary and action items...")
            summary_text = summarization.generate_summary(full_transcript_text)
            crud.update_job(db, job_id, {"summary": summary_text})

        # Step 7: Exporting Files
        crud.update_job_status(db, job_id, "exporting")
        send_telegram_notification(chat_id, "📂 Assembling output documents...")
        
        # Fetch Speaker name mappings (if any exist, though none on first run)
        speaker_map = crud.get_speaker_map(db, job_id)
        
        # Define paths
        plain_txt_path = settings.exports_dir / f"{job_id}_transcript.txt"
        speaker_txt_path = settings.exports_dir / f"{job_id}_transcript_with_speakers.txt"
        srt_path = settings.exports_dir / f"{job_id}_subtitles.srt"
        docx_path = settings.exports_dir / f"{job_id}_transcript_with_speakers.docx"
        json_path = settings.exports_dir / f"{job_id}_processing_report.json"
        
        # Build Exports
        export.generate_plain_txt(aligned_segments, plain_txt_path)
        export.generate_speaker_txt(aligned_segments, speaker_map, speaker_txt_path)
        export.generate_srt(aligned_segments, srt_path)
        
        # Setup Job info for DOCX and JSON
        job_info = {
            "id": job_id,
            "original_filename": original_filename,
            "duration_seconds": duration,
            "language_code": detected_lang,
            "speakers_count": speakers_count,
            "whisper_model": settings.WHISPER_MODEL,
            "processing_time_seconds": time.time() - start_time,
            "status": "completed",
            "error_message": None
        }
        
        export.generate_docx(job_info, aligned_segments, speaker_map, summary_text, docx_path)
        export.generate_technical_json(job_info, aligned_segments, json_path)
        
        # Record exports in database
        crud.create_file(db, job_id, "txt", str(plain_txt_path), f"{original_filename}_transcript.txt")
        crud.create_file(db, job_id, "txt_speakers", str(speaker_txt_path), f"{original_filename}_transcript_with_speakers.txt")
        crud.create_file(db, job_id, "srt", str(srt_path), f"{original_filename}_subtitles.srt")
        crud.create_file(db, job_id, "docx", str(docx_path), f"{original_filename}_transcript_with_speakers.docx")
        crud.create_file(db, job_id, "json", str(json_path), f"{original_filename}_processing_report.json")
        
        # Complete Job
        crud.update_job_status(db, job_id, "completed")
        logger.info(f"Job {job_id} completed successfully in {time.time() - start_time:.2f} seconds.")
        
        # Notify user with files
        export_paths = [
            str(docx_path),
            str(speaker_txt_path),
            str(srt_path),
            str(json_path)
        ]
        
        completion_msg = (
            f"✅ <b>Job Completed!</b>\n\n"
            f"📄 <b>File:</b> {original_filename}\n"
            f"⏱️ <b>Duration:</b> {format_seconds_to_hms(duration)}\n"
            f"🗣️ <b>Speakers:</b> {speakers_count}\n"
            f"🌍 <b>Language:</b> {detected_lang.upper()}\n"
            f"⚡ <b>Time Taken:</b> {int(time.time() - start_time)}s\n\n"
            f"Here are your transcription results:"
        )
        
        send_telegram_notification(chat_id, completion_msg, export_paths)
        
    except Exception as e:
        logger.error(f"Job {job_id} failed. Error: {str(e)}")
        tb = traceback.format_exc()
        logger.error(tb)
        
        # Save details to DB
        crud.create_error_log(db, job_id, "pipeline", str(e), tb)
        crud.update_job_status(db, job_id, "failed", error_message=str(e))
        
        # Notify user of failure
        fail_msg = (
            f"❌ <b>Processing failed</b>\n\n"
            f"📄 <b>File:</b> {original_filename}\n"
            f"⚠️ <b>Reason:</b> {str(e)[:200]}"
        )
        send_telegram_notification(chat_id, fail_msg, is_error=True)
        
    finally:
        db.close()

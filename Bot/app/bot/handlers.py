import os
import asyncio
from pathlib import Path
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ContextTypes
from telegram.error import TelegramError
from app.core.config import settings
from app.core.security import is_user_allowed
from app.core.logging_config import logger
from app.db.database import SessionLocal
from app.db import crud
from app.utils.file_utils import is_supported_file, sanitize_filename, get_file_extension
from app.utils.time_utils import format_seconds_to_hms
from app.workers.tasks import process_transcription_job
from app.bot import messages

async def check_auth(update: Update) -> bool:
    """
    Checks if the user is authorized. Sends an deny message if not.
    """
    user = update.effective_user
    if not user:
        return False
        
    if not is_user_allowed(user.id):
        await update.message.reply_html(messages.UNAUTHORIZED_MESSAGE)
        return False
        
    return True

async def start_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """
    Handles /start command.
    """
    if not await check_auth(update):
        return
        
    # Register/update user in DB
    db = SessionLocal()
    try:
        user = update.effective_user
        crud.get_or_create_user(
            db, 
            telegram_id=user.id, 
            username=user.username, 
            first_name=user.first_name
        )
    finally:
        db.close()
        
    await update.message.reply_html(messages.START_MESSAGE)

async def help_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """
    Handles /help command.
    """
    if not await check_auth(update):
        return
    await update.message.reply_html(messages.HELP_MESSAGE)

async def status_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """
    Handles /status <job_id> command.
    """
    if not await check_auth(update):
        return
        
    if not context.args:
        await update.message.reply_text("Please provide a Job ID. Example: /status 123e4567-e89b-12d3-a456-426614174000")
        return
        
    job_id = context.args[0].strip()
    db = SessionLocal()
    try:
        job = crud.get_job(db, job_id)
        if not job:
            await update.message.reply_text("Job not found. Check the Job ID and try again.")
            return
            
        status_emoji = {
            "received": "📥",
            "downloaded": "💾",
            "preprocessing": "⚙️",
            "transcribing": "🎙️",
            "diarizing": "👥",
            "aligning": "🧩",
            "translating": "🌐",
            "summarizing": "📝",
            "exporting": "📂",
            "completed": "✅",
            "failed": "❌"
        }.get(job.status, "❓")
        
        duration_str = format_seconds_to_hms(job.duration_seconds) if job.duration_seconds else "Unknown"
        
        msg = (
            f"📊 <b>Job Status Report</b>\n\n"
            f"🆔 <b>Job ID:</b> <code>{job.id}</code>\n"
            f"📄 <b>File:</b> {job.original_filename or 'Unknown'}\n"
            f"⏱️ <b>Duration:</b> {duration_str}\n"
            f"🌍 <b>Language:</b> {str(job.language_code).upper() if job.language_code else 'Auto'}\n"
            f"👤 <b>Speakers:</b> {job.speakers_count or 'Unknown'}\n"
            f"🕒 <b>Created:</b> {job.created_at.strftime('%Y-%m-%d %H:%M:%S UTC')}\n"
            f"{status_emoji} <b>Current Status:</b> <code>{job.status}</code>"
        )
        
        if job.status == "failed" and job.error_message:
            msg += f"\n\n⚠️ <b>Error:</b> <code>{job.error_message[:150]}</code>"
            
        await update.message.reply_html(msg)
    finally:
        db.close()

async def media_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """
    Handles voice, audio, video, and document files.
    """
    if not await check_auth(update):
        return

    message = update.message
    file_id = None
    original_filename = "voice_message.ogg"
    mime_type = "audio/ogg"
    file_size_bytes = 0

    if message.voice:
        file_id = message.voice.file_id
        original_filename = "voice_message.ogg"
        mime_type = "audio/ogg"
        file_size_bytes = message.voice.file_size
        
    elif message.audio:
        file_id = message.audio.file_id
        original_filename = message.audio.file_name or "audio_file.mp3"
        mime_type = message.audio.mime_type
        file_size_bytes = message.audio.file_size
        
    elif message.video:
        file_id = message.video.file_id
        original_filename = message.video.file_name or "video_file.mp4"
        mime_type = message.video.mime_type
        file_size_bytes = message.video.file_size
        
    elif message.document:
        doc = message.document
        if not is_supported_file(doc.file_name):
            await message.reply_html(messages.get_invalid_file_message(doc.file_name))
            return
            
        file_id = doc.file_id
        original_filename = doc.file_name
        mime_type = doc.mime_type
        file_size_bytes = doc.file_size

    if not file_id:
        return

    # Check file size limit
    size_mb = file_size_bytes / (1024 * 1024)
    if size_mb > settings.MAX_FILE_SIZE_MB:
        await message.reply_html(messages.get_file_size_exceeded_message(original_filename))
        return

    db = SessionLocal()
    job = None
    try:
        telegram_user = update.effective_user
        crud.get_or_create_user(
            db, 
            telegram_id=telegram_user.id, 
            username=telegram_user.username, 
            first_name=telegram_user.first_name
        )
        
        job = crud.create_job(
            db,
            telegram_user_id=telegram_user.id,
            telegram_chat_id=str(message.chat_id),
            telegram_message_id=message.message_id,
            original_filename=sanitize_filename(original_filename),
            mime_type=mime_type,
            file_size_bytes=file_size_bytes
        )
        
        # Immediate Status Reply with Language Buttons
        keyboard = [
            [
                InlineKeyboardButton("O'zbekcha 🇺🇿", callback_data=f"lang:uz:{job.id}"),
                InlineKeyboardButton("Русский 🇷🇺", callback_data=f"lang:ru:{job.id}")
            ],
            [
                InlineKeyboardButton("English 🇬🇧", callback_data=f"lang:en:{job.id}"),
                InlineKeyboardButton("Auto-detect 🔍", callback_data=f"lang:auto:{job.id}")
            ]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        status_msg = await message.reply_html(
            messages.get_choose_language_message(job.id),
            reply_markup=reply_markup
        )
        
        # Download file asynchronously in background
        async def download_task():
            db_inner = SessionLocal()
            try:
                crud.update_job_status(db_inner, job.id, "downloading")
                logger.info(f"Downloading file_id {file_id} ({original_filename}) from Telegram in background...")
                tg_file = await context.bot.get_file(file_id)
                
                ext = get_file_extension(original_filename) or "ogg"
                local_raw_name = f"{job.id}.{ext}"
                local_raw_path = settings.uploads_dir / local_raw_name
                
                await tg_file.download_to_drive(custom_path=local_raw_path)
                logger.info(f"File downloaded to {local_raw_path} in background")
                
                # Save downloaded file reference in database
                crud.create_file(db_inner, job.id, "raw", str(local_raw_path), local_raw_name)
                crud.update_job_status(db_inner, job.id, "downloaded")
                
                # Check if the user has already selected the language
                job_ref = crud.get_job(db_inner, job.id)
                if job_ref and job_ref.language_code and job_ref.status == "downloaded":
                    # Mark status as queued to prevent double dispatch
                    crud.update_job_status(db_inner, job.id, "queued")
                    
                    # Update status message to show it's processing
                    lang_names = {
                        "uz": "O'zbekcha 🇺🇿",
                        "ru": "Русский 🇷🇺",
                        "en": "English 🇬🇧",
                        "auto": "Auto-detect 🔍"
                    }
                    lang_name = lang_names.get(job_ref.language_code, job_ref.language_code.upper())
                    try:
                        await status_msg.edit_text(
                            messages.get_language_selected_message(lang_name),
                            parse_mode="HTML"
                        )
                    except Exception as msg_err:
                        logger.warning(f"Could not edit status message in download task: {str(msg_err)}")
                        
                    process_transcription_job.delay(job.id, str(local_raw_path))
                    logger.info(f"Job {job.id} dispatched to Celery worker (language already selected: {job_ref.language_code}).")
                    
            except TelegramError as te:
                logger.error(f"Telegram download failed: {str(te)}")
                error_msg = f"Telegram API download failed: {str(te)}"
                if "File is too big" in str(te):
                    error_msg = "Telegram restricts bots from downloading files larger than 20MB. Please use smaller files."
                    
                crud.create_error_log(db_inner, job.id, "downloading", str(te))
                crud.update_job_status(db_inner, job.id, "failed", error_message=error_msg)
                await status_msg.edit_text(f"❌ <b>Download Failed</b>\n\n⚠️ {error_msg}", parse_mode="HTML")
            except Exception as ex:
                logger.error(f"Background download failed: {str(ex)}")
                crud.create_error_log(db_inner, job.id, "downloading", str(ex))
                crud.update_job_status(db_inner, job.id, "failed", error_message=str(ex))
                await status_msg.edit_text(f"❌ <b>Download Failed</b>\n\n⚠️ {str(ex)}", parse_mode="HTML")
            finally:
                db_inner.close()

        # Run background download
        asyncio.create_task(download_task())
            
    except Exception as e:
        logger.error(f"Failed to initialize job: {str(e)}")
        if job:
            crud.create_error_log(db, job.id, "initialization", str(e))
            crud.update_job_status(db, job.id, "failed", error_message=str(e))
        await message.reply_text(f"❌ Failed to queue job. Error: {str(e)}")
    finally:
        db.close()

async def language_callback_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """
    Handles inline keyboard clicks for language selection.
    """
    query = update.callback_query
    await query.answer()
    
    data = query.data  # format: "lang:<lang_code>:<job_id>"
    parts = data.split(":")
    if len(parts) != 3:
        return
        
    lang_code = parts[1]
    job_id = parts[2]
    
    lang_names = {
        "uz": "O'zbekcha 🇺🇿",
        "ru": "Русский 🇷🇺",
        "en": "English 🇬🇧",
        "auto": "Auto-detect 🔍"
    }
    lang_name = lang_names.get(lang_code, lang_code.upper())
    
    db = SessionLocal()
    try:
        job = crud.get_job(db, job_id)
        if not job:
            await query.edit_message_text("❌ Job not found.")
            return
            
        if job.status not in ["received", "downloading", "downloaded"]:
            # If the job has already started (is queued or running) or failed, don't restart it
            await query.edit_message_text(f"⚠️ Job status is already: <b>{job.status}</b>", parse_mode="HTML")
            return
            
        # Update job language
        crud.update_job(db, job_id, {"language_code": lang_code})
        
        if job.status == "downloaded":
            # Change status to queued to prevent double dispatch
            crud.update_job_status(db, job_id, "queued")
            
            # Get raw file path from database to pass to celery
            raw_file = crud.get_job_file_by_type(db, job_id, "raw")
            if not raw_file:
                await query.edit_message_text("❌ Downloaded file reference not found in database.")
                return
                
            # Edit message to show selection and processing status
            await query.edit_message_text(
                messages.get_language_selected_message(lang_name),
                parse_mode="HTML"
            )
            
            # Dispatch Celery worker job
            process_transcription_job.delay(job_id, raw_file.file_path)
            logger.info(f"Job {job_id} dispatched to Celery worker queue with language {lang_code}.")
        else:
            # File is still downloading or received, just update UI to show selection & wait
            await query.edit_message_text(
                f"✅ Til tanlandi: <b>{lang_name}</b>\n"
                f"⏳ Fayl yuklanmoqda...",
                parse_mode="HTML"
            )
            logger.info(f"Language {lang_code} selected for job {job_id}. Waiting for download to finish...")
            
    except Exception as e:
        logger.error(f"Error in language_callback_handler: {str(e)}")
        await query.edit_message_text(f"❌ Xatolik yuz berdi: {str(e)}")
    finally:
        db.close()

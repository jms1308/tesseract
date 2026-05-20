from app.core.config import settings
from app.utils.file_utils import SUPPORTED_EXTENSIONS

START_MESSAGE = (
    "👋 <b>Welcome to the Enterprise AI Transcription Bot!</b>\n\n"
    "I am a production-ready assistant designed to transcribe and analyze your audio/video records.\n\n"
    "🎙️ <b>Supported Inputs:</b>\n"
    "• Telegram Voice messages\n"
    "• Audio files (mp3, ogg, wav, m4a, etc.)\n"
    "• Video files (mp4, mov, avi, etc.)\n"
    "• Uploaded documents containing audio/video files\n\n"
    "⚙️ <b>Settings Configured:</b>\n"
    f"• <b>Whisper Model:</b> <code>{settings.WHISPER_MODEL}</code>\n"
    f"• <b>Diarization:</b> <code>{'Enabled' if settings.ENABLE_DIARIZATION else 'Disabled'}</code>\n"
    f"• <b>Translation:</b> <code>{'Enabled (' + settings.TRANSLATION_TARGET_LANGUAGE + ')' if settings.ENABLE_TRANSLATION else 'Disabled'}</code>\n"
    f"• <b>Summary Layer:</b> <code>{'Enabled' if settings.ENABLE_SUMMARY else 'Disabled'}</code>\n"
    f"• <b>Max File Size:</b> <code>{settings.MAX_FILE_SIZE_MB} MB</code>\n\n"
    "📤 <b>Just send or forward me any audio/video/voice file to get started!</b>"
)

HELP_MESSAGE = (
    "📖 <b>How to Use This Bot:</b>\n\n"
    "1. **Send/Forward File**: Direct-message me or forward a voice, audio, or video message.\n"
    "2. **Processing Queue**: Once received, I will place it in my processing queue and send you a status update.\n"
    "3. **Outputs Delivery**: Upon completion, you will receive:\n"
    "   • <b>DOCX:</b> Professional Word report containing metadata, summary, and transcript with speaker labels.\n"
    "   • <b>TXT:</b> Speaker-labeled transcription text.\n"
    "   • <b>SRT:</b> Standard subtitle file for video players.\n"
    "   • <b>JSON:</b> Full technical processing report.\n\n"
    "🔧 <b>Commands:</b>\n"
    "/start - Start the bot and see configuration\n"
    "/help - Show this guide\n"
    "/status <code>&lt;job_id&gt;</code> - Check status of a specific job"
)

UNAUTHORIZED_MESSAGE = (
    "🚫 <b>Access Denied</b>\n\n"
    "Sorry, you are not authorized to use this bot. "
    "Please contact the administrator to whitelist your Telegram User ID."
)

def get_received_message(job_id: str) -> str:
    return (
        "📥 <b>File received successfully!</b>\n\n"
        "Your transcription job has been created.\n"
        f"🆔 <b>Job ID:</b> <code>{job_id}</code>\n"
        "⌛ <b>Status:</b> Queued for processing...\n\n"
        "You will receive status updates and final export documents here."
    )

def get_invalid_file_message(filename: str) -> str:
    return (
        f"⚠️ <b>Invalid file: {filename}</b>\n\n"
        f"Please upload a supported audio/video format. Supported extensions are:\n"
        f"<code>{', '.join(sorted(SUPPORTED_EXTENSIONS))}</code>"
    )

def get_file_size_exceeded_message(filename: str) -> str:
    return (
        f"⚠️ <b>File size limit exceeded: {filename}</b>\n\n"
        f"Your file size is larger than the configured maximum of <b>{settings.MAX_FILE_SIZE_MB} MB</b>."
    )

def get_choose_language_message(job_id: str) -> str:
    return (
        f"📥 <b>Fayl muvaffaqiyatli yuklab olindi!</b>\n\n"
        f"Iltimos, transkripsiya tilini tanlang:\n"
        f"🆔 <b>Job ID:</b> <code>{job_id}</code>"
    )

def get_language_selected_message(lang_name: str) -> str:
    return (
        f"✅ Til tanlandi: <b>{lang_name}</b>\n"
        f"⏳ Processing..."
    )

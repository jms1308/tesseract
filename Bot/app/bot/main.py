import sys
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, CallbackQueryHandler, filters
from app.core.config import settings
from app.core.logging_config import logger
from app.db.database import init_db
from app.bot import handlers

def main():
    """
    Main entry point for starting the Telegram Bot.
    """
    logger.info("Initializing database tables for bot session...")
    try:
        init_db()
    except Exception as e:
        logger.error(f"Failed to initialize database: {str(e)}")
        # Continue to see if it succeeds later
 
    token = settings.TELEGRAM_BOT_TOKEN
    if not token:
        logger.error("TELEGRAM_BOT_TOKEN is not configured. Exiting.")
        sys.exit(1)

    logger.info("Starting Telegram Bot application builder...")
    app = ApplicationBuilder().token(token).build()

    # Register command handlers
    app.add_handler(CommandHandler("start", handlers.start_handler))
    app.add_handler(CommandHandler("help", handlers.help_handler))
    app.add_handler(CommandHandler("status", handlers.status_handler))

    # Register media message handlers (filters for voice, audio, video, and documents)
    media_filter = (
        filters.VOICE | 
        filters.AUDIO | 
        filters.VIDEO | 
        filters.Document.ALL
    )
    app.add_handler(MessageHandler(media_filter, handlers.media_handler))
    app.add_handler(CallbackQueryHandler(handlers.language_callback_handler, pattern="^lang:"))

    logger.info("Telegram Bot is fully initialized. Starting polling loop...")
    app.run_polling()

if __name__ == "__main__":
    main()

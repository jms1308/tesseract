from app.core.config import settings
from app.core.logging_config import logger

def is_user_allowed(telegram_user_id: int) -> bool:
    """
    Checks if a Telegram user is allowed to interact with the bot.
    If ALLOWED_USER_IDS is empty, access is public.
    """
    allowed_list = settings.allowed_users_list
    if not allowed_list:
        return True
    
    is_allowed = telegram_user_id in allowed_list
    if not is_allowed:
        logger.warning(f"Unauthorized access attempt by Telegram User ID: {telegram_user_id}")
    return is_allowed

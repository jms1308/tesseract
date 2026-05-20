import os
from pathlib import Path
from typing import List, Optional
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

# Base directory of the project
BASE_DIR = Path(__file__).resolve().parent.parent.parent

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=os.path.join(BASE_DIR, ".env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )

    # Telegram Bot
    TELEGRAM_BOT_TOKEN: str
    ALLOWED_USER_IDS: Optional[str] = None  # Comma-separated string of IDs

    @property
    def allowed_users_list(self) -> List[int]:
        if not self.ALLOWED_USER_IDS:
            return []
        try:
            return [int(uid.strip()) for uid in self.ALLOWED_USER_IDS.split(",") if uid.strip()]
        except ValueError:
            return []

    # Database & Redis
    DATABASE_URL: str = "postgresql://postgres:postgres@postgres:5432/transcriber"
    REDIS_URL: str = "redis://redis:6379/0"

    # Whisper Settings
    WHISPER_MODEL: str = "turbo"
    WHISPER_DEVICE: str = "cpu"
    WHISPER_COMPUTE_TYPE: str = "int8"
    LANGUAGE: str = "uz"

    # Diarization
    ENABLE_DIARIZATION: bool = True
    PYANNOTE_AUTH_TOKEN: Optional[str] = None
    MIN_SPEAKERS: Optional[int] = None
    MAX_SPEAKERS: Optional[int] = None

    # Translation
    ENABLE_TRANSLATION: bool = False
    TRANSLATION_PROVIDER: str = "gemini"  # gemini, openai
    TRANSLATION_TARGET_LANGUAGE: str = "English"

    # Summarization
    ENABLE_SUMMARY: bool = False
    LLM_PROVIDER: str = "gemini"          # gemini, openai
    LLM_API_KEY: Optional[str] = None

    # Limits and Policies
    MAX_FILE_SIZE_MB: int = 2048
    CHUNK_LENGTH_MINUTES: int = 10
    CLEANUP_AFTER_DAYS: int = 7

    # Storage Paths
    STORAGE_DIR: str = str(BASE_DIR / "storage")

    @property
    def uploads_dir(self) -> Path:
        p = Path(self.STORAGE_DIR) / "uploads"
        p.mkdir(parents=True, exist_ok=True)
        return p

    @property
    def processed_dir(self) -> Path:
        p = Path(self.STORAGE_DIR) / "processed"
        p.mkdir(parents=True, exist_ok=True)
        return p

    @property
    def exports_dir(self) -> Path:
        p = Path(self.STORAGE_DIR) / "exports"
        p.mkdir(parents=True, exist_ok=True)
        return p

settings = Settings()

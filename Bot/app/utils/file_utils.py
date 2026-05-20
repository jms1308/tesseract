import os
import re
import time
from pathlib import Path
from typing import Set
from app.core.config import settings
from app.core.logging_config import logger

SUPPORTED_EXTENSIONS: Set[str] = {
    # Audio
    "ogg", "mp3", "m4a", "wav", "flac", "aac", "opus", "wma", "amr",
    # Video
    "mp4", "mov", "avi", "mkv", "webm", "3gp", "flv"
}

def is_supported_file(filename: str) -> bool:
    """
    Checks if the filename has a supported audio/video extension.
    """
    ext = get_file_extension(filename)
    return ext in SUPPORTED_EXTENSIONS

def get_file_extension(filename: str) -> str:
    """
    Extracts the lowercase extension from a filename.
    """
    if "." not in filename:
        return ""
    return filename.rsplit(".", 1)[1].lower()

def is_file_size_valid(filepath: Path) -> bool:
    """
    Validates if the file size is under the configured maximum limit.
    """
    if not filepath.exists():
        return False
    size_mb = filepath.stat().st_size / (1024 * 1024)
    return size_mb <= settings.MAX_FILE_SIZE_MB

def sanitize_filename(filename: str) -> str:
    """
    Sanitizes filename by replacing non-alphanumeric characters (except dots and dashes).
    """
    name, ext = os.path.splitext(filename)
    # Allow alphanumeric, dashes, and underscores
    sanitized_name = re.sub(r"[^\w\-_]", "_", name)
    # Re-assemble
    return f"{sanitized_name}{ext.lower()}"

def run_storage_cleanup():
    """
    Deletes files in uploads, processed, and exports directories older than X days.
    """
    days = settings.CLEANUP_AFTER_DAYS
    if days <= 0:
        logger.info("Storage cleanup policy disabled (CLEANUP_AFTER_DAYS <= 0)")
        return

    logger.info(f"Running storage cleanup. Removing files older than {days} days...")
    cutoff_time = time.time() - (days * 86400)
    deleted_count = 0
    deleted_bytes = 0

    target_dirs = [
        settings.uploads_dir,
        settings.processed_dir,
        settings.exports_dir
    ]

    # Include logs directory if it exists
    log_dir = Path(settings.STORAGE_DIR) / "logs"
    if log_dir.exists():
        target_dirs.append(log_dir)

    for directory in target_dirs:
        if not directory.exists():
            continue
            
        for root, _, files in os.walk(directory):
            for file in files:
                filepath = Path(root) / file
                # Skip active system files if needed, or delete based on modification time
                try:
                    mtime = filepath.stat().st_mtime
                    if mtime < cutoff_time:
                        file_size = filepath.stat().st_size
                        filepath.unlink()
                        deleted_count += 1
                        deleted_bytes += file_size
                        logger.debug(f"Cleanup: Deleted file {filepath}")
                except Exception as e:
                    logger.error(f"Cleanup: Error deleting {filepath}: {str(e)}")

    mb_freed = deleted_bytes / (1024 * 1024)
    logger.info(f"Storage cleanup completed. Deleted {deleted_count} files. Freed {mb_freed:.2f} MB.")

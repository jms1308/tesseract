import torch
import threading
from pathlib import Path
from typing import List, Dict, Any, Optional
from pyannote.audio import Pipeline
from app.core.config import settings
from app.core.logging_config import logger

_pipeline_lock = threading.Lock()
_cached_pipeline: Optional[Pipeline] = None
_load_failed = False

def get_diarization_pipeline() -> Optional[Pipeline]:
    """
    Loads and caches the Pyannote speaker diarization pipeline.
    Returns None if loading fails, is disabled, or token is missing.
    """
    global _cached_pipeline, _load_failed
    
    if not settings.ENABLE_DIARIZATION:
        logger.info("Speaker diarization is disabled via settings.")
        return None
        
    if not settings.PYANNOTE_AUTH_TOKEN:
        logger.warning("PYANNOTE_AUTH_TOKEN is not configured. Diarization will be skipped.")
        return None

    if _load_failed:
        # Avoid repeatedly trying to load if it previously failed (e.g. invalid token)
        return None

    with _pipeline_lock:
        if _cached_pipeline is None:
            logger.info("Initializing pyannote/speaker-diarization-3.1 pipeline...")
            try:
                # Load pipeline
                pipeline = Pipeline.from_pretrained(
                    "pyannote/speaker-diarization-3.1",
                    use_auth_token=settings.PYANNOTE_AUTH_TOKEN
                )
                
                if pipeline is None:
                    # Try previous version as fallback
                    logger.info("v3.1 not found. Trying pyannote/speaker-diarization-3.0...")
                    pipeline = Pipeline.from_pretrained(
                        "pyannote/speaker-diarization-3.0",
                        use_auth_token=settings.PYANNOTE_AUTH_TOKEN
                    )
                
                if pipeline is not None:
                    # Move to GPU if requested and available
                    device_str = settings.WHISPER_DEVICE.lower()
                    if device_str == "cuda" and torch.cuda.is_available():
                        pipeline.to(torch.device("cuda"))
                        logger.info("Pyannote diarization pipeline loaded and moved to GPU.")
                    else:
                        pipeline.to(torch.device("cpu"))
                        logger.info("Pyannote diarization pipeline loaded on CPU.")
                    _cached_pipeline = pipeline
                else:
                    logger.error("Failed to load Pyannote pipeline: Pipeline returned None.")
                    _load_failed = True
            except Exception as e:
                logger.error(f"Failed to load Pyannote diarization pipeline: {str(e)}")
                logger.error("Diarization tasks will fall back to transcription-only.")
                _load_failed = True
                
        return _cached_pipeline

def diarize_audio(
    file_path: Path,
    min_speakers: Optional[int] = None,
    max_speakers: Optional[int] = None
) -> List[Dict[str, Any]]:
    """
    Runs speaker diarization on a WAV file.
    Returns:
      A list of segments with speaker labels:
      [ { "start_time": float, "end_time": float, "speaker_label": str }, ... ]
    """
    pipeline = get_diarization_pipeline()
    if pipeline is None:
        logger.info("Skipping diarization (pipeline not available or disabled).")
        return []

    # Configure min/max speakers
    min_spk = min_speakers if min_speakers is not None else settings.MIN_SPEAKERS
    max_spk = max_speakers if max_speakers is not None else settings.MAX_SPEAKERS

    kwargs = {}
    if min_spk is not None:
        kwargs["min_speakers"] = min_spk
    if max_spk is not None:
        kwargs["max_speakers"] = max_spk

    logger.info(f"Running Pyannote speaker diarization for {file_path.name} (min_speakers={min_spk}, max_speakers={max_spk})...")
    
    try:
        diarization_result = pipeline(str(file_path), **kwargs)
        
        segments = []
        for turn, _, speaker in diarization_result.itertracks(yield_label=True):
            # Map standard speaker names e.g. SPEAKER_00 -> Speaker 1
            # Get integer from end of label if possible
            try:
                num = int(speaker.split("_")[-1])
                mapped_label = f"Speaker {num + 1}"
            except ValueError:
                mapped_label = speaker
                
            segments.append({
                "start_time": float(turn.start),
                "end_time": float(turn.end),
                "speaker_label": mapped_label
            })
            
        logger.info(f"Speaker diarization completed. Found {len(segments)} speaker turns.")
        return segments
    except Exception as e:
        logger.error(f"Error during speaker diarization: {str(e)}")
        # Return empty list representing diarization failure (so system falls back gracefully)
        return []

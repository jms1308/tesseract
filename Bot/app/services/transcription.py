import threading
from pathlib import Path
from typing import List, Dict, Any, Tuple, Optional
from faster_whisper import WhisperModel
from app.core.config import settings
from app.core.logging_config import logger

# Thread lock for model loading to avoid race conditions
_model_lock = threading.Lock()
_cached_model: Optional[WhisperModel] = None

def get_whisper_model() -> WhisperModel:
    """
    Returns the cached WhisperModel instance, loading it if not already cached.
    Uses configuration settings from the env file.
    """
    global _cached_model
    with _model_lock:
        if _cached_model is None:
            model_size = settings.WHISPER_MODEL
            device = settings.WHISPER_DEVICE
            compute_type = settings.WHISPER_COMPUTE_TYPE
            
            logger.info(f"Loading Whisper model: size={model_size}, device={device}, compute_type={compute_type}...")
            try:
                models_dir = Path(settings.STORAGE_DIR) / "whisper_models"
                models_dir.mkdir(parents=True, exist_ok=True)
                
                _cached_model = WhisperModel(
                    model_size_or_path=model_size,
                    device=device,
                    compute_type=compute_type,
                    download_root=str(models_dir)
                )
                logger.info("Whisper model loaded successfully.")
            except Exception as e:
                logger.error(f"Failed to load Whisper model: {str(e)}")
                raise e
        return _cached_model

def transcribe_audio(
    file_path: Path, 
    language: Optional[str] = None
) -> Tuple[List[Dict[str, Any]], str]:
    """
    Transcribes a WAV audio file.
    If language is 'auto' or None, language auto-detection is performed.
    Returns:
      - A list of segments, where each segment is a dict:
        { 'start_time': float, 'end_time': float, 'text': str, 'confidence': float }
      - Detected language code (str)
    """
    model = get_whisper_model()
    
    # Handle language config
    lang_param = None
    if language and language.lower() != "auto":
        lang_param = language.lower()
        
    logger.info(f"Starting Whisper transcription for {file_path.name} (language={lang_param or 'auto-detect'})...")
    
    try:
        segments, info = model.transcribe(
            str(file_path),
            beam_size=5,
            language=lang_param,
            vad_filter=True
        )
        
        detected_lang = info.language
        logger.info(f"Whisper: Detected language is '{detected_lang}' with probability {info.language_probability:.2f}")
        
        results = []
        for segment in segments:
            # Calculate confidence using exponential of average log probability
            # avg_logprob is log-likelihood, e^avg_logprob converts it to a 0-1 scale
            confidence = float(min(1.0, max(0.0, 2.71828 ** segment.avg_logprob))) if segment.avg_logprob else 1.0
            
            results.append({
                "start_time": float(segment.start),
                "end_time": float(segment.end),
                "text": segment.text.strip(),
                "confidence": confidence
            })
            
        logger.info(f"Whisper transcription completed. Generated {len(results)} segments.")
        return results, detected_lang
        
    except Exception as e:
        logger.error(f"Error during transcription: {str(e)}")
        raise RuntimeError(f"Whisper transcription failed: {str(e)}")

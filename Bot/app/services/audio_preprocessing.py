import subprocess
import os
from pathlib import Path
from typing import List, Tuple, Dict, Any
from app.core.config import settings
from app.core.logging_config import logger
from app.utils.file_utils import is_supported_file, is_file_size_valid

def get_audio_duration(file_path: Path) -> float:
    """
    Retrieves the duration of an audio/video file in seconds using ffprobe.
    """
    cmd = [
        "ffprobe",
        "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        str(file_path)
    ]
    try:
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
        duration_str = result.stdout.strip()
        if not duration_str or duration_str == "N/A":
            # Try to get duration from streams if format duration is missing
            cmd_stream = [
                "ffprobe",
                "-v", "error",
                "-select_streams", "a:0",
                "-show_entries", "stream=duration",
                "-of", "default=noprint_wrappers=1:nokey=1",
                str(file_path)
            ]
            result_stream = subprocess.run(cmd_stream, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
            duration_str = result_stream.stdout.strip()
            
        return float(duration_str)
    except Exception as e:
        logger.error(f"Failed to get audio duration for {file_path}. Error: {str(e)}")
        # Raise exception so the job status changes to failed properly
        raise RuntimeError(f"FFprobe duration detection failed: {str(e)}")

def convert_to_wav(input_path: Path, output_path: Path) -> Path:
    """
    Converts any supported audio/video file to WAV 16kHz mono 16-bit PCM using FFmpeg.
    """
    cmd = [
        "ffmpeg",
        "-y",
        "-i", str(input_path),
        "-ar", "16000",
        "-ac", "1",
        "-c:a", "pcm_s16le",
        str(output_path)
    ]
    logger.info(f"Converting {input_path.name} to WAV...")
    try:
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
        logger.info(f"Successfully converted to {output_path}")
        return output_path
    except subprocess.CalledProcessError as e:
        logger.error(f"FFmpeg conversion failed. Stderr: {e.stderr}")
        raise RuntimeError(f"FFmpeg conversion failed: {e.stderr}")

def split_wav_file(wav_path: Path, chunk_length_minutes: int) -> List[Tuple[Path, float]]:
    """
    Splits a WAV file into chunks of specified minutes.
    Returns a list of tuples containing (chunk_file_path, start_offset_seconds).
    """
    if chunk_length_minutes <= 0:
        return [(wav_path, 0.0)]

    duration = get_audio_duration(wav_path)
    chunk_length_seconds = chunk_length_minutes * 60

    if duration <= chunk_length_seconds:
        logger.info(f"File duration ({duration:.2f}s) is less than chunk length ({chunk_length_seconds}s). No chunking needed.")
        return [(wav_path, 0.0)]

    logger.info(f"Splitting WAV file into {chunk_length_minutes}-minute chunks. Total duration: {duration:.2f}s")
    
    # We will segment the WAV file
    output_dir = wav_path.parent
    base_name = wav_path.stem
    chunk_pattern = str(output_dir / f"{base_name}_chunk_%03d.wav")

    cmd = [
        "ffmpeg",
        "-y",
        "-i", str(wav_path),
        "-f", "segment",
        "-segment_time", str(chunk_length_seconds),
        "-c", "copy",
        chunk_pattern
    ]
    
    try:
        subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
    except subprocess.CalledProcessError as e:
        logger.error(f"FFmpeg chunking failed. Stderr: {e.stderr}")
        raise RuntimeError(f"FFmpeg chunking failed: {e.stderr}")

    # Discover the created chunk files
    chunks = []
    chunk_idx = 0
    while True:
        chunk_file = output_dir / f"{base_name}_chunk_{chunk_idx:03d}.wav"
        if not chunk_file.exists():
            break
        
        start_offset = chunk_idx * chunk_length_seconds
        chunks.append((chunk_file, start_offset))
        chunk_idx += 1

    logger.info(f"Created {len(chunks)} chunks.")
    return chunks

def validate_and_preprocess_file(input_path: Path, job_id: str) -> Dict[str, Any]:
    """
    Performs full validation on input file and converts it to a standard WAV format.
    Handles optional chunking.
    Returns metadata dict with:
      - duration: float
      - file_size: int
      - processed_wav_path: Path
      - chunks: List[Tuple[Path, float]] (list of chunk paths and their start times)
    """
    if not input_path.exists():
        raise FileNotFoundError(f"Input file does not exist: {input_path}")

    # File size validation
    if not is_file_size_valid(input_path):
        raise ValueError(f"File exceeds maximum size limit of {settings.MAX_FILE_SIZE_MB}MB")

    # Extension validation
    if not is_supported_file(input_path.name):
        raise ValueError(f"Unsupported file format. Supported extensions: {', '.join(SUPPORTED_EXTENSIONS)}")

    # Detect duration before conversion (works on original media file)
    duration = get_audio_duration(input_path)
    file_size_bytes = input_path.stat().st_size

    # Convert to WAV
    output_wav_name = f"{job_id}.wav"
    output_wav_path = settings.processed_dir / output_wav_name
    convert_to_wav(input_path, output_wav_path)

    # Perform chunking if enabled
    chunks = split_wav_file(output_wav_path, settings.CHUNK_LENGTH_MINUTES)

    return {
        "duration": duration,
        "file_size_bytes": file_size_bytes,
        "processed_wav_path": output_wav_path,
        "chunks": chunks
    }

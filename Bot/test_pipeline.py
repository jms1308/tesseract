import os
import sys
import json
from pathlib import Path
from datetime import datetime

# Add app to system path for imports
sys.path.append(str(Path(__file__).resolve().parent))

from app.core.config import settings
from app.services import export
from app.utils.time_utils import format_seconds_to_hms
from app.utils.file_utils import sanitize_filename

def run_test_exports():
    """
    Tests document exports generation (TXT, DOCX, SRT, JSON) using mock transcription results.
    """
    print("\n=============================================")
    print("Testing Export Formats Generation...")
    print("=============================================")
    
    # Ensure storage/exports exists
    settings.exports_dir.mkdir(parents=True, exist_ok=True)
    
    # Mock data
    job_id = "test-job-uuid-12345"
    original_filename = "test_meeting.mp3"
    duration = 145.5  # 2m 25.5s
    detected_lang = "en"
    speakers_count = 2
    
    mock_segments = [
        {
            "start_time": 1.2,
            "end_time": 8.5,
            "text": "Hello everyone, welcome to our weekly project sync. Today we are discussing the Telegram transcriber launch.",
            "speaker_label": "Speaker 1"
        },
        {
            "start_time": 10.0,
            "end_time": 18.2,
            "text": "Thanks. I have finalized the database schemas and the Celery workers. The docker setup is also ready.",
            "speaker_label": "Speaker 2"
        },
        {
            "start_time": 19.5,
            "end_time": 25.0,
            "text": "Excellent! Abdulloh, what about the Hugging Face pyannote token for speaker identification?",
            "speaker_label": "Speaker 1"
        },
        {
            "start_time": 25.5,
            "end_time": 35.1,
            "text": "Yes, we need to accept terms on their model card page. Once that is done, the token will authorize the diarization task.",
            "speaker_label": "Speaker 2"
        },
        {
            "start_time": 36.0,
            "end_time": 45.0,
            "text": "Great, let's aim to deploy the production build by Friday. I will verify the bot features tomorrow.",
            "speaker_label": "Speaker 1"
        }
    ]
    
    mock_speaker_map = {
        "Speaker 1": "Manager (Sarah)",
        "Speaker 2": "Abdulloh (Developer)"
    }
    
    mock_summary = (
        "**Executive Summary**\n"
        "Weekly project sync discussing the deployment of the Telegram transcription system.\n\n"
        "**Key Discussion Points**\n"
        "- DB schemas and Celery workers are fully implemented.\n"
        "- Hugging Face pyannote model access requires accepting terms on Pyannote's HF card.\n"
        "- Production deployment is targeted for Friday.\n\n"
        "**Decisions Made**\n"
        "- Target production deploy date set to Friday.\n\n"
        "**Action Items**\n"
        "- Accept pyannote terms and configure HF token (Responsible: Abdulloh, Deadline: Thursday)\n"
        "- Verify Telegram bot features locally (Responsible: Sarah, Deadline: Wednesday)"
    )

    # Define paths
    plain_txt_path = settings.exports_dir / f"{job_id}_transcript.txt"
    speaker_txt_path = settings.exports_dir / f"{job_id}_transcript_with_speakers.txt"
    srt_path = settings.exports_dir / f"{job_id}_subtitles.srt"
    docx_path = settings.exports_dir / f"{job_id}_transcript_with_speakers.docx"
    json_path = settings.exports_dir / f"{job_id}_processing_report.json"
    
    # Generate files
    print("Generating TXT...")
    export.generate_plain_txt(mock_segments, plain_txt_path)
    print(f"Created: {plain_txt_path} ({plain_txt_path.stat().st_size} bytes)")
    
    print("Generating Speaker TXT...")
    export.generate_speaker_txt(mock_segments, mock_speaker_map, speaker_txt_path)
    print(f"Created: {speaker_txt_path} ({speaker_txt_path.stat().st_size} bytes)")
    
    print("Generating SRT...")
    export.generate_srt(mock_segments, srt_path)
    print(f"Created: {srt_path} ({srt_path.stat().st_size} bytes)")
    
    # Setup metadata for DOCX and JSON
    job_info = {
        "id": job_id,
        "original_filename": original_filename,
        "duration_seconds": duration,
        "language_code": detected_lang,
        "speakers_count": speakers_count,
        "whisper_model": settings.WHISPER_MODEL,
        "processing_time_seconds": 2.45,
        "status": "completed",
        "error_message": None
    }
    
    print("Generating DOCX...")
    export.generate_docx(job_info, mock_segments, mock_speaker_map, mock_summary, docx_path)
    print(f"Created: {docx_path} ({docx_path.stat().st_size} bytes)")
    
    print("Generating JSON...")
    export.generate_technical_json(job_info, mock_segments, json_path)
    print(f"Created: {json_path} ({json_path.stat().st_size} bytes)")
    
    print("\n🎉 Export testing completed successfully! All files are in storage/exports/")

def check_ffmpeg_installation():
    """
    Checks if ffmpeg and ffprobe are installed and accessible.
    """
    print("\n=============================================")
    print("Checking FFmpeg Installation...")
    print("=============================================")
    
    import subprocess
    try:
        ffmpeg_ver = subprocess.run(["ffmpeg", "-version"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        print("✅ FFmpeg is installed:")
        print(ffmpeg_ver.stdout.split("\n")[0])
    except FileNotFoundError:
        print("❌ FFmpeg is NOT installed. Please install FFmpeg (brew install ffmpeg / apt install ffmpeg).")
        
    try:
        ffprobe_ver = subprocess.run(["ffprobe", "-version"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        print("✅ FFprobe is installed:")
        print(ffprobe_ver.stdout.split("\n")[0])
    except FileNotFoundError:
        print("❌ FFprobe is NOT installed.")

if __name__ == "__main__":
    check_ffmpeg_installation()
    run_test_exports()

# Telegram AI Transcriber

A production-ready Telegram-based transcription system designed for enterprise use cases. It accepts audio, voice, video, and documents, converts them to mono 16kHz WAV format, transcribes using `faster-whisper`, separates speakers using `pyannote.audio`, summarizes/translates using LLMs (Gemini/OpenAI), and exports formatted results (TXT, DOCX, SRT, JSON).

---

## Table of Contents
1. [Architecture](#architecture)
2. [Features](#features)
3. [Prerequisites & Key Generation](#prerequisites--key-generation)
4. [Installation & Local Setup](#installation--local-setup)
5. [Docker Deployment](#docker-deployment)
6. [Environment Variables](#environment-variables)
7. [Processing Long Audio](#processing-long-audio)
8. [Speaker Naming & API Access](#speaker-naming--api-access)
9. [Known Limitations](#known-limitations)
10. [Production Deployment Notes](#production-deployment-notes)

---

## Architecture

The system follows a decoupled, queue-driven backend architecture:

```
                  ┌──────────────────────┐
                  │     Telegram Bot     │
                  └──────────┬───────────┘
                             │ (Webhooks / Polling)
                             ▼
┌──────────────┐  API Request┌──────────────┐
│  API Client  ├────────────>│ FastAPI App  │
└──────────────┘             └──────┬───────┘
                                    │
                                    ▼ (SQLAlchemy)
┌──────────────┐             ┌──────┴───────┐
│  PostgreSQL  │<────────────┤  Database    │
└──────────────┘             └──────┬───────┘
                                    │ (Celery Task)
                                    ▼
┌──────────────┐             ┌──────┴───────┐
│    Redis     │<────────────┤ Celery Queue │
└──────────────┘             └──────┬───────┘
                                    │
                                    ▼
                             ┌──────┴───────┐
                             │ Celery Worker│
                             └──────┬───────┘
                                    │
    ┌────────────────┬──────────────┼────────────────┐
    ▼                ▼              ▼                ▼
┌───────────┐  ┌───────────┐  ┌───────────┐  ┌──────────────┐
│  FFmpeg   │  │  Whisper  │  │ Pyannote  │  │  LLM (Gemini │
│ (Preproc) │  │  (Transcr)│  │ (Diarize) │  │  / OpenAI)   │
└───────────┘  └───────────┘  └───────────┘  └──────────────┘
```

- **Telegram Bot**: Listens for user media submissions, registers jobs in DB, starts worker jobs, and delivers completion outputs.
- **FastAPI Layer**: Exposes routes for monitoring jobs, fetching export files, and manual speaker name mapping.
- **Celery Worker**: CPU/GPU optimized execution loop handling preprocessing, model loading, translation, and export assembly.
- **Redis**: Fast message broker for Celery and caching.
- **PostgreSQL**: Robust persistence for users, job metadata, transcripts, speaker mappings, and system error logs.
- **Local Storage**: Shared filesystem workspace for media inputs and exports.

---

## Features
- **Multi-format Input**: Handles OGG, MP3, M4A, WAV, MP4, MOV, and documents.
- **Auto-conversion**: Conversions to 16kHz mono WAV using FFmpeg.
- **Long Audio Support**: Configurable audio chunking preserves timestamps and avoids model memory bottlenecks.
- **State-of-the-Art Transcription**: Leverages `faster-whisper` for fast inference.
- **Speaker Diarization**: Resolves speaker overlaps using Pyannote.
- **LLM Summary & Translation**: Optional target translation and standard summaries using OpenAI or Gemini.
- **Multiple Exports**: DOCX, plain TXT (raw and speaker-labeled), SRT subtitles, and technical JSON reports.
- **Access Control**: Optional Telegram user whitelisting.

---

## Prerequisites & Key Generation

### 1. Telegram Bot Token
1. Open Telegram and search for [@BotFather](https://t.me/BotFather).
2. Send `/newbot` and follow instructions.
3. Save the token (e.g. `123456789:ABCdefGhIJK...`) and place it in `TELEGRAM_BOT_TOKEN`.

### 2. Pyannote speaker diarization Token
Speaker diarization requires a Hugging Face Hub token with accepted model conditions:
1. Sign up/Log in to [Hugging Face](https://huggingface.co/).
2. Visit [pyannote/segmentation-3.0](https://huggingface.co/pyannote/segmentation-3.0) and accept user conditions.
3. Visit [pyannote/speaker-diarization-3.1](https://huggingface.co/pyannote/speaker-diarization-3.1) and accept user conditions.
4. Go to [HF Settings -> Tokens](https://huggingface.co/settings/tokens) and generate a **Read** token.
5. Set `PYANNOTE_AUTH_TOKEN` in your environment.

### 3. LLM API Key
- **Gemini**: Obtain an API Key from Google AI Studio. Set `LLM_API_KEY` and `LLM_PROVIDER=gemini`.
- **OpenAI**: Obtain an API Key from OpenAI Platform. Set `LLM_API_KEY` and `LLM_PROVIDER=openai`.

---

## Installation & Local Setup

Ensure `ffmpeg` is installed on your host machine:
- **macOS**: `brew install ffmpeg`
- **Ubuntu**: `sudo apt install ffmpeg`

1. Clone the repository and navigate to its root:
   ```bash
   cd telegram-ai-transcriber
   ```
2. Create and activate a python virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Copy environment configuration and edit accordingly:
   ```bash
   cp .env.example .env
   ```
5. Ensure PostgreSQL and Redis are running locally, then start services:
   ```bash
   chmod +x run_local.sh
   ./run_local.sh
   ```

---

## Docker Deployment

The fastest way to deploy the entire production stack:

```bash
# Clone, configure .env, and launch
docker-compose up --build -d
```

This starts:
- `db`: PostgreSQL database on port 5432
- `redis`: Redis server on port 6379
- `api`: FastAPI container on port 8000
- `bot`: Telegram Bot execution container
- `worker`: Celery worker processing pipeline

---

## Environment Variables

See [.env.example](.env.example) for the full list. Key settings include:
- `WHISPER_MODEL`: Model size (`tiny`, `base`, `small`, `medium`, `large-v3`, `turbo`).
- `WHISPER_DEVICE`: Use `cpu` or `cuda` (GPU).
- `ALLOWED_USER_IDS`: Comma-separated list (e.g. `1234567,9876543`). If empty, allows public access.
- `CHUNK_LENGTH_MINUTES`: Splits large files for performance. Set to `0` to disable chunking.
- `CLEANUP_AFTER_DAYS`: Runs automatic cleanup of storage folders.

---

## Processing Long Audio

When chunking is enabled (`CHUNK_LENGTH_MINUTES` is greater than 0):
1. The preprocessing service segments the main audio into time-bounded chunks (e.g., 10 minutes).
2. Each chunk is processed sequentially.
3. Transcripts are aligned to global audio offsets, preventing drift.
4. Output assemblies aggregate segments before generating files.

---

## Speaker Naming & API Access

FastAPI provides an endpoint to rename speakers. For instance, rename `Speaker 1` to `Abdulloh`:

```http
POST /api/jobs/{job_id}/rename-speaker
Content-Type: application/json

{
  "speaker_label": "Speaker 1",
  "real_name": "Abdulloh"
}
```
This triggers an automated rebuild of the DOCX and TXT output files with updated names.

---

## Known Limitations
- **CPU Bottlenecks**: Large models (like `large-v3`) run slowly on basic CPU instances. Use `turbo` or `small` on CPU, or run on GPU/CUDA instances.
- **Hugging Face rate limiting**: Make sure your HF Auth token is valid and accepted pyannote agreements.

---

## Production Deployment Notes
- Change Postgres passwords from the default in your `.env`.
- Set up a systemd service or use Docker restart policies (`restart: always`).
- Ensure persistent docker volume mounts for `storage/` directory to prevent data loss.

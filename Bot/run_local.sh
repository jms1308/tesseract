#!/bin/bash

# Exit on error
set -e

echo "=========================================================="
echo "          Telegram AI Transcriber Local Setup             "
echo "=========================================================="

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found! Copying from .env.example..."
    cp .env.example .env
    echo "👉 Please edit .env and configure: "
    echo "   - TELEGRAM_BOT_TOKEN"
    echo "   - PYANNOTE_AUTH_TOKEN (if diarization is enabled)"
    echo "   - LLM_API_KEY (if summary/translation is enabled)"
    echo ""
    exit 1
fi

# Ensure storage directories exist locally
mkdir -p storage/uploads storage/processed storage/exports storage/logs

# Start database and redis message broker using docker-compose
echo "📦 Starting Postgres & Redis via Docker..."
docker-compose up -d postgres redis

# Wait a moment for databases to be ready
echo "⏳ Waiting for databases to start..."
sleep 3

# Check if python virtual environment is active, otherwise try to find it
if [ -z "$VIRTUAL_ENV" ]; then
    if [ -d "venv" ]; then
        echo "🔌 Activating local python virtual environment..."
        source venv/bin/activate
    else
        echo "⚠️  Virtual environment (venv) not detected. Please run: python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt"
    fi
fi

# Trap to kill all background processes on script exit
trap "kill 0" EXIT

echo "🚀 Starting FastAPI Backend in background..."
export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/transcriber"
export REDIS_URL="redis://localhost:6379/0"
uvicorn app.api.main:app --host 127.0.0.1 --port 8000 &
API_PID=$!

echo "🚀 Starting Celery Worker in background..."
celery -A app.workers.celery_app worker --loglevel=info &
WORKER_PID=$!

echo "🚀 Starting Telegram Bot in background..."
python app/bot/main.py &
BOT_PID=$!

echo "=========================================================="
echo "🎉 All services are running! Press Ctrl+C to terminate."
echo "   - API Health: http://127.0.0.1:8000/health"
echo "   - Logs are being written to stdout and storage/logs/"
echo "=========================================================="

# Keep script running to allow Ctrl+C to kill background processes
wait

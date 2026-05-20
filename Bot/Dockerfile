FROM python:3.10-slim

# Prevent python from writing pyc files and buffering stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY app /app/app

# Create storage directories
RUN mkdir -p /app/storage/uploads /app/storage/processed /app/storage/exports /app/storage/logs

# Set python path to allow imports from app
ENV PYTHONPATH=/app

# Command to be overwritten by docker-compose
CMD ["python", "app/bot/main.py"]

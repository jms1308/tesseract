import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, DateTime, Boolean, ForeignKey, Text, BigInteger
from sqlalchemy.orm import relationship
from app.db.database import Base

class User(Base):
    __tablename__ = "users"

    telegram_id = Column(BigInteger, primary_key=True, index=True)
    username = Column(String, nullable=True)
    first_name = Column(String, nullable=True)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    jobs = relationship("Job", back_populates="user")


class Job(Base):
    __tablename__ = "jobs"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    telegram_user_id = Column(BigInteger, ForeignKey("users.telegram_id"), nullable=True)
    telegram_chat_id = Column(String, nullable=True)
    telegram_message_id = Column(BigInteger, nullable=True)
    
    # Status: received, downloaded, preprocessing, transcribing, diarizing, aligning, translating, summarizing, exporting, completed, failed
    status = Column(String, default="received", index=True)
    original_filename = Column(String, nullable=True)
    mime_type = Column(String, nullable=True)
    file_size_bytes = Column(BigInteger, nullable=True)
    duration_seconds = Column(Float, nullable=True)
    
    language_code = Column(String, nullable=True)  # detected or specified
    speakers_count = Column(Integer, nullable=True)
    
    summary = Column(Text, nullable=True)
    translation = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    
    error_message = Column(Text, nullable=True)

    # Relationships
    user = relationship("User", back_populates="jobs")
    files = relationship("File", back_populates="job", cascade="all, delete-orphan")
    segments = relationship("TranscriptSegment", back_populates="job", cascade="all, delete-orphan")
    speakers = relationship("Speaker", back_populates="job", cascade="all, delete-orphan")
    error_logs = relationship("ErrorLog", back_populates="job", cascade="all, delete-orphan")


class File(Base):
    __tablename__ = "files"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    job_id = Column(String, ForeignKey("jobs.id"), index=True)
    
    # File type: raw, processed, txt, txt_speakers, docx, srt, json
    file_type = Column(String, index=True)
    file_path = Column(String)
    file_name = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    job = relationship("Job", back_populates="files")


class TranscriptSegment(Base):
    __tablename__ = "transcript_segments"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(String, ForeignKey("jobs.id"), index=True)
    
    start_time = Column(Float)  # seconds
    end_time = Column(Float)    # seconds
    text = Column(Text)
    speaker_label = Column(String, nullable=True, default="Speaker 1")
    confidence = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    job = relationship("Job", back_populates="segments")


class Speaker(Base):
    __tablename__ = "speakers"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(String, ForeignKey("jobs.id"), index=True)
    
    speaker_label = Column(String)  # e.g., "Speaker 1"
    real_name = Column(String)      # e.g., "Abdulloh"
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    job = relationship("Job", back_populates="speakers")


class ErrorLog(Base):
    __tablename__ = "error_logs"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(String, ForeignKey("jobs.id"), nullable=True, index=True)
    
    step = Column(String)  # e.g., "diarization", "transcription"
    error_message = Column(Text)
    traceback = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    job = relationship("Job", back_populates="error_logs")

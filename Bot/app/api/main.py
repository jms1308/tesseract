import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router
from app.db.database import init_db
from app.core.logging_config import logger

app = FastAPI(
    title="Telegram AI Transcriber API",
    description="Backend API for managing audio/video transcription jobs, files, and speaker configurations.",
    version="1.0.0"
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    logger.info("Initializing database tables...")
    try:
        init_db()
        logger.info("Database initialization successful.")
    except Exception as e:
        logger.error(f"Database initialization failed: {str(e)}")
        # Don't fail completely to allow container to stay up for debugging

# Include API routes
app.include_router(router)

if __name__ == "__main__":
    uvicorn.run("app.api.main:app", host="0.0.0.0", port=8000, reload=True)

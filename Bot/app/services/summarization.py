import google.generativeai as genai
from openai import OpenAI
from app.core.config import settings
from app.core.logging_config import logger

def generate_summary(transcript_text: str) -> str:
    """
    Generates a structured summary of the transcript.
    Summary includes:
      - Short summary
      - Key discussion points
      - Decisions made
      - Action items (with responsible person and deadline if detectable)
    Supports Gemini and OpenAI. Skips gracefully if disabled or no key is present.
    """
    if not settings.ENABLE_SUMMARY:
        logger.info("Summarization is disabled in settings.")
        return ""
        
    if not settings.LLM_API_KEY:
        logger.warning("LLM_API_KEY is not configured. Skipping summarization.")
        return ""

    if not transcript_text.strip():
        return ""

    provider = settings.LLM_PROVIDER.lower()
    
    prompt = (
        "You are an expert executive assistant. Summarize the following meeting/conversation transcription. "
        "Your summary must follow this structure:\n"
        "1. Executive Summary: A concise 2-3 sentence overview of the conversation.\n"
        "2. Key Discussion Points: Bulleted list of the main topics discussed.\n"
        "3. Decisions Made: Bulleted list of any decisions made during the conversation.\n"
        "4. Action Items: A table or bulleted list of action items, specifying the responsible person "
        "and deadline if they are detectable from the text.\n\n"
        "Format the output using clear, clean Markdown.\n\n"
        f"Transcription:\n{transcript_text}"
    )

    logger.info(f"Generating summary using {provider}...")

    try:
        if provider == "gemini":
            genai.configure(api_key=settings.LLM_API_KEY)
            model = genai.GenerativeModel("gemini-1.5-flash")
            response = model.generate_content(prompt)
            summary = response.text.strip()
            return summary
            
        elif provider == "openai":
            client = OpenAI(api_key=settings.LLM_API_KEY)
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are an expert executive assistant."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.4
            )
            summary = response.choices[0].message.content.strip()
            return summary
            
        else:
            logger.warning(f"Unknown summary provider: {provider}. Skipping summarization.")
            return ""
            
    except Exception as e:
        logger.error(f"Summarization failed with error: {str(e)}")
        # Return empty string to allow transcription pipeline to continue
        return ""

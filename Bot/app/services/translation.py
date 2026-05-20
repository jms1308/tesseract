import google.generativeai as genai
from openai import OpenAI
from app.core.config import settings
from app.core.logging_config import logger

def translate_text(text: str) -> str:
    """
    Translates transcript text to the target language configured in settings.
    Supports Gemini and OpenAI. Skips gracefully if disabled or no key is present.
    """
    if not settings.ENABLE_TRANSLATION:
        logger.info("Translation is disabled in settings.")
        return ""
        
    if not settings.LLM_API_KEY:
        logger.warning("LLM_API_KEY is not configured. Skipping translation.")
        return ""

    if not text.strip():
        return ""

    target_lang = settings.TRANSLATION_TARGET_LANGUAGE or "English"
    provider = settings.TRANSLATION_PROVIDER.lower()
    
    prompt = (
        f"You are a professional translator. Translate the following transcription text into {target_lang}. "
        f"Keep the translation accurate, professional, and preserve the original tone. "
        f"Do not add any explanations or preamble, return ONLY the translation:\n\n{text}"
    )

    logger.info(f"Translating text using {provider} to {target_lang}...")

    try:
        if provider == "gemini":
            genai.configure(api_key=settings.LLM_API_KEY)
            model = genai.GenerativeModel("gemini-1.5-flash")
            response = model.generate_content(prompt)
            translated = response.text.strip()
            return translated
            
        elif provider == "openai":
            client = OpenAI(api_key=settings.LLM_API_KEY)
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are a professional translator."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3
            )
            translated = response.choices[0].message.content.strip()
            return translated
            
        else:
            logger.warning(f"Unknown translation provider: {provider}. Skipping translation.")
            return ""
            
    except Exception as e:
        logger.error(f"Translation failed with error: {str(e)}")
        # Return empty string to allow transcription pipeline to continue
        return ""

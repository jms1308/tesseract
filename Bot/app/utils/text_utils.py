import html

def clean_transcript_text(text: str) -> str:
    """
    Cleans transcript segments by stripping whitespace and normalizing spaces.
    """
    if not text:
        return ""
    text = text.strip()
    # Replace multiple spaces with a single space
    return " ".join(text.split())

def escape_html(text: str) -> str:
    """
    Escapes characters that could break HTML parsing in Telegram messages.
    """
    if not text:
        return ""
    return html.escape(text)

def format_seconds_to_hms(seconds: float) -> str:
    """
    Formats float seconds to HH:MM:SS format.
    Example: 3661.5 -> "01:01:01"
    """
    total_seconds = int(seconds)
    hours = total_seconds // 3600
    minutes = (total_seconds % 3600) // 60
    secs = total_seconds % 60
    return f"{hours:02d}:{minutes:02d}:{secs:02d}"

def format_seconds_to_srt(seconds: float) -> str:
    """
    Formats float seconds to SRT time format: HH:MM:SS,mmm
    Example: 3661.523 -> "01:01:01,523"
    """
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    milliseconds = int(round((seconds - int(seconds)) * 1000))
    if milliseconds >= 1000:
        milliseconds = 999
    return f"{hours:02d}:{minutes:02d}:{secs:02d},{milliseconds:03d}"

def format_seconds_to_bracket_timestamp(seconds: float) -> str:
    """
    Formats float seconds to [HH:MM:SS] format.
    Example: 75.0 -> "[00:01:15]"
    """
    return f"[{format_seconds_to_hms(seconds)}]"

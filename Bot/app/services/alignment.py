from typing import List, Dict, Any
from app.core.logging_config import logger

def align_segments(
    whisper_segments: List[Dict[str, Any]], 
    diarization_segments: List[Dict[str, Any]]
) -> List[Dict[str, Any]]:
    """
    Aligns transcription segments with speaker diarization segments using overlap matching.
    For each whisper segment, calculates the overlap with diarization segments and
    assigns the speaker label with the highest overlap.
    """
    if not diarization_segments:
        logger.info("No diarization segments provided. Using default speaker label 'Speaker 1'.")
        # If diarization is missing/disabled, default all segments to "Speaker 1"
        for seg in whisper_segments:
            seg["speaker_label"] = "Speaker 1"
        return whisper_segments

    logger.info(f"Aligning {len(whisper_segments)} transcription segments with {len(diarization_segments)} diarization segments...")

    last_speaker = "Speaker 1"
    aligned_segments = []

    for w_seg in whisper_segments:
        w_start = w_seg["start_time"]
        w_end = w_seg["end_time"]
        
        best_speaker = None
        max_overlap = 0.0
        
        # Check overlaps
        for d_seg in diarization_segments:
            d_start = d_seg["start_time"]
            d_end = d_seg["end_time"]
            
            # Calculate overlap duration
            overlap_start = max(w_start, d_start)
            overlap_end = min(w_end, d_end)
            overlap = max(0.0, overlap_end - overlap_start)
            
            if overlap > max_overlap:
                max_overlap = overlap
                best_speaker = d_seg["speaker_label"]
        
        # Determine final speaker label
        if best_speaker:
            speaker_label = best_speaker
            last_speaker = best_speaker
        else:
            # If no direct overlap, see if this whisper segment falls completely within a gap.
            # We fall back to the last known speaker to ensure continuity.
            speaker_label = last_speaker
            
        new_seg = w_seg.copy()
        new_seg["speaker_label"] = speaker_label
        aligned_segments.append(new_seg)

    logger.info("Alignment complete.")
    return aligned_segments

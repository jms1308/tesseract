import time
import wave
import numpy as np
from pathlib import Path
from faster_whisper import WhisperModel

def create_dummy_wav(path: Path, duration_seconds: float = 5.0):
    sample_rate = 16000
    num_samples = int(sample_rate * duration_seconds)
    # Generate some simple sine wave sound so VAD doesn't filter it out
    t = np.linspace(0, duration_seconds, num_samples, endpoint=False)
    audio_data = np.sin(2 * np.pi * 440 * t) * 32767
    audio_data = audio_data.astype(np.int16)
    
    with wave.open(str(path), 'wb') as wav_file:
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(sample_rate)
        wav_file.writeframes(audio_data.tobytes())

def test_performance():
    dummy_path = Path("/app/storage/dummy_temp.wav")
    create_dummy_wav(dummy_path, 5.0)
    print(f"Created 5-second dummy audio WAV file at {dummy_path}")
    
    try:
        print("Loading Whisper 'small' model on CPU...")
        model = WhisperModel(
            model_size_or_path="small",
            device="cpu",
            compute_type="int8"
        )
        
        # Test beam_size=5
        start = time.time()
        segments, _ = model.transcribe(str(dummy_path), beam_size=5, language="uz")
        list(segments)
        duration_beam_5 = time.time() - start
        print(f"beam_size=5 completed in {duration_beam_5:.2f} seconds.")
        
        # Test beam_size=1
        start = time.time()
        segments, _ = model.transcribe(str(dummy_path), beam_size=1, language="uz")
        list(segments)
        duration_beam_1 = time.time() - start
        print(f"beam_size=1 completed in {duration_beam_1:.2f} seconds.")
        
        speedup = (duration_beam_5 / duration_beam_1) if duration_beam_1 > 0 else 0
        print(f"Speedup: {speedup:.2f}x faster with beam_size=1!")
        
    finally:
        if dummy_path.exists():
            dummy_path.unlink()
            print("Removed dummy WAV file.")

if __name__ == "__main__":
    test_performance()

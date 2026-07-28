import sounddevice as sd
import soundfile as sf
from faster_whisper import WhisperModel

# Load Whisper model only once
model = WhisperModel("small", device="cpu", compute_type="int8")

def listen():

    duration = 5  # seconds

    samplerate = 16000

    print("\n🎤 Speak now...")

    recording = sd.rec(
        int(duration * samplerate),
        samplerate=samplerate,
        channels=1,
        dtype="float32"
    )

    sd.wait()

    sf.write("temp.wav", recording, samplerate)

    print("🔄 Converting speech to text...")

    segments, info = model.transcribe("temp.wav")

    text = ""

    for segment in segments:
        text += segment.text

    return text.strip()


if __name__ == "__main__":

    query = listen()

    print("\nYou said:")
    print(query)
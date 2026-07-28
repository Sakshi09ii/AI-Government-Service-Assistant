import pyttsx3

# Initialize engine
engine = pyttsx3.init()

# Set speaking speed
engine.setProperty("rate", 170)

# Set volume (0.0 to 1.0)
engine.setProperty("volume", 1.0)

def speak(text):
    engine.say(text)
    engine.runAndWait()


if __name__ == "__main__":
    speak("Hello Sakshi. Your voice assistant is working successfully.")
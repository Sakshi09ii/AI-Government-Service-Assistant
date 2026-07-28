'use client'

import { useState } from 'react'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { Mic, MicOff, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function VoicePage() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')

  const handleMicClick = () => {
    setIsListening(!isListening)
    if (!isListening) {
      // Simulate listening
      setTimeout(() => {
        setTranscript('What schemes am I eligible for as a farmer?')
        setIsListening(false)
      }, 3000)
    }
  }

  return (
    <LayoutWrapper>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Voice Assistant
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Speak with our AI in your preferred language
          </p>
        </div>

        {/* Microphone Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-700">
            <div className="mb-8">
              <button
                onClick={handleMicClick}
                className={`mx-auto w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isListening ? (
                  <MicOff className="w-16 h-16 text-white" />
                ) : (
                  <Mic className="w-16 h-16 text-white" />
                )}
              </button>
            </div>

            <p className="text-slate-600 dark:text-slate-400 mb-2">
              {isListening ? 'Listening... Speak now' : 'Click microphone to start speaking'}
            </p>

            {/* Wave Animation */}
            {isListening && (
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-blue-500 rounded-full"
                    style={{
                      height: `${20 + Math.random() * 40}px`,
                      animation: `wave 0.6s ease-in-out ${i * 0.1}s infinite`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Transcript */}
        {transcript && (
          <div className="mb-8 p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 font-semibold">YOUR QUESTION:</p>
            <p className="text-lg text-slate-900 dark:text-white">"{transcript}"</p>
          </div>
        )}

        {/* Response */}
        {transcript && (
          <div className="mb-8">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-xl border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-2 font-semibold flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                AI RESPONSE:
              </p>
              <p className="text-slate-900 dark:text-white leading-relaxed">
                Based on your question, here are the schemes you might be eligible for as a farmer:
                <br />
                <br />
                <strong>1. PM-KISAN:</strong> Direct income support of ₹6000 per year in 3 installments
                <br />
                <strong>2. PM-FASAL BIMA YOJANA:</strong> Crop insurance scheme
                <br />
                <strong>3. KUSUM SCHEME:</strong> Solar power scheme for agriculture
                <br />
                <br />
                Would you like more details about any of these schemes?
              </p>
            </div>
          </div>
        )}

        {/* Language Note */}
        <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            💡 <strong>Tip:</strong> The voice assistant supports Hindi, Marathi, Tamil, Telugu, Kannada, Gujarati, Punjabi, Malayalam, and Bengali. Change your preferred language in Settings.
          </p>
        </div>

        {/* CSS for wave animation */}
        <style jsx>{`
          @keyframes wave {
            0%, 100% {
              opacity: 0.5;
            }
            50% {
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </LayoutWrapper>
  )
}

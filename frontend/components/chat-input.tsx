'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Mic, Paperclip } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ChatInputProps {
  onSend: (message: string) => void
  isLoading?: boolean
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const [rows, setRows] = useState(1)
  const [isRecording, setIsRecording] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    
    // Auto-expand textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      const newHeight = Math.min(textareaRef.current.scrollHeight, 120)
      textareaRef.current.style.height = `${newHeight}px`
      setRows(Math.ceil(newHeight / 24))
    }
  }

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSend(message)
      setMessage('')
      setRows(1)
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleVoiceInput = async () => {
    if (isRecording) {
      // Stop recording
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop()
      }
      setIsRecording(false)
    } else {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const mediaRecorder = new MediaRecorder(stream)
        mediaRecorderRef.current = mediaRecorder

        let audioChunks: BlobPart[] = []

        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data)
        }

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm' })
          // Placeholder: In a real app, send this to a speech-to-text API
          setMessage((prev) => prev + ' [Voice message received]')
          stream.getTracks().forEach((track) => track.stop())
        }

        mediaRecorder.start()
        setIsRecording(true)
      } catch (error) {
        console.error('Microphone access denied:', error)
      }
    }
  }

  return (
    <div className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 p-4">
      <div className="flex gap-3 items-end">
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0">
          <Paperclip className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </button>

        <div className="flex-1 flex items-center bg-slate-100 dark:bg-slate-900 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask about schemes, eligibility, documents..."
            rows={rows}
            className="flex-1 bg-transparent outline-none text-sm resize-none text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 max-h-32"
          />
        </div>

        <button
          onClick={handleVoiceInput}
          className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
            isRecording
              ? 'bg-red-500 hover:bg-red-600'
              : 'hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title={isRecording ? 'Stop recording' : 'Start voice input'}
        >
          <Mic className={`w-5 h-5 ${isRecording ? 'text-white animate-pulse' : 'text-slate-600 dark:text-slate-400'}`} />
        </button>

        <Button
          onClick={handleSend}
          disabled={!message.trim() || isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex-shrink-0"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>

      {/* Suggested Questions */}
      <div className="mt-4 flex flex-wrap gap-2">
        {[
          'What schemes am I eligible for?',
          'How to apply for passport?',
          'Documents required for Aadhaar?',
          'Driving Licence Process',
        ].map((q) => (
          <button
            key={q}
            onClick={() => {
              setMessage(q)
              setTimeout(handleSend, 0)
            }}
            className="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  )
}

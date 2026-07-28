'use client'

import { useState, useRef, useEffect } from 'react'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { ChatMessage } from '@/components/chat-message'
import { ChatInput } from '@/components/chat-input'
import { useLanguage } from '@/components/root-layout-client'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export default function ChatPage() {
  const { language } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Get greeting message based on language
  const getGreetingMessage = () => {
    const greetings = {
      English: 'Namaste! 👋 I\'m your Government Public Service AI Assistant. I can help you with:\n\n• Government schemes and benefits\n• Eligibility checking\n• Required documents\n• Application procedures\n• Documents guidance (Passport, Aadhaar, PAN, Driving License, etc.)\n• Voice-based assistance\n• FAQs about government services\n\nJust type your question or use voice assistance. What can I help you with today?',
      Hindi: 'नमस्ते! 👋 मैं आपका सरकारी सार्वजनिक सेवा एआई सहायक हूँ। मैं आपकी मदद कर सकता हूँ:\n\n• सरकारी योजनाएं और लाभ\n• पात्रता जांचना\n• आवश्यक दस्तावेज\n• आवेदन प्रक्रिया\n• दस्तावेज़ मार्गदर्शन (पासपोर्ट, आधार, पैन, ड्राइविंग लाइसेंस आदि)\n• वॉइस सहायता\n• सरकारी सेवाओं के बारे में FAQs\n\nबस अपना सवाल पूछें या वॉइस सहायता का उपयोग करें। मैं आपकी आज कैसे मदद कर सकता हूँ?',
      Marathi: 'नमस्ते! 👋 मी तुमचा सरकारी सार्वजनिक सेवा एआই सहायक आहे. मी तुम्हाला मदत करू शकतो:\n\n• सरकारी योजना आणि लाभ\n• पात्रता तपासणी\n• आवश्यक दस्तऐवज\n• अर्ज प्रक्रिया\n• दस्तावेज मार्गदर्शन (पासपोर्ट, आधार, पॅन, ड्रायव्हिंग लाइसन्स इ.)\n• व्हॉइस सहायता\n• सरकारी सेवांबद्दल FAQs\n\nफक्त आपला प्रश्न विचारा किंवा व्हॉइस सहायताचा वापर करा. मी आज तुम्हाला कशी मदत करू शकतो?'
    }
    return greetings[language] || greetings.English
  }

  // Initialize messages when language changes
  useEffect(() => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: getGreetingMessage(),
        timestamp: new Date().toLocaleTimeString(),
      },
    ])
  }, [language])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (userMessage: string) => {
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages((prev) => [...prev, userMsg])
    setIsLoading(true)

    try {
      // Simulate API call - replace with actual API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userMessage,
          context: '',
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const assistantMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date().toLocaleTimeString(),
        }
        setMessages((prev) => [...prev, assistantMsg])
      } else {
        // Fallback response
        const fallbackResponses: { [key: string]: string } = {
          scheme: 'Popular government schemes include PM-JAY (Ayushman Bharat), PMAY (Pradhan Mantri Awas Yojana), PM-KISAN, and many more. Tell me more about your eligibility and I can help you find the best schemes for you!',
          passport: 'To apply for a passport, you need:\n\n1. Duly filled Application Form\n2. Birth Certificate or Class X Certificate\n3. Address Proof\n4. Photo\n5. Income Certificate (if applicable)\n\nVisit your nearest PSK (Passport Seva Kendra) to apply.',
          aadhaar: 'Aadhaar is a 12-digit unique identity number. To enroll:\n\n1. Visit your nearest UIDAI center\n2. Provide biometric data (fingerprints & iris)\n3. Get an OTP for verification\n4. Your Aadhaar will be issued within 90 days\n\nNo documents are required for enrollment!',
          eligibility: 'To check your eligibility, please provide details about:\n• Your age\n• Income\n• Occupation\n• State of residence\n\nThis will help me suggest the best schemes for you.',
          default: 'Thank you for your question! I can help you with information about:\n• Government schemes and benefits\n• Eligibility requirements\n• Required documents\n• Application procedures\n\nPlease ask me specifically about any scheme, document, or service.',
        }

        const lowerMessage = userMessage.toLowerCase()
        let response = fallbackResponses.default

        if (lowerMessage.includes('scheme')) response = fallbackResponses.scheme
        else if (lowerMessage.includes('passport')) response = fallbackResponses.passport
        else if (lowerMessage.includes('aadhaar')) response = fallbackResponses.aadhaar
        else if (lowerMessage.includes('eligible') || lowerMessage.includes('eligibility'))
          response = fallbackResponses.eligibility

        const assistantMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response,
          timestamp: new Date().toLocaleTimeString(),
        }
        setMessages((prev) => [...prev, assistantMsg])
      }
    } catch (error) {
      console.error('Error:', error)
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toLocaleTimeString(),
      }
      setMessages((prev) => [...prev, assistantMsg])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LayoutWrapper>
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 px-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} role={message.role} content={message.content} timestamp={message.timestamp} />
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 text-white flex items-center justify-center flex-shrink-0">
                🤖
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="sticky bottom-0">
          <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </LayoutWrapper>
  )
}

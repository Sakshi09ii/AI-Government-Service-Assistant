'use client'

interface ChatMessageProps {
  role: 'user' | 'assistant'
  content: string
  timestamp?: string
}

export function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} gap-3 mb-4`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
          🤖
        </div>
      )}

      <div
        className={`max-w-md lg:max-w-xl px-4 py-3 rounded-lg leading-relaxed text-sm ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-none'
        }`}
      >
        <p className="break-words whitespace-pre-wrap">{content}</p>
        {timestamp && (
          <p className={`text-xs mt-2 ${isUser ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
            {timestamp}
          </p>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 text-slate-900 dark:text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">
          👤
        </div>
      )}
    </div>
  )
}

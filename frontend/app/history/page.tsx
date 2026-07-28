'use client'

import { LayoutWrapper } from '@/components/layout-wrapper'
import { Trash2, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

const chatHistories = [
  {
    id: 1,
    title: 'Passport Application Process',
    date: 'Today, 2:30 PM',
    messages: 5,
  },
  {
    id: 2,
    title: 'PM-JAY Eligibility Check',
    date: 'Yesterday, 10:15 AM',
    messages: 8,
  },
  {
    id: 3,
    title: 'Aadhaar Card Requirements',
    date: '2 days ago, 4:45 PM',
    messages: 3,
  },
  {
    id: 4,
    title: 'Driving License Procedure',
    date: 'Dec 20, 11:30 AM',
    messages: 6,
  },
  {
    id: 5,
    title: 'PAN Card & Income Tax Guide',
    date: 'Dec 19, 3:20 PM',
    messages: 9,
  },
  {
    id: 6,
    title: 'Government Schemes for Farmers',
    date: 'Dec 18, 9:00 AM',
    messages: 12,
  },
]

export default function HistoryPage() {
  return (
    <LayoutWrapper>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Chat History
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              View and manage your previous conversations
            </p>
          </div>
        </div>

        {/* Chat History List */}
        <div className="space-y-3">
          {chatHistories.map((history) => (
            <button
              key={history.id}
              className="w-full p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-blue-400 dark:hover:border-blue-600 transition-all text-left flex items-center justify-between group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <h3 className="font-semibold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {history.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {history.date} • {history.messages} messages
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  // Handle delete
                }}
                className="ml-4 p-2 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors flex-shrink-0"
                title="Delete chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </button>
          ))}
        </div>

        {/* Empty State */}
        {chatHistories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">💬</div>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              No chat history yet
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Your conversations with the AI assistant will appear here
            </p>
          </div>
        )}
      </div>
    </LayoutWrapper>
  )
}

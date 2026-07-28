'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Home, MessageSquare, Scroll, History, Settings,
  ChevronLeft, ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: MessageSquare, label: 'AI Assistant', href: '/chat' },
  { icon: Scroll, label: 'Government Schemes', href: '/schemes' },
  { icon: History, label: 'Chat History', href: '/history' },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 z-40 flex flex-col ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between gap-2">
          <div className={`flex items-center gap-3 ${!isOpen && 'justify-center w-full'}`}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold">
              🏛️
            </div>
            {isOpen && (
              <div className="text-sm font-semibold text-slate-900 dark:text-white">
                <div>PCSAI</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
              !isOpen && 'justify-center'
            }`}
            title={isOpen ? '' : item.label}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Settings & User */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <Link
          href="/settings"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
            !isOpen && 'justify-center'
          }`}
          title={isOpen ? '' : 'Settings'}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span className="text-sm font-medium">Settings</span>}
        </Link>

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  )
}

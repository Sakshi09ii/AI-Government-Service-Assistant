'use client'

import { Search, Moon, Sun, Globe } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import { useLanguage } from '@/components/root-layout-client'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const languages = ['English', 'Hindi', 'Marathi'] as const

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)

  return (
    <nav className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 z-30 px-6 flex items-center justify-between gap-4">
      {/* Left Section - Search */}
      <div className="flex-1 max-w-md hidden lg:flex items-center gap-2 bg-slate-100 dark:bg-slate-900 rounded-lg px-3 py-2">
        <Search className="w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search schemes, documents..."
          className="flex-1 bg-transparent outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
        />
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-3">
        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Select Language"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm hidden lg:inline">{language}</span>
          </button>

          {showLanguageMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg z-50">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang as 'English' | 'Hindi' | 'Marathi')
                    setShowLanguageMenu(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                    language === lang ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          title="Toggle theme"
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        {/* Profile Avatar */}
        <button className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-semibold text-sm hover:from-blue-600 hover:to-blue-700 transition-all">
          👤
        </button>
      </div>
    </nav>
  )
}

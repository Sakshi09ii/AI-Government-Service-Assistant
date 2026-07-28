'use client'

import { useState } from 'react'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { useTheme } from '@/components/theme-provider'
import { Moon, Sun, Trash2, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const [language, setLanguage] = useState('English')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <LayoutWrapper>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Customize your experience with the AI Assistant
          </p>
        </div>

        {/* Save Notification */}
        {saved && (
          <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200">
            ✓ Settings saved successfully
          </div>
        )}

        <div className="space-y-6">
          {/* Theme Section */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              {theme === 'light' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              Appearance
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
                  Theme
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => theme === 'dark' && toggleTheme()}
                    className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                      theme === 'light'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-blue-400'
                    }`}
                  >
                    <Sun className="w-5 h-5 mx-auto mb-2" />
                    <p className="text-sm font-semibold">Light</p>
                  </button>
                  <button
                    onClick={() => theme === 'light' && toggleTheme()}
                    className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                      theme === 'dark'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-blue-400'
                    }`}
                  >
                    <Moon className="w-5 h-5 mx-auto mb-2" />
                    <p className="text-sm font-semibold">Dark</p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Language Section */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">🌐 Language</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
                  Preferred Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Marathi</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data Section */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">📊 Data & Privacy</h2>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  You have 542 chat messages and 23 saved schemes in your account.
                </p>
                <button className="flex items-center gap-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold text-sm">
                  <Trash2 className="w-4 h-4" />
                  Clear All Chat History
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-4 pt-4">
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
              <Save className="w-5 h-5" />
              Save Changes
            </Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}

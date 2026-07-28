'use client'

import { useState } from 'react'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { Check } from 'lucide-react'

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी' },
  { code: 'mr', name: 'Marathi', flag: '🇮🇳', nativeName: 'मराठी' },
]

export default function LanguagesPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  return (
    <LayoutWrapper>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Language Selection
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Choose your preferred language for the AI assistant
          </p>
        </div>

        {/* Current Selection */}
        <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-700 dark:text-blue-300 mb-2 font-semibold">CURRENT LANGUAGE</p>
          <p className="text-xl font-bold text-slate-900 dark:text-white">
            {languages.find((l) => l.code === selectedLanguage)?.name}
          </p>
        </div>

        {/* Languages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => setSelectedLanguage(language.code)}
              className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                selectedLanguage === language.code
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-600'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{language.flag}</span>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{language.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{language.nativeName}</p>
                    </div>
                  </div>
                </div>
                {selectedLanguage === language.code && (
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white flex-shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Language Info */}
        <div className="space-y-4">
          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
              💡 How Language Selection Works
            </h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400 text-sm">
              <li>• Your selected language will be used for all AI responses</li>
              <li>• Voice assistant will respond in your chosen language</li>
              <li>• Government documents will display in selected language where available</li>
              <li>• Change language anytime from Settings</li>
            </ul>
          </div>

          <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3">
              ✓ Three Language Support
            </h3>
            <p className="text-green-800 dark:text-green-200 text-sm">
              We provide support in English, Hindi, and Marathi. Choose your preferred language and enjoy the same quality assistance and information in your choice of language.
            </p>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}

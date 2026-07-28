'use client'

import { ChevronRight, CheckCircle } from 'lucide-react'

interface SchemeCardProps {
  name: string
  category: string
  description: string
  eligibility: string[]
  benefits: string[]
  onClick?: () => void
}

export function SchemeCard({
  name,
  category,
  description,
  eligibility,
  benefits,
  onClick,
}: SchemeCardProps) {
  return (
    <button
      onClick={onClick}
      className="group p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 text-left"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 mb-2">
            {category}
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {name}
          </h3>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Eligibility
          </p>
          <ul className="space-y-1">
            {eligibility.slice(0, 2).map((item, idx) => (
              <li key={idx} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Benefits
          </p>
          <ul className="space-y-1">
            {benefits.slice(0, 2).map((item, idx) => (
              <li key={idx} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </button>
  )
}

'use client'

import { ArrowRight } from 'lucide-react'

interface ProcedureCardProps {
  icon: string
  title: string
  description: string
  steps: number
  onClick?: () => void
}

export function ProcedureCard({ icon, title, description, steps, onClick }: ProcedureCardProps) {
  return (
    <button
      onClick={onClick}
      className="group p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 text-left"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{icon}</div>
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
          {steps} Steps
        </span>
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {title}
      </h3>

      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{description}</p>

      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-semibold group-hover:gap-3 transition-all">
        <span>View Details</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </button>
  )
}

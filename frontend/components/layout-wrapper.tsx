'use client'

import { Sidebar } from '@/components/sidebar'
import { Navbar } from '@/components/navbar'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64">
        <Navbar />
        <main className="flex-1 overflow-y-auto mt-16 pt-6 pb-8 px-4 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}

'use client'

import { AppSidebar } from '@/components/navigation/AppSidebar'

export default function AdminAreaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 ml-[260px] transition-all duration-300">
        {children}
      </div>
    </div>
  )
}


'use client'

import dynamic from 'next/dynamic'

// Dynamically import DashboardNavbar to ensure it's client-side only
const DashboardNavbar = dynamic(() => import('@/components/dashboard-navbar').then(mod => ({ default: mod.DashboardNavbar })), {
  ssr: false,
  loading: () => (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4">
        <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
        <div className="animate-pulse bg-gray-200 h-8 w-24 rounded"></div>
      </div>
    </div>
  )
})

interface DashboardLayoutClientProps {
  children: React.ReactNode
}

export function DashboardLayoutClient({ children }: DashboardLayoutClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <DashboardNavbar />
      <main className="container max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}

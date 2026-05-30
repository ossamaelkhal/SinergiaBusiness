import React from 'react'
import { Card, CardContent } from "@/components/ui/card"

export default function DiscoverLoading() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-4 sm:p-6 lg:p-8 relative overflow-hidden flex items-center justify-center">
      {/* Background Glowing Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="max-w-4xl w-full mx-auto space-y-8 relative z-10 pt-12">
        {/* Title Header Skeleton */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-block h-8 w-48 bg-white/5 border border-white/10 rounded-full animate-pulse mx-auto" />
          <div className="h-12 w-full bg-white/5 rounded-2xl animate-pulse" />
          <div className="h-4 w-3/4 bg-white/5 rounded-lg animate-pulse mx-auto" />
        </div>

        {/* Central Terminal / Frame Skeleton */}
        <Card className="bg-slate-900/60 border-white/10 backdrop-blur-md overflow-hidden">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <div className="w-3 h-3 rounded-full bg-rose-500/40 animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-amber-500/40 animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/40 animate-pulse" />
              <div className="h-4 w-40 bg-white/5 rounded-lg animate-pulse ml-2" />
            </div>

            <div className="space-y-3">
              <div className="h-4 w-5/6 bg-white/5 rounded-lg animate-pulse" />
              <div className="h-4 w-4/6 bg-white/5 rounded-lg animate-pulse" />
              <div className="h-4 w-full bg-white/5 rounded-lg animate-pulse" />
              <div className="h-4 w-3/6 bg-white/5 rounded-lg animate-pulse" />
              <div className="h-4 w-5/6 bg-white/5 rounded-lg animate-pulse" />
            </div>

            <div className="h-12 w-full bg-white/5 rounded-xl animate-pulse mt-8" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

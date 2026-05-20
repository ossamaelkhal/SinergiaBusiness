
import type { Metadata } from 'next'
import { LoginForm } from '@/components/auth/LoginForm'
import { Suspense } from 'react'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export const metadata: Metadata = {
  title: 'Login - Acesse sua conta SinergIA',
  description: 'Faça login na plataforma SinergIA e acesse seus sistemas de IA personalizados.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full space-y-8 relative z-10 bg-slate-900/60 p-8 rounded-3xl border border-white/10 backdrop-blur-xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Área Segura
          </h1>
          <p className="mt-2 text-slate-400">
            Acesse seu cockpit operacional
          </p>
        </div>
        
        <Suspense fallback={<LoadingSpinner size="lg" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}


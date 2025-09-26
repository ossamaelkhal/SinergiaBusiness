
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Bem-vindo de volta
          </h1>
          <p className="mt-2 text-gray-600">
            Acesse sua plataforma de IA personalizada
          </p>
        </div>
        
        <Suspense fallback={<LoadingSpinner size="lg" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}

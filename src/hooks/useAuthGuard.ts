
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'
import { toast } from 'sonner'

interface UseAuthGuardOptions {
  redirectTo?: string
  requireAuth?: boolean
  message?: string
}

export function useAuthGuard(options: UseAuthGuardOptions = {}) {
  const { 
    redirectTo = '/login', 
    requireAuth = true, 
    message = 'Você precisa estar logado para acessar esta página.' 
  } = options
  
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    if (requireAuth && !user) {
      toast.error(message)
      router.push(redirectTo)
      return
    }

    if (!requireAuth && user) {
      router.push('/dashboard')
      return
    }
  }, [user, loading, requireAuth, redirectTo, message, router])

  return { user, loading, isAuthenticated: !!user }
}

'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Header } from '@/components/Header'

interface AppLayoutWrapperProps {
  children: React.ReactNode
}

export function AppLayoutWrapper({ children }: AppLayoutWrapperProps) {
  const pathname = usePathname()

  // Lista de prefixos de rotas internas que NÃO devem renderizar o Header público ou ter espaçamento pt-20
  const excludedPrefixes = [
    '/admin',
    '/dashboard',
    '/app',
    '/hub',
    '/login',
    '/signup',
    '/apply',
    '/checkout',
    '/company'
  ]

  // Verifica se a rota atual começa com algum dos prefixos excluídos
  const isInternalRoute = excludedPrefixes.some(prefix => pathname.startsWith(prefix))

  if (isInternalRoute) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <div className="pt-20">
        {children}
      </div>
    </>
  )
}

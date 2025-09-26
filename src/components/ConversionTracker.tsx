'use client'

import { useEffect } from 'react'
import { useAuth } from '@/providers/AuthProvider'

interface ConversionTrackerProps {
  event: string
  value?: number
  currency?: string
  items?: any[]
}

export function ConversionTracker({ 
  event, 
  value = 0, 
  currency = 'BRL', 
  items = [] 
}: ConversionTrackerProps) {
  const { user } = useAuth()

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', event, {
        value,
        currency,
        items,
        user_id: user?.uid,
        custom_parameters: {
          platform: 'sinergia_ai',
          user_type: user ? 'authenticated' : 'anonymous'
        }
      })
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', event, {
        value,
        currency,
        content_ids: items.map(item => item.id),
        content_type: 'product'
      })
    }

    // LinkedIn Conversion
    if (window.lintrk) {
      window.lintrk('track', { conversion_id: process.env.NEXT_PUBLIC_LINKEDIN_CONVERSION_ID })
    }

  }, [event, value, currency, items, user])

  return null
}
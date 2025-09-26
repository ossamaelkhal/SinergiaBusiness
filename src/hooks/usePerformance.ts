
'use client'

import { useEffect } from 'react'

export function usePerformance() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Monitorar Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          // Tracking LCP para Google Analytics
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'performance',
              event_label: 'LCP',
              value: Math.round(entry.startTime),
              non_interaction: true
            })
          }
        }

        if (entry.entryType === 'first-input') {
          // Tracking FID
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'performance',
              event_label: 'FID',
              value: Math.round(entry.processingStart - entry.startTime),
              non_interaction: true
            })
          }
        }

        if (entry.entryType === 'layout-shift') {
          // Tracking CLS
          if (window.gtag && entry.hadRecentInput === false) {
            window.gtag('event', 'web_vitals', {
              event_category: 'performance',
              event_label: 'CLS',
              value: Math.round(entry.value * 1000),
              non_interaction: true
            })
          }
        }
      })
    })

    // Observar métricas
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })

    return () => observer.disconnect()
  }, [])
}

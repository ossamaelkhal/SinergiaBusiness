'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export function AffiliateTracker() {
  const searchParams = useSearchParams()

  useEffect(() => {
    // We check for both ?ref= and ?partner= as valid affiliate parameters
    const ref = searchParams.get('aff') || searchParams.get('ref') || searchParams.get('partner')

    if (ref) {
      // Store the affiliate ID in localStorage
      // In a production environment, you might also want to set a cookie for server-side access
      localStorage.setItem('sinergia_affiliate_id', ref)
      localStorage.setItem('sinergia_affiliate_timestamp', new Date().toISOString())
      
      // Optional: Set a cookie valid for 60 days
      document.cookie = `sinergia_affiliate_id=${ref}; path=/; max-age=${60 * 24 * 60 * 60}; SameSite=Strict`
    }
  }, [searchParams])

  return null
}

"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export function GTMTracking() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: "page_view",
        page_path: url,
      })
    }
  }, [pathname, searchParams])

  return null
}

// Utility function to track lead conversions
export const trackLeadSubmission = (source: string, value = 1, currency = "EUR") => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: "lead_submitted",
      source: source,
      value: value,
      currency: currency,
    })
  }
}

// Utility function to update consent
export const updateConsent = (granted: boolean) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("consent", "update", {
      ad_storage: granted ? "granted" : "denied",
      ad_user_data: granted ? "granted" : "denied",
      ad_personalization: granted ? "granted" : "denied",
      analytics_storage: granted ? "granted" : "denied",
    })
  }
}

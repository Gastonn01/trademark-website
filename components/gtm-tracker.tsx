"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export function GTMTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "")

      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: "page_view",
        page_path: url,
      })
    }
  }, [pathname, searchParams])

  return null
}

// Utility function to grant consent
export function grantConsent() {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("consent", "update", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    })
  }
}

// Utility function to track lead conversion
export function trackLeadSubmission(source = "free_search") {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: "lead_submitted",
      source: source,
      value: 1,
      currency: "EUR",
    })
  }
}

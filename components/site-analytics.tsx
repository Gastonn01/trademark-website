"use client"

import { Analytics } from "@vercel/analytics/next"
import { isAnalyticsExcluded } from "@/lib/analytics-preference"

export function SiteAnalytics() {
  return <Analytics beforeSend={(event) => isAnalyticsExcluded() ? null : event} />
}

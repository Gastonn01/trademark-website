import { isAnalyticsExcluded } from "@/lib/analytics-preference"

/** Distinct paths so each step is a pageview in Vercel Web Analytics. */
export const FUNNEL_PATH = {
  nameCheckStarted: "/free-search/started",
  nameCheckSubmitted: "/thank-you/name-check",
  contactSubmitted: "/thank-you/contact",
  bookACallScheduled: "/thank-you/book-a-call",
  cloneScanSubmitted: "/thank-you/clone-scan",
  affiliateSubmitted: "/thank-you/affiliate",
  amazonReviewSubmitted: "/thank-you/amazon-review",
  registrationSubmitted: "/thank-you/registration",
  paymentSucceeded: "/thank-you/payment",
  verificationSubmitted: "/thank-you-verification",
} as const

export const AUDIENCES = ["athlete", "creator", "musician", "business"] as const
export type Audience = (typeof AUDIENCES)[number]

export function isAudience(value: string | null | undefined): value is Audience {
  return !!value && (AUDIENCES as readonly string[]).includes(value)
}

export function audienceFromHref(href: string | undefined): Audience | undefined {
  if (!href) return undefined
  try {
    const value = new URL(href, "https://justprotected.com").searchParams.get("audience")
    return isAudience(value) ? value : undefined
  } catch {
    return undefined
  }
}

/** Typed name opens the name-check form. An empty name only opens the form. */
export function nameCheckStartedHref(name: string, audience?: string | null) {
  const q = name.trim().slice(0, 80)
  if (!q) return "/free-search"
  const params = new URLSearchParams()
  params.set("q", q)
  if (isAudience(audience)) params.set("audience", audience)
  return `${FUNNEL_PATH.nameCheckStarted}?${params.toString()}`
}

/**
 * Custom events for plans that record track(). Hobby Web Analytics counts the
 * paths in FUNNEL_PATH; a missing track export is ignored.
 */
export function trackFunnel(name: string) {
  if (typeof window === "undefined" || isAnalyticsExcluded()) return
  void import("@vercel/analytics")
    .then((mod) => {
      const track = (mod as { track?: (event: string) => void }).track
      if (typeof track === "function") track(name)
    })
    .catch(() => {})
}

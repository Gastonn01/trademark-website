import type { Metadata } from "next"
import { FunnelThankYou } from "@/components/funnel-thank-you"

export const metadata: Metadata = {
  title: "Name check received | Just Protected",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you/name-check" },
}

export default function NameCheckThankYouPage() {
  return (
    <FunnelThankYou
      kicker="Free name check"
      title="We have your name."
      body="Your free name check is in. We review whether that name is already claimed and email you. This is a starting point, not a clearance opinion."
    />
  )
}

import type { Metadata } from "next"
import { FunnelThankYou } from "@/components/funnel-thank-you"

export const metadata: Metadata = {
  title: "Affiliate request received | Just Protected",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you/affiliate" },
}

export default function AffiliateThankYouPage() {
  return (
    <FunnelThankYou
      kicker="Affiliates"
      title="Got it."
      body="We'll email you your code and next steps."
    />
  )
}

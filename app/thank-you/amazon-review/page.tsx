import type { Metadata } from "next"
import { FunnelThankYou } from "@/components/funnel-thank-you"

export const metadata: Metadata = {
  title: "Brand review requested | Just Protected",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you/amazon-review" },
}

export default function AmazonReviewThankYouPage() {
  return (
    <FunnelThankYou
      kicker="Amazon sellers"
      title="Your request is saved."
      body="Our team will review your brand name, products, and target country, then email you the next steps. This is a request for a preliminary review, not an instant clearance result."
    />
  )
}

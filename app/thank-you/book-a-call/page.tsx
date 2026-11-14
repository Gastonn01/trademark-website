import type { Metadata } from "next"
import { FunnelThankYou } from "@/components/funnel-thank-you"

export const metadata: Metadata = {
  title: "Call booked | Just Protected",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you/book-a-call" },
}

export default function BookACallThankYouPage() {
  return (
    <FunnelThankYou
      kicker="Free consultation"
      title="Your call is booked."
      body="The time is saved. You will get a confirmation email with the details."
    />
  )
}

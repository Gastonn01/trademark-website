import type { Metadata } from "next"
import { FunnelThankYou } from "@/components/funnel-thank-you"

export const metadata: Metadata = {
  title: "Message received | Just Protected",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you/contact" },
}

export default function ContactThankYouPage() {
  return (
    <FunnelThankYou
      kicker="Contact"
      title="Your message is in."
      body="Thanks for writing. We will get back to you by email."
    />
  )
}

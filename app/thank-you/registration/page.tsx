import type { Metadata } from "next"
import { FunnelThankYou } from "@/components/funnel-thank-you"

export const metadata: Metadata = {
  title: "Registration details received | Just Protected",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you/registration" },
}

export default function RegistrationThankYouPage() {
  return (
    <FunnelThankYou
      kicker="Registration details"
      title="Your details are in."
      body="We have the information needed to prepare the filing and will follow up by email."
    />
  )
}

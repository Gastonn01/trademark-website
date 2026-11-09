import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Verification Received | Just Protected",
  description: "We have received your trademark verification request.",
  alternates: { canonical: "/thank-you-verification" },
  openGraph: {
    title: "Verification Received | Just Protected",
    description: "We have received your trademark verification request.",
    url: "/thank-you-verification",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Verification Received | Just Protected",
    description: "We have received your trademark verification request.",
  },
  robots: { index: false, follow: false },
}

import { NavBar } from "@/components/nav-bar"
import { ThankYouVerificationContent } from "@/components/thank-you-verification-content"
import { Footer } from "@/components/footer"

export default function ThankYouVerificationPage() {
  return (
    <main className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <NavBar />
      <ThankYouVerificationContent />
      <Footer />
    </main>
  )
}

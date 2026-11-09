import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Thank You | Just Protected",
  description: "We have received your enquiry and will follow up shortly.",
  alternates: { canonical: "/thank-you" },
  openGraph: {
    title: "Thank You | Just Protected",
    description: "We have received your enquiry and will follow up shortly.",
    url: "/thank-you",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thank You | Just Protected",
    description: "We have received your enquiry and will follow up shortly.",
  },
  robots: { index: false, follow: false },
}

import { NavBar } from "@/components/nav-bar"
import { ThankYouContent } from "@/components/thank-you-content"
import { Footer } from "@/components/footer"

export default function ThankYouPage() {
  return (
    <main className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <NavBar />
      <ThankYouContent />
      <Footer />
    </main>
  )
}

import { NavBar } from "@/components/nav-bar"
import { ThankYouContent } from "@/components/thank-you-content"
import { Footer } from "@/components/footer"

import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Thank You | Just Protected",
  description: "We received your message. The Just Protected team will follow up.",
  path: "/thank-you",
  noindex: true,
})

export default function ThankYouPage() {
  return (
    <main className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <NavBar />
      <ThankYouContent />
      <Footer />
    </main>
  )
}

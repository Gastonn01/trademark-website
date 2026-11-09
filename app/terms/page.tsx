import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Just Protected",
  description: "The terms that govern use of Just Protected's website and trademark services.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service | Just Protected",
    description: "The terms that govern use of Just Protected's website and trademark services.",
    url: "/terms",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Just Protected",
    description: "The terms that govern use of Just Protected's website and trademark services.",
  },
}

import { NavBar } from "@/components/nav-bar"
import { TermsOfService } from "@/components/terms-of-service"
import { Footer } from "@/components/footer"

export default function TermsOfServicePage() {
  return (
    <main className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <div id="top"></div>
      <NavBar />
      <TermsOfService />
      <Footer />
    </main>
  )
}

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trademark Legal Services | Just Protected",
  description: "Attorney support for trademark filing, office actions, and brand protection.",
  alternates: { canonical: "/legal-services" },
  openGraph: {
    title: "Trademark Legal Services | Just Protected",
    description: "Attorney support for trademark filing, office actions, and brand protection.",
    url: "/legal-services",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trademark Legal Services | Just Protected",
    description: "Attorney support for trademark filing, office actions, and brand protection.",
  },
}

import { NavBar } from "@/components/nav-bar"
import { LegalServicesContent } from "@/components/legal-services-content"
import { Footer } from "@/components/footer"

export default function LegalServicesPage() {
  return (
    <main className="bg-gradient-to-b from-indigo-50 to-white">
      <NavBar />
      <LegalServicesContent />
      <Footer />
    </main>
  )
}

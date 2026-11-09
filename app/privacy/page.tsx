import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Just Protected",
  description: "How Just Protected collects, uses, and protects personal information.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | Just Protected",
    description: "How Just Protected collects, uses, and protects personal information.",
    url: "/privacy",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Just Protected",
    description: "How Just Protected collects, uses, and protects personal information.",
  },
}

import { NavBar } from "@/components/nav-bar"
import { PrivacyPolicy } from "@/components/privacy-policy"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <NavBar />
      <PrivacyPolicy />
      <Footer />
    </main>
  )
}

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy | Just Protected",
  description: "How Just Protected uses cookies and how you can manage your choices.",
  alternates: { canonical: "/cookies" },
  openGraph: {
    title: "Cookie Policy | Just Protected",
    description: "How Just Protected uses cookies and how you can manage your choices.",
    url: "/cookies",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | Just Protected",
    description: "How Just Protected uses cookies and how you can manage your choices.",
  },
}

import { NavBar } from "@/components/nav-bar"
import { CookiePolicy } from "@/components/cookie-policy"
import { Footer } from "@/components/footer"

export default function CookiePolicyPage() {
  return (
    <main className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <NavBar />
      <CookiePolicy />
      <Footer />
    </main>
  )
}

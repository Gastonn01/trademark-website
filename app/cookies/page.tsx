import { NavBar } from "@/components/nav-bar"
import { CookiePolicy } from "@/components/cookie-policy"
import { Footer } from "@/components/footer"

import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy | Just Protected",
  description: "How this website uses cookies and similar technologies, and how you can control them.",
  path: "/cookies",
})

export default function CookiePolicyPage() {
  return (
    <main className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <NavBar />
      <CookiePolicy />
      <Footer />
    </main>
  )
}

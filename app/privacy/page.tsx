import { NavBar } from "@/components/nav-bar"
import { PrivacyPolicy } from "@/components/privacy-policy"
import { Footer } from "@/components/footer"

import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | Just Protected",
  description: "How we collect, use, and safeguard information when you use this website.",
  path: "/privacy",
})

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <NavBar />
      <PrivacyPolicy />
      <Footer />
    </main>
  )
}

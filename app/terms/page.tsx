import { NavBar } from "@/components/nav-bar"
import { TermsOfService } from "@/components/terms-of-service"
import { Footer } from "@/components/footer"

import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service | Just Protected",
  description: "Terms and conditions for using the Just Protected website and services.",
  path: "/terms",
})

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

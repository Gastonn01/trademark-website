import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { CloneScanLanding } from "@/components/clone-scan-landing"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Brand Clone Scan | Just Protected",
  description:
    "Fake shops, cloned accounts, and AI-generated ads impersonating your brand — we scan every major platform and send you a lawyer-reviewed report. Free for 20 brands this month.",
  keywords:
    "brand impersonation, fake instagram account selling, brand clone, counterfeit listing removal, AI deepfake ad, trademark monitoring, brand protection scan",
  alternates: {
    canonical: "https://justprotected.com/scan",
    languages: { es: "https://justprotected.com/escaneo" },
  },
}

export default function ScanPage() {
  return (
    <main className="bg-white min-h-screen">
      <NavBar />
      <CloneScanLanding lang="en" />
      <Footer />
    </main>
  )
}

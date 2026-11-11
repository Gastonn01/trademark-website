import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trademark Filing Process | Just Protected",
  description: "How trademark filing works, from a free name check through registration.",
  alternates: { canonical: "/trademark-process" },
  openGraph: {
    title: "Trademark Filing Process | Just Protected",
    description: "How trademark filing works, from a free name check through registration.",
    url: "/trademark-process",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trademark Filing Process | Just Protected",
    description: "How trademark filing works, from a free name check through registration.",
  },
  robots: { index: false, follow: true },
}

import { NavBar } from "@/components/nav-bar"
import { TrademarkProcesses } from "@/components/trademark-processes"
import { Footer } from "@/components/footer"

export default function TrademarkProcessPage() {
  return (
    <main className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <NavBar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center text-indigo-900">Trademark Filing Process by Country</h1>
        <TrademarkProcesses />
      </div>
      <Footer />
    </main>
  )
}

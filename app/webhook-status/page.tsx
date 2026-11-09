import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Webhook Status | Just Protected",
  description: "Internal payment webhook status for Just Protected.",
  alternates: { canonical: "/webhook-status" },
  openGraph: {
    title: "Webhook Status | Just Protected",
    description: "Internal payment webhook status for Just Protected.",
    url: "/webhook-status",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Webhook Status | Just Protected",
    description: "Internal payment webhook status for Just Protected.",
  },
  robots: { index: false, follow: false },
}

import WebhookStatus from "@/components/webhook-status"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

export default function WebhookStatusPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1 bg-gray-50">
        <WebhookStatus />
      </div>
      <Footer />
    </main>
  )
}

import WebhookStatus from "@/components/webhook-status"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Webhook Status | Just Protected",
  description: "Internal payment webhook status for Just Protected.",
  path: "/webhook-status",
  noindex: true,
})

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

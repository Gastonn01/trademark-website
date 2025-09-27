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

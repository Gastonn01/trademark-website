import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { TrademarkMonitoringContent } from "@/components/trademark-monitoring-content"

export const metadata = {
  title: "Worldwide Trademark Monitoring Services | Just Protected",
  description:
    "Protect your brand with our comprehensive trademark monitoring service. Track potential infringements across global trademark offices and web domains in real-time.",
}

export default function TrademarkMonitoringPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <div className="pt-20">
        {" "}
        {/* Add padding-top to account for fixed header */}
        <TrademarkMonitoringContent />
      </div>
      <Footer />
    </main>
  )
}

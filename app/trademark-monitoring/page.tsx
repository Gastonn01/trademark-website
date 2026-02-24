import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { TrademarkMonitoringContent } from "@/components/trademark-monitoring-content"

export const metadata = {
  title: "Servicios de Monitoreo de Marcas Mundial | Just Protected",
  description:
    "Protege tu marca con nuestro servicio integral de monitoreo de marcas. Rastrea posibles infracciones en oficinas de marcas globales y dominios web en tiempo real.",
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

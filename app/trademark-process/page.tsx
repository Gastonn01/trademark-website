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

import { NavBar } from "@/components/nav-bar"
import { LegalServicesContent } from "@/components/legal-services-content"
import { Footer } from "@/components/footer"

export default function LegalServicesPage() {
  return (
    <main className="bg-gradient-to-b from-indigo-50 to-white">
      <NavBar />
      <LegalServicesContent />
      <Footer />
    </main>
  )
}

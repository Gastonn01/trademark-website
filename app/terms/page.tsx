import { NavBar } from "@/components/nav-bar"
import { TermsOfService } from "@/components/terms-of-service"
import { Footer } from "@/components/footer"

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


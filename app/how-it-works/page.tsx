import { NavBar } from "@/components/nav-bar"
import { HowItWorksContent } from "@/components/how-it-works-content"
import { Footer } from "@/components/footer"

export default function HowItWorksPage() {
  return (
    <main className="bg-gradient-to-b from-blue-900 to-blue-700 min-h-screen pt-24">
      <NavBar />
      <HowItWorksContent />
      <Footer />
    </main>
  )
}


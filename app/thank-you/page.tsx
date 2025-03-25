import { NavBar } from "@/components/nav-bar"
import { ThankYouContent } from "@/components/thank-you-content"
import { Footer } from "@/components/footer"

export default function ThankYouPage() {
  return (
    <main className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <NavBar />
      <ThankYouContent />
      <Footer />
    </main>
  )
}


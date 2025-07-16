import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { ThankYouVerificationContent } from "@/components/thank-you-verification-content"

export default function ThankYouVerificationPage() {
  return (
    <main className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <NavBar />
      <ThankYouVerificationContent />
      <Footer />
    </main>
  )
}

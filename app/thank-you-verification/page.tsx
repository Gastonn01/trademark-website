import { NavBar } from "@/components/nav-bar"
import { ThankYouVerificationContent } from "@/components/thank-you-verification-content"
import { Footer } from "@/components/footer"

export default function ThankYouVerificationPage() {
  return (
    <main className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <NavBar />
      <ThankYouVerificationContent />
      <Footer />
    </main>
  )
}

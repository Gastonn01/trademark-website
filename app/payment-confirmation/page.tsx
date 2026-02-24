import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { PaymentConfirmation } from "@/components/payment-confirmation"

export const metadata = {
  title: "Registration Status | Just Protected",
  description: "Check your trademark registration status.",
}

export default function PaymentConfirmationPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1">
        <PaymentConfirmation />
      </div>
      <Footer />
    </main>
  )
}

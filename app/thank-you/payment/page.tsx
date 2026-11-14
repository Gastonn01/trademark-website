import type { Metadata } from "next"
import { Suspense } from "react"
import PaymentConfirmationClient from "../../payment-confirmation/payment-confirmation-client"

export const metadata: Metadata = {
  title: "Payment received | Just Protected",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you/payment" },
}

export default function PaymentThankYouPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white px-4 py-24 text-center text-gray-700">Confirming your payment…</main>
      }
    >
      <PaymentConfirmationClient />
    </Suspense>
  )
}

import { Suspense } from "react"
import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"
import PaymentConfirmationClient from "./payment-confirmation-client"

export const metadata: Metadata = pageMetadata({
  title: "Payment Confirmation | Just Protected",
  description: "Confirmation of your Just Protected trademark registration payment.",
  path: "/payment-confirmation",
  noindex: true,
})

export default function PaymentConfirmationPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-24 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Payment confirmation</h1>
            <p className="text-gray-600">Confirming your payment…</p>
          </div>
        </main>
      }
    >
      <PaymentConfirmationClient />
    </Suspense>
  )
}

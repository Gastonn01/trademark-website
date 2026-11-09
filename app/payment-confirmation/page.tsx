import type { Metadata } from "next"
import { Suspense } from "react"
import PaymentConfirmationClient from "./payment-confirmation-client"

export const metadata: Metadata = {
  openGraph: {
    title: "Payment Confirmation | Just Protected",
    description: "Payment status for a Just Protected trademark filing.",
    url: "/payment-confirmation",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Payment Confirmation | Just Protected",
    description: "Payment status for a Just Protected trademark filing.",
  },
  title: "Payment Confirmation | Just Protected",
  description: "Payment status for a Just Protected trademark filing.",
  alternates: { canonical: "/payment-confirmation" },
  robots: { index: false, follow: false },
}

export default function PaymentConfirmationPage() {
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

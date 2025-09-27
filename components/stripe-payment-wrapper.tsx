"use client"

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { useEffect, useState } from "react"
import { PaymentForm } from "./payment-form"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, AlertCircle } from "lucide-react"

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface StripePaymentWrapperProps {
  amount: number
  formData?: any
  currency?: string
}

export function StripePaymentWrapper({ amount, formData, currency = "eur" }: StripePaymentWrapperProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount,
            currency: currency.toLowerCase(),
            metadata: {
              customerName: formData?.name ? `${formData.name} ${formData.surname || ""}`.trim() : "Unknown",
              customerEmail: formData?.email || "Unknown",
              customerPhone: formData?.phone || "",
              trademarkName: formData?.trademarkName || "",
              service: "trademark-registration",
              timestamp: new Date().toISOString(),
            },
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to create payment intent")
        }

        const data = await response.json()
        setClientSecret(data.clientSecret)
      } catch (err: any) {
        console.error("Error creating payment intent:", err)
        setError(err.message || "Failed to initialize payment. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    if (amount > 0) {
      createPaymentIntent()
    } else {
      setError("Invalid payment amount")
      setLoading(false)
    }
  }, [amount, currency, formData])

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mr-3 text-blue-600" />
          <span className="text-gray-600">Initializing secure payment...</span>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="py-12">
          <div className="flex items-center justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-600 mb-2">Payment Initialization Failed</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!clientSecret) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="py-12">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-yellow-600 mb-2">Payment Not Ready</h3>
            <p className="text-gray-600">Unable to initialize payment. Please refresh the page.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe" as const,
      variables: {
        colorPrimary: "#2563eb",
        colorBackground: "#ffffff",
        colorText: "#1f2937",
        colorDanger: "#dc2626",
        fontFamily: "system-ui, sans-serif",
        spacingUnit: "4px",
        borderRadius: "6px",
      },
    },
  }

  return (
    <Elements options={options} stripe={stripePromise}>
      <PaymentForm amount={amount} formData={formData} currency={currency.toUpperCase()} />
    </Elements>
  )
}

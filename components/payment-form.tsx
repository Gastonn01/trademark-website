"use client"

import { useState, useEffect } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"

interface PaymentFormProps {
  amount: number
  currency?: string
  formData?: any
  setFormData?: any
}

export function PaymentForm({ amount, currency = "EUR", formData, setFormData }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (success) {
      localStorage.setItem("customerEmail", formData?.email || "")
    }
  }, [success, formData?.email])

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setProcessing(true)
    setError(null)

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      setError("Card element not found")
      setProcessing(false)
      return
    }

    try {
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(formData?.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${formData?.name} ${formData?.surname || ""}`,
            email: formData?.email,
          },
        },
        receipt_email: formData?.email,
      })

      if (confirmError) {
        setError(confirmError.message || "Payment confirmation failed")
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setSuccess(true)
        console.log("Payment succeeded!")
      } else {
        setError("An unexpected error occurred")
      }
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred")
    } finally {
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Card details</label>
        <div className="mt-1">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <Button type="submit" disabled={!stripe || processing} className="w-full">
        {processing ? "Processing..." : `Pay $${amount}`}
      </Button>

      {success && <div className="text-green-500">Payment successful!</div>}
    </form>
  )
}

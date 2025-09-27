"use client"

import type React from "react"
import { useState } from "react"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

interface PaymentFormProps {
  amount: number
  formData?: any
  currency?: string
}

export function PaymentForm({ amount, formData, currency = "EUR" }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      setMessage("Payment system is not ready. Please refresh the page.")
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      // Submit the form to validate fields
      const { error: submitError } = await elements.submit()
      if (submitError) {
        setMessage(submitError.message || "Please check your payment details.")
        setIsLoading(false)
        return
      }

      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          receipt_email: formData?.email,
          payment_method_data: {
            billing_details: {
              name: formData?.name ? `${formData.name} ${formData.surname || ""}`.trim() : undefined,
              email: formData?.email,
              phone: formData?.phone,
            },
          },
        },
      })

      if (error) {
        console.error("Payment error:", error)
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message || "Your payment could not be processed.")
        } else {
          setMessage("An unexpected error occurred. Please try again.")
        }
      } else if (paymentIntent) {
        // Payment succeeded
        setIsSuccess(true)
        setMessage("Payment successful! Redirecting...")

        // Store payment details for confirmation page
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "paymentSuccess",
            JSON.stringify({
              paymentIntentId: paymentIntent.id,
              amount: amount,
              currency: currency,
              customerEmail: formData?.email,
            }),
          )
        }

        // Navigate to confirmation page
        setTimeout(() => {
          router.push(`/payment-confirmation?status=success&payment_intent=${paymentIntent.id}`)
        }, 1500)
      }
    } catch (err: any) {
      console.error("Payment processing error:", err)
      setMessage("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount)
  }

  if (isSuccess) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-green-600">Payment Successful!</h3>
          <p className="text-center text-gray-600 mb-4">Thank you for your payment. You will be redirected shortly.</p>
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Complete Your Payment</CardTitle>
        <div className="text-center">
          <span className="text-2xl font-bold text-blue-600">{formatAmount(amount, currency)}</span>
          <p className="text-sm text-gray-600 mt-1">Trademark Registration Service</p>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information Display */}
          {formData && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-gray-900">Customer Information</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Name:</strong> {formData.name} {formData.surname}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                {formData.phone && (
                  <p>
                    <strong>Phone:</strong> {formData.phone}
                  </p>
                )}
                {formData.trademarkName && (
                  <p>
                    <strong>Trademark:</strong> {formData.trademarkName}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Payment Element */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <PaymentElement
              options={{
                layout: "tabs",
                paymentMethodOrder: ["card", "ideal", "bancontact"],
              }}
            />
          </div>

          {/* Error/Success Message */}
          {message && (
            <div
              className={`flex items-center p-4 rounded-lg ${
                isSuccess
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {isSuccess ? <CheckCircle className="h-5 w-5 mr-2" /> : <AlertCircle className="h-5 w-5 mr-2" />}
              {message}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || !stripe || !elements || isSuccess}
            className="w-full py-3 text-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing Payment...
              </>
            ) : (
              `Pay ${formatAmount(amount, currency)}`
            )}
          </Button>

          {/* Security Notice */}
          <div className="text-xs text-gray-500 text-center space-y-1">
            <p>🔒 Your payment information is secure and encrypted</p>
            <p>Powered by Stripe • PCI DSS Compliant</p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

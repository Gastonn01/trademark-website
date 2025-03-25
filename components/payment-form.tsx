"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface PaymentFormProps {
  amount: number
  formData?: any
  currency?: string
}

export function PaymentForm({ amount, formData, currency = "EUR" }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "succeeded" | "failed">("idle")
  const router = useRouter()

  // Guardar el email del cliente para usarlo en la verificación del pago
  useEffect(() => {
    if (formData?.email) {
      localStorage.setItem("customerEmail", formData.email)
    }
  }, [formData])

  // Solo redirigir cuando el pago es exitoso
  useEffect(() => {
    let redirectTimer: NodeJS.Timeout

    if (paymentStatus === "succeeded") {
      redirectTimer = setTimeout(() => {
        router.push("/payment-confirmation?status=success")
      }, 2000)
    }

    return () => {
      if (redirectTimer) clearTimeout(redirectTimer)
    }
  }, [paymentStatus, router])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not been properly initialized")
      return
    }

    setIsProcessing(true)
    setPaymentStatus("processing")

    try {
      // Create the payment
      const { error: submitError } = await elements.submit()
      if (submitError) {
        setErrorMessage(submitError.message ?? "An error occurred while submitting your payment information")
        setPaymentStatus("failed")
        setIsProcessing(false)
        return
      }

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-confirmation`,
          receipt_email: formData?.email,
          payment_method_data: {
            billing_details: {
              name: formData?.name ? `${formData.name} ${formData.surname || ""}` : undefined,
              email: formData?.email,
              phone: formData?.phone,
            },
          },
        },
      })

      if (error) {
        setErrorMessage(error.message ?? "An unknown error occurred")
        setPaymentStatus("failed")
      } else {
        // Payment succeeded if no error
        setPaymentStatus("succeeded")
      }
    } catch (e) {
      setErrorMessage("An error occurred while processing your payment")
      setPaymentStatus("failed")
    } finally {
      setIsProcessing(false)
    }
  }

  if (!stripe || !elements) {
    return <div className="p-8 text-center">Loading payment form...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete Your Payment</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          {paymentStatus === "succeeded" ? (
            <div className="flex flex-col items-center justify-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
              <p className="text-center text-gray-600">
                Thank you for your payment. You will be redirected to the confirmation page shortly.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <PaymentElement />
              </div>

              {errorMessage && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{errorMessage}</p>
                </div>
              )}
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-lg font-semibold">
            Total: {amount.toFixed(2)} {currency}
          </p>
          {paymentStatus !== "succeeded" && (
            <Button
              type="submit"
              disabled={isProcessing || !stripe || !elements}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isProcessing ? "Processing..." : "Pay Now"}
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}


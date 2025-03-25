"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PaymentStatus {
  status: string
  amount?: number
  currency?: string
  error?: string
}

export function PaymentConfirmation() {
  const searchParams = useSearchParams()
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const paymentIntentId = searchParams.get("payment_intent")
      const redirectStatus = searchParams.get("redirect_status")
      const customerEmail = localStorage.getItem("customerEmail")

      // Si tenemos un ID de PaymentIntent, verificamos su estado
      if (paymentIntentId) {
        try {
          const response = await fetch("/api/check-payment-status", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentIntentId,
              customerEmail,
            }),
          })

          if (response.ok) {
            const data = await response.json()
            setPaymentStatus(data)
          } else {
            setPaymentStatus({
              status: "error",
              error: "Failed to verify payment status",
            })
          }
        } catch (error) {
          console.error("Error checking payment status:", error)
          setPaymentStatus({
            status: "error",
            error: "An unexpected error occurred",
          })
        }
      } else if (redirectStatus) {
        // Si solo tenemos el estado de redirección, lo usamos
        setPaymentStatus({ status: redirectStatus })
      } else {
        // Si no tenemos ninguno, mostramos un error
        setPaymentStatus({
          status: "error",
          error: "No payment information found",
        })
      }

      setLoading(false)
    }

    checkPaymentStatus()
  }, [searchParams])

  if (loading) {
    return (
      <div className="container max-w-3xl py-12 flex flex-col items-center justify-center min-h-[50vh]">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle>Verifying Payment</CardTitle>
            <CardDescription>Please wait while we verify your payment...</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-10">
            <Loader2 className="h-16 w-16 text-blue-500 animate-spin mb-4" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!paymentStatus) {
    return null
  }

  const isSuccess = paymentStatus.status === "succeeded" || paymentStatus.status === "success"
  const isPending = paymentStatus.status === "processing" || paymentStatus.status === "requires_capture"
  const isError = !isSuccess && !isPending

  return (
    <div className="container max-w-3xl py-12">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle>
            {isSuccess ? "Payment Successful" : isPending ? "Payment Processing" : "Payment Failed"}
          </CardTitle>
          <CardDescription>
            {isSuccess
              ? "Thank you for your payment. Your trademark registration process has begun."
              : isPending
                ? "Your payment is being processed. We will notify you once it is complete."
                : "There was an issue with your payment. Please try again or contact support."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-10">
          {isSuccess ? (
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          ) : isPending ? (
            <AlertCircle className="h-16 w-16 text-yellow-500 mb-4" />
          ) : (
            <XCircle className="h-16 w-16 text-red-500 mb-4" />
          )}

          {paymentStatus.amount && paymentStatus.currency && (
            <p className="text-lg font-medium mb-6">
              Amount: {(paymentStatus.amount / 100).toFixed(2)} {paymentStatus.currency.toUpperCase()}
            </p>
          )}

          {paymentStatus.error && <p className="text-red-600 mb-6">{paymentStatus.error}</p>}

          <div className="flex gap-4 mt-4">
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
            {isError && (
              <Button asChild variant="outline">
                <Link href="/verification">Try Again</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


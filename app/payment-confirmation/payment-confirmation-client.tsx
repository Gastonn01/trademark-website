"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

interface PaymentDetails {
  paymentIntentId?: string
  amount?: number
  currency?: string
  customerEmail?: string
  status?: string
}

export default function PaymentConfirmationPage() {
  const searchParams = useSearchParams()
  const [paymentStatus, setPaymentStatus] = useState<"loading" | "success" | "failed" | "canceled">("loading")
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null)

  useEffect(() => {
    const status = searchParams.get("status")
    const paymentIntentId = searchParams.get("payment_intent")
    const redirectStatus = searchParams.get("redirect_status")

    // Check localStorage for payment details
    if (typeof window !== "undefined") {
      const storedPayment = localStorage.getItem("paymentSuccess")
      if (storedPayment) {
        try {
          const parsed = JSON.parse(storedPayment)
          setPaymentDetails(parsed)
          localStorage.removeItem("paymentSuccess") // Clean up
        } catch (e) {
          console.error("Error parsing stored payment data:", e)
        }
      }
    }

    // Determine status from URL parameters
    if (status === "success" || redirectStatus === "succeeded") {
      setPaymentStatus("success")
    } else if (status === "failed" || redirectStatus === "failed") {
      setPaymentStatus("failed")
    } else if (status === "canceled" || redirectStatus === "canceled") {
      setPaymentStatus("canceled")
    } else if (paymentIntentId) {
      // If we have a payment intent ID, assume success
      setPaymentStatus("success")
      setPaymentDetails((prev) => ({ ...prev, paymentIntentId }))
    } else {
      // Default to failed if no clear status
      setPaymentStatus("failed")
    }
  }, [searchParams])

  const renderContent = () => {
    switch (paymentStatus) {
      case "loading":
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardContent className="flex justify-center items-center py-12">
              <Loader2 className="h-12 w-12 text-blue-600 animate-spin mr-4" />
              <span className="text-lg text-gray-600">Verifying payment status...</span>
            </CardContent>
          </Card>
        )

      case "success":
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-green-600">Payment Successful!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-lg text-gray-600 mb-4">
                  Thank you for your payment. Your trademark registration process has begun!
                </p>
                {paymentDetails?.paymentIntentId && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Reference:</strong> {paymentDetails.paymentIntentId}
                    </p>
                    {paymentDetails.amount && paymentDetails.currency && (
                      <p className="text-sm text-gray-600 mt-1">
                        <strong>Amount:</strong>{" "}
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: paymentDetails.currency,
                        }).format(paymentDetails.amount)}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-3">What happens next?</h3>
                <ul className="text-blue-800 space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    You'll receive a confirmation email within the next few minutes
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    Our legal team will review your application within 24 hours
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    We'll keep you updated throughout the registration process
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    The complete process typically takes 6-12 months
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg">
                  <Link href="/">Return to Home</Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      case "failed":
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-red-600">Payment Failed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-lg text-gray-600 mb-4">
                  Unfortunately, we couldn't process your payment. Please try again.
                </p>
              </div>

              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="font-semibold text-red-900 mb-3">Common solutions:</h3>
                <ul className="text-red-800 space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    Check your card details and try again
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    Try a different payment method
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    Contact your bank if the issue persists
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    Reach out to our support team for assistance
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg">
                  <Link href="/forms">Try Again</Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      case "canceled":
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-yellow-600">Payment Canceled</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-lg text-gray-600 mb-4">
                  Your payment was canceled. No charges were made to your account.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  If you canceled by mistake, you can start the process again. Your information may have been saved.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg">
                  <Link href="/forms">Start Over</Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link href="/">Return to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )
    }
  }

  return (
    <main className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1 bg-gray-50 py-12 px-4">
        <div className="container mx-auto">{renderContent()}</div>
      </div>
      <Footer />
    </main>
  )
}

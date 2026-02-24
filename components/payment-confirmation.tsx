"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PaymentConfirmation() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<string>("pending")

  useEffect(() => {
    const statusParam = searchParams.get("status")
    if (statusParam) {
      setStatus(statusParam)
    }
  }, [searchParams])

  const isSuccess = status === "success"
  const isError = status === "error"

  return (
    <div className="container max-w-3xl py-12">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle>
            {isSuccess ? "Registration Received" : isError ? "Registration Failed" : "Registration Status"}
          </CardTitle>
          <CardDescription>
            {isSuccess
              ? "Thank you for your registration. We will contact you shortly to complete the process."
              : isError
                ? "There was an issue with your registration. Please try again or contact support."
                : "Your registration status is being processed."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-10">
          {isSuccess ? (
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          ) : isError ? (
            <XCircle className="h-16 w-16 text-red-500 mb-4" />
          ) : (
            <AlertCircle className="h-16 w-16 text-yellow-500 mb-4" />
          )}

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

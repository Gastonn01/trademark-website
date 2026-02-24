"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'

interface PaymentFormProps {
  amount: number
  formData?: any
  currency?: string
}

export function PaymentForm({ amount, formData, currency = "EUR" }: PaymentFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-8">
          <AlertCircle className="h-16 w-16 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Payment Processing Unavailable</h3>
          <p className="text-center text-gray-600 mb-4">
            Online payment processing is currently unavailable. Please contact us directly to complete your trademark registration.
          </p>
          <p className="text-lg font-semibold">
            Total: {amount.toFixed(2)} {currency}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

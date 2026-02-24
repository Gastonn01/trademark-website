"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Loader2 } from "lucide-react"

interface MercadoPagoPaymentProps {
  amount: number
  title: string
  description: string
  formData: any
}

export function MercadoPagoPayment({ amount, title, description, formData }: MercadoPagoPaymentProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePayment = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/create-mercadopago-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          title,
          description,
          formData,
        }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      // Redirigir a MercadoPago
      window.location.href = data.initPoint
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error procesando el pago")
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Proceder al Pago
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          <div className="mt-3 text-2xl font-bold text-blue-600">${amount.toLocaleString()}</div>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

        <Button onClick={handlePayment} disabled={loading} className="w-full bg-blue-500 hover:bg-blue-600">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              Pagar con MercadoPago
            </>
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Serás redirigido a MercadoPago para completar el pago de forma segura
        </p>
      </CardContent>
    </Card>
  )
}

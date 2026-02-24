"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Home, Mail } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccess() {
  const searchParams = useSearchParams()
  const [paymentInfo, setPaymentInfo] = useState<any>(null)

  useEffect(() => {
    const paymentId = searchParams.get("payment_id")
    const status = searchParams.get("status")
    const externalReference = searchParams.get("external_reference")

    setPaymentInfo({
      paymentId,
      status,
      externalReference,
    })
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-green-800">¡Pago Exitoso!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Tu pago ha sido procesado correctamente. Hemos recibido tu solicitud de registro de marca.
            </p>

            {paymentInfo?.paymentId && (
              <div className="bg-gray-50 p-3 rounded-lg text-sm">
                <p>
                  <strong>ID de Pago:</strong> {paymentInfo.paymentId}
                </p>
                <p>
                  <strong>Estado:</strong> {paymentInfo.status}
                </p>
              </div>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Próximos pasos:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Recibirás un email de confirmación</li>
              <li>• Nuestro equipo revisará tu solicitud</li>
              <li>• Te contactaremos en 24-48 horas</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button asChild className="flex-1">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Inicio
              </Link>
            </Button>
            <Button variant="outline" asChild className="flex-1 bg-transparent">
              <Link href="/contact">
                <Mail className="mr-2 h-4 w-4" />
                Contacto
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

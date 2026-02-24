"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle, ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"

export default function PaymentFailure() {
  const searchParams = useSearchParams()
  const [paymentInfo, setPaymentInfo] = useState<any>(null)

  useEffect(() => {
    const paymentId = searchParams.get("payment_id")
    const status = searchParams.get("status")
    const statusDetail = searchParams.get("status_detail")

    setPaymentInfo({
      paymentId,
      status,
      statusDetail,
    })
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-red-800">Pago No Completado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              No pudimos procesar tu pago. No te preocupes, puedes intentarlo nuevamente.
            </p>

            {paymentInfo?.paymentId && (
              <div className="bg-gray-50 p-3 rounded-lg text-sm">
                <p>
                  <strong>ID de Pago:</strong> {paymentInfo.paymentId}
                </p>
                <p>
                  <strong>Estado:</strong> {paymentInfo.status}
                </p>
                {paymentInfo.statusDetail && (
                  <p>
                    <strong>Detalle:</strong> {paymentInfo.statusDetail}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Posibles causas:</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Fondos insuficientes</li>
              <li>• Datos de tarjeta incorrectos</li>
              <li>• Problema temporal del banco</li>
              <li>• Pago cancelado por el usuario</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button asChild className="flex-1">
              <Link href="/registro-marca">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Intentar de Nuevo
              </Link>
            </Button>
            <Button variant="outline" asChild className="flex-1 bg-transparent">
              <Link href="/contact">
                <Mail className="mr-2 h-4 w-4" />
                Ayuda
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

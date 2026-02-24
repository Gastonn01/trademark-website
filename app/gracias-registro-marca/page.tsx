"use client"

import { useSearchParams } from "next/navigation"
import { CreditCard, Loader2, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Script from "next/script"
import { Suspense, useEffect, useState } from "react"

function GraciasContent() {
  const searchParams = useSearchParams()
  const plan = searchParams.get("plan")
  const total = searchParams.get("total")
  const classes = searchParams.get("classes")
  const email = searchParams.get("email")
  const trademarkName = searchParams.get("trademarkName")

  const [isCreatingPayment, setIsCreatingPayment] = useState(false)
  const [paymentData, setPaymentData] = useState<{ preferenceId: string; initPoint: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const formattedTotal = total ? Number.parseInt(total).toLocaleString() : null

  useEffect(() => {
    console.log("[v0] Page loaded with params:", { plan, total, classes, email, trademarkName })
    if (plan && total && email) {
      console.log("[v0] Auto-creating payment preference")
      createPaymentPreference()
    } else {
      console.log("[v0] Missing required params, showing error")
      setError(
        "Datos incompletos para crear el pago. Por favor completa nuevamente el formulario de registro de marca.",
      )
    }
  }, [plan, total, email])

  const createPaymentPreference = async () => {
    console.log("[v0] Starting createPaymentPreference")
    setIsCreatingPayment(true)
    setError(null)

    try {
      const requestData = {
        plan,
        total: Number.parseInt(total || "0"),
        classes,
        email,
        trademarkName: trademarkName || "Registro de Marca",
      }

      console.log("[v0] Sending request to create preference with data:", requestData)

      const response = await fetch("/api/mercadopago/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      })

      console.log("[v0] Response status:", response.status)
      const data = await response.json()
      console.log("[v0] Response data:", data)

      if (!response.ok) {
        const errorMsg = data.details || data.error || "Error al crear la preferencia de pago"
        console.error("[v0] API error:", errorMsg)
        setError(errorMsg)
        return
      }

      if (data.preferenceId && data.initPoint) {
        console.log("[v0] Preference created successfully:", data.preferenceId)
        setPaymentData({ preferenceId: data.preferenceId, initPoint: data.initPoint })
      } else {
        console.error("[v0] No preferenceId or initPoint in response")
        setError("Error: No se recibió información de pago completa")
      }
    } catch (error) {
      console.error("[v0] Error creating payment preference:", error)
      setError("Error de conexión. Por favor verifica tu internet e intenta nuevamente.")
    } finally {
      setIsCreatingPayment(false)
    }
  }

  const handlePayment = () => {
    if (paymentData?.initPoint) {
      console.log("[v0] Redirecting to MercadoPago:", paymentData.initPoint)
      window.open(paymentData.initPoint, "_blank")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <>
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-17618544334" strategy="afterInteractive" />
        <Script id="google-ads-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17618544334');
          `}
        </Script>
      </>
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="mb-6">
              <CreditCard className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Solo falta el pago!</h1>
              <p className="text-gray-600">Completa tu pago para que podamos comenzar con el registro de tu marca</p>
            </div>

            {formattedTotal && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumen de tu pedido</h2>
                <div className="space-y-2 text-left">
                  {plan && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plan:</span>
                      <span className="font-semibold text-gray-900">{plan}</span>
                    </div>
                  )}
                  {classes && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Clases seleccionadas:</span>
                      <span className="font-semibold text-gray-900">{classes}</span>
                    </div>
                  )}
                  <div className="border-t-2 border-blue-200 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total a pagar:</span>
                      <span className="text-2xl font-bold text-blue-600">${formattedTotal}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-red-900 mb-1">Error al crear la preferencia de pago</p>
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
                {!plan || !total || !email ? (
                  <Button asChild className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href="/registro-marca">Ir al Formulario de Registro</Link>
                  </Button>
                ) : (
                  <Button
                    onClick={createPaymentPreference}
                    variant="outline"
                    className="mt-4 w-full bg-white hover:bg-red-50 border-red-300"
                  >
                    Intentar nuevamente
                  </Button>
                )}
              </div>
            )}

            <div className="mb-8">
              {isCreatingPayment ? (
                <Button disabled className="w-full py-6">
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Preparando pago...
                </Button>
              ) : paymentData ? (
                <Button
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-lg py-6 shadow-lg hover:shadow-xl transition-all"
                >
                  💳 Proceder al Pago con MercadoPago
                </Button>
              ) : !error ? (
                <Button
                  onClick={createPaymentPreference}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-lg py-6 shadow-lg hover:shadow-xl transition-all"
                >
                  💳 Proceder al Pago con MercadoPago
                </Button>
              ) : null}
              <p className="text-sm text-gray-500 mt-2">
                Pago 100% seguro con MercadoPago
                {paymentData && (
                  <span className="block mt-1 text-xs text-gray-400">Se abrirá en una nueva pestaña</span>
                )}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Nota:</strong> Una vez confirmado el pago, comenzaremos inmediatamente con el proceso de
                registro de tu marca.
              </p>
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/">Volver al Inicio</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/contact">Contactar Soporte</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function GraciasRegistroMarca() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <GraciasContent />
    </Suspense>
  )
}

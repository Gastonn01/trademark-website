import { CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PagoExitoso() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="mb-6">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Pago Exitoso!</h1>
              <p className="text-gray-600 text-lg">Tu pago ha sido procesado correctamente</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">¿Qué sigue ahora?</h2>
              <ul className="text-left space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Recibirás un email de confirmación con los detalles de tu compra</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Nuestro equipo comenzará a procesar tu solicitud de registro</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Te contactaremos en las próximas 24-48 horas para coordinar los siguientes pasos</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Importante:</strong> Guarda el comprobante de pago de MercadoPago para tus registros.
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

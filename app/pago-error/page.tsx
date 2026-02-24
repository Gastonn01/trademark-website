import { XCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PagoError() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="mb-6">
              <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Pago Rechazado</h1>
              <p className="text-gray-600 text-lg">No pudimos procesar tu pago</p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Posibles causas:</h2>
              <ul className="text-left space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Fondos insuficientes en tu cuenta</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Datos de tarjeta incorrectos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Tu banco rechazó la transacción</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Límite de compra excedido</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>¿Necesitas ayuda?</strong> Contacta a tu banco o intenta con otro método de pago.
              </p>
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/registro-marca">Intentar Nuevamente</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/contact">Contactar Soporte</Link>
              </Button>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/">Volver al Inicio</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

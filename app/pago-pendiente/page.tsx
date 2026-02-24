import { Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PagoPendiente() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="mb-6">
              <Clock className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Pago Pendiente</h1>
              <p className="text-gray-600 text-lg">Tu pago está siendo procesado</p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">¿Qué significa esto?</h2>
              <div className="text-left space-y-3 text-gray-700">
                <p>Tu pago está en proceso de verificación. Esto puede suceder cuando:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>Pagaste en efectivo (Rapipago, Pago Fácil, etc.)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>Tu banco está verificando la transacción</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>El pago requiere confirmación adicional</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Te notificaremos:</strong> Recibirás un email cuando se confirme tu pago. Esto puede tomar hasta
                48 horas.
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

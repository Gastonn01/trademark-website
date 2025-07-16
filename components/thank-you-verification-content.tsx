import { CheckCircle, Clock, Mail, FileText } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ThankYouVerificationContent() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">¡Gracias por tu solicitud!</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Hemos recibido tu información de verificación de marca registrada y nuestro equipo comenzará a procesarla de
          inmediato.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <Card className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <Clock className="h-12 w-12 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Revisión Inmediata</h3>
          <p className="text-gray-600">Nuestro equipo revisará tu solicitud dentro de las próximas 24-48 horas.</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <FileText className="h-12 w-12 text-green-500" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Preparación de Documentos</h3>
          <p className="text-gray-600">Prepararemos y presentaremos tu solicitud de marca registrada.</p>
        </Card>

        <Card className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <Mail className="h-12 w-12 text-purple-500" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Confirmación</h3>
          <p className="text-gray-600">Recibirás una confirmación una vez que la presentación esté completa.</p>
        </Card>
      </div>

      <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Qué sucede ahora?</h2>
          <div className="space-y-4 text-left max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Revisión de la Solicitud</h3>
                <p className="text-gray-600">
                  Nuestro equipo de especialistas revisará toda la información proporcionada para asegurar que esté
                  completa y correcta.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Preparación de Documentos</h3>
                <p className="text-gray-600">
                  Prepararemos todos los documentos necesarios para la presentación de tu marca registrada.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Presentación Oficial</h3>
                <p className="text-gray-600">Presentaremos tu solicitud ante la oficina de marcas correspondiente.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Seguimiento Continuo</h3>
                <p className="text-gray-600">
                  Te mantendremos informado sobre el progreso de tu solicitud durante todo el proceso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="text-center mt-12">
        <p className="text-gray-600 mb-6">
          Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en contactarnos.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/contact">Contactar Soporte</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Volver al Inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

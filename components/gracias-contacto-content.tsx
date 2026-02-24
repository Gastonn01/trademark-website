"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Mail, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"

export function GraciasContactoContent() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">¡Gracias por tu mensaje!</h1>
          <p className="text-xl text-gray-600">Hemos recibido tu consulta exitosamente</p>
        </div>

        {/* Confirmation Card */}
        <Card className="border-green-200 bg-green-50 mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-green-800 flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Mensaje Enviado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Nuestro equipo se pondrá en contacto contigo en breve</span>
            </div>
            <div className="text-sm text-green-600 bg-white p-3 rounded border border-green-200">
              <strong>Tiempo de respuesta:</strong> Generalmente respondemos dentro de 24 horas durante días hábiles
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">¿Qué sigue ahora?</h3>
          <div className="space-y-2 text-blue-800">
            <p>✅ Tu mensaje ha sido enviado a nuestro equipo</p>
            <p>✅ Recibirás una respuesta personalizada pronto</p>
            <p>✅ Mientras tanto, puedes explorar nuestros servicios</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" className="bg-white hover:bg-gray-50">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver al Inicio
            </Link>
          </Button>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/registro-marca">Solicitar una Marca</Link>
          </Button>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm">¿Necesitas ayuda inmediata?</p>
          <div className="mt-2 space-y-1 text-sm text-gray-700">
            <p>
              🌐 <strong>Web:</strong> trakmar.com
            </p>
            <p>
              📞 <strong>Horario:</strong> Lunes a Viernes, 9:00 - 18:00 hs
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export function CTASection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¿Listo para Proteger Tu Marca?</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          No esperes más. Solicita tu marca hoy y protege tu negocio con nuestro servicio profesional.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Link href="/registro-marca">
              Comenzar Solicitud
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-all duration-200 bg-transparent"
          >
            <Link href="/contacto">Hablar con un Experto</Link>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-blue-100">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span>Proceso 100% Online</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span>Soporte Experto</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span>Garantía de Satisfacción</span>
          </div>
        </div>
      </div>
    </section>
  )
}

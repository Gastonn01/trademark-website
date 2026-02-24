import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2, FileCheck, FileSearch, Globe, Scale, ShieldCheck } from 'lucide-react'

export function PricingSection() {
  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-indigo-700">Protección Integral de Marca</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Servicios Legales IP",
              price: "desde $160.000",
              description: "Análisis legal experto de tu marca",
              cta: "Más Información",
              href: "/verification",
              highlight: "CONSULTA GRATUITA",
            },
            {
              title: "Registro de Marca",
              price: "desde $195.000",
              description: "Registra tu marca con soporte experto",
              cta: "Comenzar Registro",
              href: "/registro-marca",
              highlight: "GARANTÍA DE REEMBOLSO",
            },
            {
              title: "Renovación de Marca",
              price: "desde $120.000",
              description: "Renueva tu marca antes del vencimiento",
              cta: "Renovar Marca",
              href: "/trademark-process#renovacion",
              highlight: "VALIDEZ 10 AÑOS",
            },
          ].map((plan, index) => (
            <Card key={index} className="border-2 hover:border-indigo-500 transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-indigo-700">{plan.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="text-3xl font-bold">{plan.price}</div>
                  <div className="text-sm font-semibold text-indigo-600 mt-1">{plan.highlight}</div>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: FileSearch,
              title: "Búsqueda de Marca",
              description: "Búsqueda exhaustiva para asegurar que tu marca sea única",
            },
            {
              icon: FileCheck,
              title: "Presentación de Solicitud",
              description: "Preparación y presentación experta de tu solicitud de marca",
            },
            {
              icon: Scale,
              title: "Acciones Oficiales",
              description: "Respuestas profesionales a objeciones de la oficina de marcas",
            },
            {
              icon: CheckCircle2,
              title: "Certificado de Registro",
              description: "Asegura tu certificado oficial de registro de marca",
            },
            {
              icon: Globe,
              title: "Protección Internacional",
              description: "Extiende la protección de tu marca globalmente",
            },
            {
              icon: ShieldCheck,
              title: "Soporte Continuo",
              description: "Asistencia continua y monitoreo de tu marca",
            },
          ].map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <feature.icon className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

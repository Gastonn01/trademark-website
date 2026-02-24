"use client"

import { useState } from "react"
import Link from "next/link"
import { Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const plans = [
  {
    id: "basico",
    name: "Básico",
    price: 150000,
    description: "Tramitación esencial con presentación formal ante INPI",
    features: [
      "Presentación oficial de la solicitud ante INPI (honorarios profesionales + tasa oficial)",
      "Envío digital del comprobante oficial de presentación",
    ],
    notIncluded: [],
  },
  {
    id: "estandar",
    name: "Estándar",
    price: 200000,
    description: "Protección con revisión profesional certificada",
    features: [
      "Revisión profesional del formulario de presentación (datos y clasificación) para minimizar riesgos de rechazo",
      "Presentación con tasas oficiales incluidas",
      "Envío digital del comprobante oficial de presentación",
    ],
    popular: false,
    notIncluded: [],
  },
  {
    id: "plus",
    name: "Plus - Protección Integral",
    price: 220000,
    description: "Cobertura legal completa con seguimiento profesional garantizado",
    features: [
      "Revisión exhaustiva del formulario de presentación (datos y clasificación)",
      "Presentación con tasas oficiales incluidas",
      "Envío digital del comprobante oficial de presentación",
      "Contestación profesional gratuita de observaciones de admisión",
      "Envío gratuito del título oficial de marca una vez otorgado el registro",
    ],
    notIncluded: [],
  },
]

export function PricingPlansHome() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  return (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Inversión en Protección Legal</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Planes diseñados por profesionales certificados para garantizar la protección integral de su marca ante el
            INPI
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative transition-all duration-300 ${
                plan.popular ? "border-blue-500 border-2 shadow-xl scale-105" : "border-slate-200 hover:shadow-lg"
              } ${hoveredPlan === plan.id ? "shadow-2xl" : ""}`}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1">
                  Más Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-slate-900">{plan.name}</CardTitle>
                <CardDescription className="text-slate-600">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-blue-600">${plan.price.toLocaleString()}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`w-full ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                  }`}
                >
                  <Link href={`/registro-marca?plan=${plan.id}`}>Solicitar Marca</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

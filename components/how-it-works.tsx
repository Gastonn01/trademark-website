"use client"

import { ArrowRight, Search, UserCheck, FileText, Award } from "lucide-react"
import Link from "next/link"

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Describe tu marca",
      description: "Completa nuestro formulario detallando tu marca, productos o servicios que deseas proteger.",
      color: "bg-blue-100 text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      icon: UserCheck,
      title: "Te conectamos con un agente",
      description: "Nuestro sistema te conecta automáticamente con agentes verificados especializados en tu sector.",
      color: "bg-emerald-100 text-emerald-600",
      borderColor: "border-emerald-200",
    },
    {
      icon: FileText,
      title: "Proceso de registro",
      description:
        "El agente se encarga del proceso legal según el plan seleccionado, desde búsquedas básicas hasta la presentación oficial completa.",
      color: "bg-purple-100 text-purple-600",
      borderColor: "border-purple-200",
    },
    {
      icon: Award,
      title: "Marca registrada",
      description: "Recibe tu certificado de registro y mantén tu marca protegida con nuestro servicio de monitoreo.",
      color: "bg-amber-100 text-amber-600",
      borderColor: "border-amber-200",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">¿Cómo funciona?</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Un proceso simple y transparente para registrar tu marca con expertos verificados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div
                  className={`bg-white rounded-2xl p-8 shadow-sm border-2 ${step.borderColor} hover:shadow-lg transition-all duration-300 h-full`}
                >
                  <div className={`w-14 h-14 ${step.color} rounded-xl flex items-center justify-center mb-6`}>
                    <step.icon className="w-7 h-7" />
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-semibold text-slate-500 mb-2">Paso {index + 1}</div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
                  </div>

                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </div>

                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-blue-400" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/registro-marca"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Comenzar ahora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

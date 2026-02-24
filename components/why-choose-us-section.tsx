"use client"

import { Shield, Globe, Clock, DollarSign, Users, Zap } from "lucide-react"
import { motion } from "framer-motion"

export function WhyChooseUsSection() {
  const reasons = [
    { title: "Red Global", description: "Acceso a expertos legales en más de 180 países", icon: Globe },
    {
      title: "Especialización por Industria",
      description: "Soluciones personalizadas para tu sector empresarial específico",
      icon: Users,
    },
    {
      title: "Reportes Transparentes",
      description: "Panel en tiempo real para seguir el estado de tu solicitud",
      icon: Clock,
    },
    {
      title: "Opciones de Pago Flexibles",
      description: "Planes de pago y descuentos por múltiples países disponibles",
      icon: DollarSign,
    },
    { title: "Análisis con IA", description: "Algoritmos avanzados para mayores tasas de aprobación", icon: Zap },
    { title: "Soporte Post-Registro", description: "Protección continua y gestión de renovaciones", icon: Shield },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Más Allá del Proceso</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Mientras nuestro proceso simplificado garantiza eficiencia, esto es lo que hace que nuestro servicio sea
            verdaderamente excepcional
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <reason.icon className="h-12 w-12 mb-4 text-blue-700" />
              <h3 className="text-xl font-semibold mb-2 text-blue-700">{reason.title}</h3>
              <p className="text-gray-700">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

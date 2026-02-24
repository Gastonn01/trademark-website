import { Shield, Globe, Clock, DollarSign, HeadphonesIcon, AlertCircle } from 'lucide-react'

export function PricingFeatures() {
  const features = [
    {
      icon: Shield,
      title: "Protección Completa",
      description: "Nuestros expertos en marcas garantizan que su marca esté completamente protegida en todas las clases relevantes.",
    },
    {
      icon: Globe,
      title: "Cobertura Global",
      description: "Proteja su marca en múltiples países con nuestros servicios de registro internacional.",
    },
    {
      icon: Clock,
      title: "Rápida Gestión",
      description: "Experimente tiempos de registro rápidos con nuestro proceso eficiente y simplificado.",
    },
    {
      icon: DollarSign,
      title: "Precio Competitivo",
      description: "Obtenga protección de marcas de alta calidad a precios que no romperán su presupuesto.",
    },
    {
      icon: HeadphonesIcon,
      title: "Soporte Experto",
      description: "Acceda a nuestro equipo de abogados especializados en marcas para orientación y asesoramiento.",
    },
    {
      icon: AlertCircle,
      title: "Monitoreo Continuo",
      description: "Monitoreamos y protegemos continuamente su marca de posibles infracciones.",
    },
  ]

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-indigo-900">Por Qué Elegir Nuestros Servicios de Marcas</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md">
              <feature.icon className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-indigo-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

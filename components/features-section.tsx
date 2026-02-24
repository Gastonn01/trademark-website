import { Shield, Award, Clock, Scale } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Seguridad Jurídica",
      description:
        "Protección legal integral de su activo más valioso. Evite litigios y conflictos por uso indebido de su identidad comercial.",
    },
    {
      icon: Award,
      title: "Profesionales Certificados",
      description:
        "Agentes registrados ante el INPI con experiencia comprobada en más de 500 registros exitosos locales e internacionales.",
    },
    {
      icon: Clock,
      title: "Proceso Optimizado",
      description:
        "Sistema eficiente que reduce tiempos y elimina errores administrativos. Seguimiento profesional en cada etapa del trámite.",
    },
    {
      icon: Scale,
      title: "Respaldo Legal Garantizado",
      description:
        "Asesoramiento jurídico especializado en propiedad intelectual. Defensa profesional ante cualquier eventualidad en el proceso.",
    },
  ]

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-slate-900">
          Por Qué Registrar su Marca es una Inversión Estratégica
        </h2>
        <p className="text-center text-slate-600 max-w-3xl mx-auto mb-12">
          La protección legal de su marca no es un gasto, es una inversión esencial que resguarda el valor de su negocio
          y garantiza su crecimiento sostenible en el mercado.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <feature.icon className="w-12 h-12 text-sky-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-slate-900">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

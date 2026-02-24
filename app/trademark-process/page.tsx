import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Globe, Shield, Zap } from "lucide-react"
import Link from "next/link"

export default function TrademarkProcessPage() {
  const plans = [
    {
      name: "Plan Básico - Solicitud Express",
      price: "$150.000",
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      description: "Registro rápido y efectivo para emprendedores que necesitan proteger su marca de manera simple.",
      detailedDescription:
        "Este plan está diseñado para quienes necesitan un registro express sin complicaciones. Incluye la presentación formal ante el INPI con todos los honorarios y tasas oficiales incluidas.",
      features: [
        "Presentación de la solicitud ante INPI (honorarios + tasa oficial)",
        "Envío digital del comprobante de presentación",
      ],
      popular: false,
      countries: ["Argentina"],
      classes: 1,
      href: "/registro-marca?plan=basico",
    },
    {
      name: "Plan Estándar - Protección Básica",
      price: "$200.000",
      icon: <Shield className="h-8 w-8 text-green-600" />,
      description: "El más elegido por empresas que buscan protección completa con revisión profesional de documentos.",
      detailedDescription:
        "Nuestro plan más popular incluye revisión exhaustiva del formulario de presentación para minimizar errores y asegurar que tu solicitud sea procesada correctamente desde el inicio.",
      features: [
        "Revisión del formulario de presentación (datos y clasificación) para minimizar errores",
        "Presentación con tasas incluidas",
        "Envío digital del comprobante de presentación",
      ],
      popular: false,
      countries: ["Argentina"],
      classes: 1,
      href: "/registro-marca?plan=estandar",
    },
    {
      name: "Plan Plus - Seguridad Total",
      price: "$220.000",
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      description: "Nuestro plan elite.",
      detailedDescription:
        "Nuestro plan más completo ofrece protección integral desde la presentación hasta la entrega del título. Incluye contestación de vistas y envío del certificado oficial sin costos adicionales.",
      features: [
        "Revisión del formulario de presentación (datos y clasificación)",
        "Presentación con tasas incluidas",
        "Envío digital del comprobante de presentación",
        "Contestación gratuita de vistas de admisión",
        "Envío gratuito del título de marca una vez concedido",
      ],
      popular: false,
      countries: ["Argentina"],
      classes: 1,
      href: "/registro-marca?plan=plus",
    },
  ]

  const additionalServices = [
    {
      service: "Clase adicional",
      price: "$45.000",
      description: "Por cada clase adicional de productos/servicios (solo Plan Básico y Estándar)",
    },
    {
      service: "Búsqueda internacional",
      price: "$25.000",
      description: "Búsqueda de antecedentes en mercados internacionales específicos",
    },
    {
      service: "Respuesta a observaciones",
      price: "$85.000",
      description: "Si el INPI presenta observaciones durante el proceso (incluida en Plan Estándar y Plus)",
    },
    {
      service: "Renovación de marca",
      price: "$120.000",
      description: "Renovación cada 10 años para mantener la protección activa",
    },
    {
      service: "Monitoreo extendido",
      price: "$35.000/mes",
      description: "Monitoreo continuo de marca más allá del período incluido",
    },
    {
      service: "Gestión de oposiciones",
      price: "$150.000",
      description: "Defensa ante oposiciones de terceros (incluida en Plan Plus)",
    },
  ]

  return (
    <main className="bg-gradient-to-b from-blue-50 via-white to-indigo-50 min-h-screen">
      <NavBar />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Planes Detallados de Registro de Marca</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Te conectamos con agentes especializados verificados. Cada plan incluye el trabajo completo de profesionales
            expertos en propiedad intelectual que manejan todo el proceso por ti.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Check className="h-4 w-4 mr-2" />
              Agentes verificados del INPI
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Check className="h-4 w-4 mr-2" />
              Proceso 100% transparente
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Check className="h-4 w-4 mr-2" />
              Soporte especializado incluido
            </Badge>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative h-full flex flex-col ${plan.popular ? "ring-2 ring-blue-500 scale-105" : ""}`}
              >
                {/* Removed popular badge conditionally */}
                {/* {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      <Star className="h-4 w-4 mr-1" />
                      Más Elegido
                    </Badge>
                  </div>
                )} */}

                <CardHeader className="text-center pb-4 flex-shrink-0">
                  <div className="flex justify-center mb-4">{plan.icon}</div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{plan.description}</p>
                  <div className="bg-gray-50 p-4 rounded-lg text-left">
                    <p className="text-gray-700 text-xs leading-relaxed">{plan.detailedDescription}</p>
                  </div>
                </CardHeader>

                <CardContent className="flex-grow flex flex-col">
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {plan.countries.map((country, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          📍 {country}
                        </Badge>
                      ))}
                      <Badge variant="outline" className="text-xs">
                        📋 {plan.classes} {typeof plan.classes === "number" && plan.classes === 1 ? "clase" : "clases"}
                      </Badge>
                    </div>
                  </div>

                  <ul className="space-y-3 flex-grow mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full mt-auto ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"} text-white`}
                    asChild
                  >
                    <Link href={plan.href}>Elegir {plan.name}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cómo Funciona Nuestro Proceso</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Solo deberás cumplimentar 4 simples pasos y nosotros nos encargamos de todo lo demás.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Ficha de Cliente",
                description: "Ingresás tus datos personales, ya sea a través de nuestro sitio web o telefónicamente.",
                time: "5 minutos",
              },
              {
                step: "2",
                title: "Instrucciones",
                description:
                  "Luego de acreditado tu pago, el sistema te envía automáticamente un instructivo con la documentación que tendrás que enviarnos firmada.",
                time: "Inmediato",
              },
              {
                step: "3",
                title: "Inicio del Expediente",
                description:
                  "Luego de recibir tu documentación firmada, uno de nuestros abogados especialistas en Propiedad Intelectual iniciará la solicitud de registro de marca ante el INPI.",
                time: "2-3 días",
              },
              {
                step: "4",
                title: "Seguimiento del Trámite",
                description:
                  "El abogado a quien se asigne tu solicitud hará el debido seguimiento del trámite, publicación en el Boletín de Marcas, así como todas las acciones legales necesarias para obtener tu registro.",
                time: "12-18 meses",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                <Badge variant="outline" className="text-xs">
                  ⏱️ {item.time}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comparación Detallada de Planes</h2>
            <p className="text-gray-600">Encuentra el plan perfecto para tus necesidades</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 font-semibold text-gray-900">Características</th>
                  <th className="text-center p-4 font-semibold text-gray-900">Básico</th>
                  <th className="text-center p-4 font-semibold text-gray-900 bg-blue-50">Estándar</th>
                  <th className="text-center p-4 font-semibold text-gray-900">Plus</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Precio", "$150.000", "$200.000", "$220.000"],
                  ["Presentación ante INPI", "✓", "✓", "✓"],
                  ["Tasas oficiales incluidas", "✓", "✓", "✓"],
                  ["Comprobante digital", "✓", "✓", "✓"],
                  ["Revisión de formulario", "No", "✓", "✓"],
                  ["Minimización de errores", "No", "✓", "✓"],
                  ["Contestación de vistas", "No", "No", "✓"],
                  ["Envío del título", "No", "No", "✓"],
                ].map((row, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-4 font-medium text-gray-900">{row[0]}</td>
                    <td className="p-4 text-center text-gray-700">{row[1]}</td>
                    <td className="p-4 text-center text-gray-700 bg-blue-50">{row[2]}</td>
                    <td className="p-4 text-center text-gray-700">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">¿Listo para proteger tu marca?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Nuestros agentes verificados te guiarán en cada paso del proceso. Comienza hoy y protege lo que más importa:
            tu marca.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link href="/registro-marca">Comenzar Registro</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              asChild
            >
              <Link href="/para-agentes">Soy Agente</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

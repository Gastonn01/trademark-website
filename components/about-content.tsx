"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Lightbulb, Shield, TrendingUp, Globe } from 'lucide-react'

export function AboutContent() {
  const values = [
    {
      icon: Shield,
      title: "Confianza",
      description: "Verificamos a todos nuestros agentes para garantizar servicios profesionales de calidad"
    },
    {
      icon: Users,
      title: "Conexión",
      description: "Facilitamos encuentros entre quienes necesitan proteger su marca y expertos calificados"
    },
    {
      icon: Lightbulb,
      title: "Simplicidad",
      description: "Convertimos procesos complejos en experiencias simples y comprensibles"
    },
    {
      icon: TrendingUp,
      title: "Crecimiento",
      description: "Ayudamos tanto a emprendedores como a agentes a hacer crecer sus negocios"
    }
  ]

  const stats = [
    { number: "500+", label: "Marcas Conectadas" },
    { number: "50+", label: "Agentes Verificados" },
    { number: "95%", label: "Satisfacción Cliente" },
    { number: "24h", label: "Tiempo Respuesta" }
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Sobre Trakmar
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Somos el primer marketplace legal de propiedad intelectual que conecta emprendedores, 
          startups y empresas con agentes de marcas verificados en Argentina.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <div className="flex items-center mb-4">
            <Target className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Nuestra Misión</h2>
          </div>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Democratizar el acceso a servicios de propiedad intelectual de calidad, 
            conectando a quienes necesitan proteger sus marcas con profesionales especializados 
            de manera simple, transparente y confiable.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            No prestamos servicios directamente, sino que actuamos como intermediario confiable 
            entre cliente y profesional, garantizando calidad y transparencia en cada conexión.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
          <Globe className="w-16 h-16 text-blue-600 mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Visión Global</h3>
          <p className="text-gray-600 leading-relaxed">
            Ser la plataforma líder en Latinoamérica para la conexión entre emprendedores 
            y profesionales de propiedad intelectual, expandiendo oportunidades para todos.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Nuestros Valores
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
        <h2 className="text-3xl font-bold mb-12">Nuestro Impacto</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How We Work Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Cómo Trabajamos
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Para Usuarios</h3>
              <p className="text-gray-600 leading-relaxed">
                Formularios guiados que simplifican el proceso. No necesitas conocer de propiedad 
                intelectual para describir lo que necesitas.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Verificación</h3>
              <p className="text-gray-600 leading-relaxed">
                Todos nuestros agentes pasan por un proceso de verificación para garantizar 
                su experiencia y profesionalismo.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Para Agentes</h3>
              <p className="text-gray-600 leading-relaxed">
                Acceso a clientes pre-calificados, sistema de reputación y herramientas 
                para hacer crecer su práctica profesional.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

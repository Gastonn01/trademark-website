import { Card, CardContent } from "@/components/ui/card"
import { Star } from 'lucide-react'

export function PricingTestimonials() {
  const testimonials = [
    {
      name: "María González",
      company: "Startup Tech",
      rating: 5,
      text: "El proceso fue increíblemente fácil y transparente. Registramos nuestra marca en tiempo récord.",
    },
    {
      name: "Carlos Rodríguez",
      company: "Agencia Creativa",
      rating: 5,
      text: "Excelente servicio al cliente. Nos guiaron paso a paso durante todo el proceso de registro.",
    },
    {
      name: "Ana Martínez",
      company: "E-commerce",
      rating: 5,
      text: "Precios justos y servicio profesional. Definitivamente recomendaría sus servicios.",
    },
  ]

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Lo Que Dicen Nuestros Clientes</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

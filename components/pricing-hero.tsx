import { Button } from "@/components/ui/button"

export function PricingHero() {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Protege tu Marca, Haz Crecer tu Negocio</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Elige un plan que se adapte a tus necesidades y presupuesto. Todos los planes incluyen nuestros servicios integrales de protección de marcas.
        </p>
        <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50" asChild>
          <a href="#plans">Ver Planes</a>
        </Button>
      </div>
    </div>
  )
}

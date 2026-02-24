import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"

interface CTAProps {
  title?: string
  description?: string
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  className?: string
}

export function CTA({
  title = "¿Listo para proteger tu marca?",
  description = "Conecta con agentes especializados y comienza el proceso de solicitud hoy mismo.",
  primaryButtonText = "Comenzar solicitud",
  primaryButtonLink = "/registro-marca",
  secondaryButtonText = "Hablar con un experto",
  secondaryButtonLink = "/contact",
  className = "",
}: CTAProps) {
  return (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div
          className={`relative bg-gradient-to-br from-sky-100 via-sky-200 to-blue-300 py-16 px-8 rounded-2xl overflow-hidden ${className}`}
        >
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] [background-size:24px_24px] opacity-30"></div>

          <div className="relative text-center text-gray-900 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{title}</h2>
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">{description}</p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href={primaryButtonLink}
                className="group inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
                scroll={true}
              >
                {primaryButtonText}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={secondaryButtonLink}
                className="inline-flex items-center justify-center bg-white text-blue-700 border-2 border-blue-300 px-8 py-4 rounded-lg hover:bg-blue-50 transition-all duration-200 font-semibold"
                scroll={true}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {secondaryButtonText}
              </Link>
            </div>

            {/* Trust indicator */}
            <div className="mt-8 pt-8 border-t border-blue-300">
              <p className="text-gray-600 text-sm">
                Más de <span className="text-gray-900 font-semibold">500 empresas</span> han solicitado sus marcas con
                nosotros
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Mail, Phone, CreditCard } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GraciasRegistroPage() {
  return (
    <div className="min-h-screen flex flex-col platform-bg">
      <NavBar />
      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="platform-card">
              <CardContent className="pt-8 pb-8">
                <div className="flex justify-center mb-6">
                  <div className="bg-green-500 rounded-full p-3">
                    <Check className="h-8 w-8 text-white" />
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-white mb-4">¡Solicitud Enviada Exitosamente!</h1>

                <p className="text-gray-300 mb-6">
                  Hemos recibido tu solicitud de registro de marca. Para completar el proceso, realiza el pago a través
                  de Mercado Pago.
                </p>

                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-lg mb-6">
                  <h3 className="text-white font-bold text-xl mb-3">Completa tu Pago</h3>
                  <p className="text-blue-100 mb-4 text-sm">
                    Haz clic en el botón para proceder al pago seguro con Mercado Pago
                  </p>
                  <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold">
                    <a
                      href="https://link.mercadopago.com.ar/trakmar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <CreditCard className="h-5 w-5" />
                      Proceder al Pago
                    </a>
                  </Button>
                </div>

                <div className="bg-sky-900/30 p-4 rounded-lg border border-sky-500/30 mb-6">
                  <h3 className="text-sky-400 font-semibold mb-3">Próximos pasos:</h3>
                  <ul className="text-left text-gray-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 mt-0.5" />
                      <span>Completa el pago a través de Mercado Pago</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 mt-0.5" />
                      <span>Revisaremos tu solicitud y las clases sugeridas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 mt-0.5" />
                      <span>Te asignaremos un agente especializado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 mt-0.5" />
                      <span>Realizaremos una búsqueda de disponibilidad</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-400 mt-0.5" />
                      <span>Comenzaremos el proceso de registro ante INPI</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail className="h-4 w-4" />
                    <span>info@patentutumarca.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone className="h-4 w-4" />
                    <span>+54 11 1234-5678</span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link href="/" className="platform-button-outline inline-flex items-center">
                    Volver al Inicio
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

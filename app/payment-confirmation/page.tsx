import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Confirmación de Pago | Just Protected",
  description: "Gracias por su pago. Su proceso de registro de marca ha comenzado.",
}

export default function PaymentConfirmationPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <NavBar />
      <div className="container max-w-3xl py-12 flex-1">
        <div className="bg-white rounded-lg border shadow-sm p-8">
          <h1 className="text-2xl font-bold text-center mb-4">Confirmación de Pago</h1>
          <p className="text-center text-gray-600 mb-6">
            Gracias por su pago. Su proceso de registro de marca ha comenzado.
          </p>
          <div className="flex justify-center">
            <a href="/" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Volver al Inicio
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}


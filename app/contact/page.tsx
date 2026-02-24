import type { Metadata } from "next"
import { NavBar } from "@/components/nav-bar"
import { ContactContent } from "@/components/contact-content"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Contáctanos | Just Protected",
  description:
    "Contacta a Just Protected para servicios expertos de registro de marcas. Ponte en contacto con nuestro equipo para una consulta gratuita.",
}

export default function ContactPage() {
  return (
    <main className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <NavBar />
      <ContactContent />
      <Footer />
    </main>
  )
}

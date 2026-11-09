import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { CloneScanLanding } from "@/components/clone-scan-landing"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Escaneo gratis de clones de marca | Just Protected",
  description:
    "Tiendas falsas, cuentas clonadas y anuncios hechos con IA suplantando tu marca — escaneamos todas las plataformas y te enviamos un informe revisado por abogados. Gratis para 20 marcas este mes.",
  keywords:
    "suplantación de marca, cuenta falsa instagram vendiendo, clon de marca, denunciar falsificación mercadolibre, deepfake publicidad, monitoreo de marca, protección de marca",
  alternates: {
    canonical: "https://justprotected.com/escaneo",
    languages: { en: "https://justprotected.com/scan" },
  },
}

export default function EscaneoPage() {
  return (
    <main className="bg-white min-h-screen">
      <NavBar />
      <CloneScanLanding lang="es" />
      <Footer />
    </main>
  )
}

import { JsonLd } from "@/components/json-ld"
import { serviceJsonLd } from "@/lib/seo"
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
    canonical: "/escaneo",
    languages: { en: "https://justprotected.com/scan" },
  },

  openGraph: {
    title: "Escaneo gratis de clones de marca | Just Protected",
    description: "Tiendas falsas, cuentas clonadas y anuncios hechos con IA suplantando tu marca \u2014 escaneamos todas las plataformas y te enviamos un informe revisado por abogados. Gratis para 20 marcas este mes.",
    url: "/escaneo",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Escaneo gratis de clones de marca | Just Protected",
    description: "Tiendas falsas, cuentas clonadas y anuncios hechos con IA suplantando tu marca \u2014 escaneamos todas las plataformas y te enviamos un informe revisado por abogados. Gratis para 20 marcas este mes.",
  },
}

export default function EscaneoPage() {
  return (
    <main className="bg-white min-h-screen">
      <JsonLd
        data={serviceJsonLd({
          name: "Escaneo gratis de clones de marca",
          description:
            "Tiendas falsas, cuentas clonadas y anuncios hechos con IA suplantando tu marca — escaneamos todas las plataformas y te enviamos un informe revisado por abogados.",
          path: "/escaneo",
        })}
      />
      <NavBar />
      <CloneScanLanding lang="es" />
      <Footer />
    </main>
  )
}

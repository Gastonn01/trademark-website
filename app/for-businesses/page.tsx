import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { BusinessesLanding } from "@/components/businesses-landing"
import type { Metadata } from "next"
import { OG_IMAGE } from "@/lib/seo"

export const metadata: Metadata = {
  openGraph: {
    title: "Trademark Protection for Businesses & Entrepreneurs | Just Protected",
    description: "File a trademark for your business name as a brand. Licensed attorneys usually file within 24 hours. Registration takes months. Rights date from the filing.",
    url: "/for-businesses",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trademark Protection for Businesses & Entrepreneurs | Just Protected",
    description: "File a trademark for your business name as a brand. Licensed attorneys usually file within 24 hours. Registration takes months. Rights date from the filing.",
    images: [OG_IMAGE.url],
  },
  alternates: { canonical: "/for-businesses" },
  title: "Trademark Protection for Businesses & Entrepreneurs | Just Protected",
  description:
    "File a trademark for your business name as a brand. Licensed attorneys usually file within 24 hours. Registration takes months. Rights date from the filing.",
  keywords: "small business trademark, entrepreneur brand protection, ecommerce trademark, protect my business name, brand clone protection, trademark registration for businesses",
}

export default function ForBusinessesPage() {
  return (
    <main className="bg-white min-h-screen">
      <NavBar />
      <BusinessesLanding />
      <Footer />
    </main>
  )
}

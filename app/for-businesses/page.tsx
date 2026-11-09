import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { BusinessesLanding } from "@/components/businesses-landing"
import type { Metadata } from "next"

export const metadata: Metadata = {
  openGraph: {
    title: "Trademark Protection for Businesses & Entrepreneurs | Just Protected",
    description: "AI made cloning a storefront or brand trivial. Just Protected helps businesses and entrepreneurs trademark their name and brand — filed in 24 hours.",
    url: "/for-businesses",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trademark Protection for Businesses & Entrepreneurs | Just Protected",
    description: "AI made cloning a storefront or brand trivial. Just Protected helps businesses and entrepreneurs trademark their name and brand — filed in 24 hours.",
  },
  alternates: { canonical: "/for-businesses" },
  title: "Trademark Protection for Businesses & Entrepreneurs | Just Protected",
  description:
    "AI made cloning a storefront or brand trivial. Just Protected helps businesses and entrepreneurs trademark their name and brand — filed in 24 hours.",
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

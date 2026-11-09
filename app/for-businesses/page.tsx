import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { BusinessesLanding } from "@/components/businesses-landing"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trademark Protection for Businesses & Entrepreneurs | Just Protected",
  description:
    "AI made cloning a storefront or brand trivial. Just Protected helps businesses and entrepreneurs trademark their name and brand — filed in 24 hours, 70+ countries.",
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

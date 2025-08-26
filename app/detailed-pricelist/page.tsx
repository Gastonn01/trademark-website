import { NavBar } from "@/components/nav-bar"
import { DetailedPricelistHero } from "@/components/detailed-pricelist-hero"
import { DetailedPricelistContent } from "@/components/detailed-pricelist-content"
import { DetailedPricelistFAQ } from "@/components/detailed-pricelist-faq"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Detailed Trademark Pricing | Just Protected",
  description:
    "Explore our detailed trademark pricing list. Select countries and view total price, including a free lawyer's check.",
}

export default function DetailedPricelistPage() {
  return (
    <main className="bg-blue-900">
      <div id="top"></div>
      <NavBar />
      <DetailedPricelistHero />
      <div className="bg-blue-50">
        <DetailedPricelistContent />
        <DetailedPricelistFAQ />
      </div>
      <Footer />
    </main>
  )
}

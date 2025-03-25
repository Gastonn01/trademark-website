import { NavBar } from "@/components/nav-bar"
import { DetailedPricelistHero } from "@/components/detailed-pricelist-hero"
import { DetailedPricelistContent } from "@/components/detailed-pricelist-content"
import { DetailedPricelistFAQ } from "@/components/detailed-pricelist-faq"
import { Footer } from "@/components/footer"

export default function DetailedPricelistPage() {
  return (
    <main className="bg-blue-900">
      <div id="top"></div>
      <NavBar />
      <DetailedPricelistHero />
      <div className="bg-white">
        <DetailedPricelistContent />
        <DetailedPricelistFAQ />
      </div>
      <Footer />
    </main>
  )
}


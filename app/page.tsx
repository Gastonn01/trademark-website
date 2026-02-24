import { HeroSection } from "@/components/hero-section"
import { ForAgents } from "@/components/for-agents"
import { PricingPlansHome } from "@/components/pricing-plans-home"
import { FAQ } from "@/components/faq"
import { CTA } from "@/components/cta"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { ScrollToTopOnMount } from "@/components/scroll-to-top-on-mount"
import { DiscountPopup } from "@/components/discount-popup"
import { TrademarkProcess } from "@/components/trademark-process"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-sky-50">
      <ScrollToTopOnMount />
      <NavBar />
      <main>
        <HeroSection />
        <div id="proceso">
          <TrademarkProcess />
        </div>
        <PricingPlansHome />
        <ForAgents />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <DiscountPopup />
    </div>
  )
}

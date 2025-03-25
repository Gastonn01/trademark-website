import { NavBar } from "@/components/nav-bar"
import { PricingHero } from "@/components/pricing-hero"
import { PricingPlans } from "@/components/pricing-plans"
import { PricingFeatures } from "@/components/pricing-features"
import { PricingTestimonials } from "@/components/pricing-testimonials"
import { PricingFAQ } from "@/components/pricing-faq"
import { Footer } from "@/components/footer"

export default function PricingPage() {
  return (
    <main className="bg-gradient-to-b from-indigo-50 to-white">
      <div id="top"></div>
      <NavBar />
      <PricingHero />
      <PricingPlans />
      <PricingFeatures />
      <PricingTestimonials />
      <PricingFAQ />
      <Footer />
    </main>
  )
}


import { NavBar } from "@/components/nav-bar"
import { HeroSection } from "@/components/hero-section"
import { ProcessSection } from "@/components/process-section"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { CTASection } from "@/components/cta-section"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-blue-50 to-white pt-16">
      <NavBar />
      <HeroSection />
      <ProcessSection />
      <WhyChooseUsSection />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  )
}


import { NavBar } from "@/components/nav-bar"
import { HeroSection } from "@/components/hero-section"
import { ProcessSection } from "@/components/process-section"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { CTASection } from "@/components/cta-section"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Just Protected | Global Trademark Registration Services",
  description:
    "Secure your brand worldwide with Just Protected's comprehensive trademark registration services. AI-powered trademark search and expert legal support.",
}

export default function Home() {
  return (
    <main className="bg-white">
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

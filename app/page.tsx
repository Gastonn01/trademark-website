import { NavBar } from "@/components/nav-bar"
import { AffiliateBanner } from "@/components/affiliate-banner"
import { HeroSection } from "@/components/hero-section"
import { InstantTrademarkCheck } from "@/components/instant-trademark-check"
import { ProcessSection } from "@/components/process-section"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { TrustBanner } from "@/components/trust-banner"
import { CTASection } from "@/components/cta-section"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"
// import { ChatGPTIntegrationSection } from "@/components/chatgpt-integration-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  openGraph: {
    title: "Just Protected | Protect Your Name, Voice & Identity from AI",
    description: "AI is using your name, face, and voice without permission. Just Protected helps athletes, creators, and artists trademark their identity and fight back — filed in 24 hours.",
    url: "/",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Just Protected | Protect Your Name, Voice & Identity from AI",
    description: "AI is using your name, face, and voice without permission. Just Protected helps athletes, creators, and artists trademark their identity and fight back — filed in 24 hours.",
  },
  alternates: { canonical: "/" },
  title: "Just Protected | Protect Your Name, Voice & Identity from AI",
  description:
    "AI is using your name, face, and voice without permission. Just Protected helps athletes, creators, and artists trademark their identity and fight back — filed in 24 hours.",
}

export default function Home() {
  return (
    <main className="bg-white">
      <NavBar />
      <AffiliateBanner />
      <HeroSection />
      <InstantTrademarkCheck />
      <TrustBanner />
      <ProcessSection />
      <WhyChooseUsSection />
      {/* <ChatGPTIntegrationSection /> */}
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  )
}

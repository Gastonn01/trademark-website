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
import { OG_IMAGE } from "@/lib/seo"

export const metadata: Metadata = {
  openGraph: {
    title: "Just Protected | AI is using your name. Time to fight back.",
    description: "AI is using your name. Licensed attorneys usually file a trademark for that name as a brand within 24 hours. Registration takes months. It is not ownership of your face or voice.",
    url: "/",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Just Protected | AI is using your name. Time to fight back.",
    description: "AI is using your name. Licensed attorneys usually file a trademark for that name as a brand within 24 hours. Registration takes months. It is not ownership of your face or voice.",
    images: [OG_IMAGE.url],
  },
  alternates: { canonical: "/" },
  title: "Just Protected | AI is using your name. Time to fight back.",
  description:
    "AI is using your name. Licensed attorneys usually file a trademark for that name as a brand within 24 hours. Registration takes months. It is not ownership of your face or voice.",
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

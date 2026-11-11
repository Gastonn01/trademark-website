import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { CreatorsLanding } from "@/components/creators-landing"
import type { Metadata } from "next"
import { OG_IMAGE } from "@/lib/seo"

export const metadata: Metadata = {
  openGraph: {
    title: "Trademark Protection for Creators & Influencers | Just Protected",
    description: "File a trademark for your name or handle as a brand. Licensed attorneys usually file within 24 hours. Registration takes months. It does not own your face or voice.",
    url: "/for-creators",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trademark Protection for Creators & Influencers | Just Protected",
    description: "File a trademark for your name or handle as a brand. Licensed attorneys usually file within 24 hours. Registration takes months. It does not own your face or voice.",
    images: [OG_IMAGE.url],
  },
  alternates: { canonical: "/for-creators" },
  title: "Trademark Protection for Creators & Influencers | Just Protected",
  description:
    "File a trademark for your name or handle as a brand. Licensed attorneys usually file within 24 hours. Registration takes months. It does not own your face or voice.",
  keywords: "influencer trademark, creator brand protection, TikTok trademark, YouTube creator trademark, protect my name as an influencer, personal brand trademark, AI deepfake protection creator",
}

export default function ForCreatorsPage() {
  return (
    <main className="bg-white min-h-screen">
      <NavBar />
      <CreatorsLanding />
      <Footer />
    </main>
  )
}

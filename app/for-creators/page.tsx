import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { CreatorsLanding } from "@/components/creators-landing"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trademark Protection for Creators & Influencers | Just Protected",
  description:
    "AI is faking your face, your voice, and your brand. Just Protected helps creators and influencers trademark their name, handle, and personal brand — filed in 24 hours.",
  keywords: "influencer trademark, creator brand protection, TikTok trademark, YouTube creator trademark, protect my name as an influencer, personal brand trademark, AI deepfake protection creator",

  alternates: { canonical: "/for-creators" },

  openGraph: {
    title: "Trademark Protection for Creators & Influencers | Just Protected",
    description: "AI is faking your face, your voice, and your brand. Just Protected helps creators and influencers trademark their name, handle, and personal brand \u2014 filed in 24 hours.",
    url: "/for-creators",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Trademark Protection for Creators & Influencers | Just Protected",
    description: "AI is faking your face, your voice, and your brand. Just Protected helps creators and influencers trademark their name, handle, and personal brand \u2014 filed in 24 hours.",
  },
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

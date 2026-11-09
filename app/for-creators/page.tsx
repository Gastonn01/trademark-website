import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { CreatorsLanding } from "@/components/creators-landing"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trademark Protection for Creators & Influencers | Just Protected",
  description:
    "AI is faking your face, your voice, and your brand. Just Protected helps creators and influencers trademark their name, handle, and personal brand — filed in 24 hours, 70+ countries.",
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

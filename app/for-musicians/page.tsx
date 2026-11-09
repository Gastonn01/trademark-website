import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { MusiciansLanding } from "@/components/musicians-landing"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trademark Protection for Musicians & Artists | Just Protected",
  description:
    "AI is cloning your voice and selling it. Just Protected helps musicians and artists trademark their name, stage name, and brand — filed in 24 hours, 70+ countries.",
  keywords: "musician trademark, artist name trademark, stage name trademark, AI voice cloning protection, band name trademark, protect my artist name, music trademark registration",
}

export default function ForMusiciansPage() {
  return (
    <main className="bg-white min-h-screen">
      <NavBar />
      <MusiciansLanding />
      <Footer />
    </main>
  )
}

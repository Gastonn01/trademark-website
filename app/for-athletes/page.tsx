import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { AthletesLanding } from "@/components/athletes-landing"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NIL Trademark Protection for Athletes | Just Protected",
  description:
    "Protect your Name, Image & Likeness before someone else does. Just Protected helps college and pro athletes trademark their NIL in 70+ countries — filed in 24 hours by licensed attorneys.",
  keywords: "NIL trademark, athlete trademark protection, name image likeness trademark, college athlete NIL, protect my name as an athlete, sports trademark registration",
}

export default function ForAthletesPage() {
  return (
    <main className="bg-white min-h-screen">
      <NavBar />
      <AthletesLanding />
      <Footer />
    </main>
  )
}

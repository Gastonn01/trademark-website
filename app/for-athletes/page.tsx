import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { AthletesLanding } from "@/components/athletes-landing"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NIL Trademark Protection for Athletes | Just Protected",
  description:
    "Protect your Name, Image & Likeness before someone else does. Just Protected helps college and pro athletes trademark their NIL — filed in 24 hours by licensed attorneys.",
  keywords: "NIL trademark, athlete trademark protection, name image likeness trademark, college athlete NIL, protect my name as an athlete, sports trademark registration",

  alternates: { canonical: "/for-athletes" },

  openGraph: {
    title: "NIL Trademark Protection for Athletes | Just Protected",
    description: "Protect your Name, Image & Likeness before someone else does. Just Protected helps college and pro athletes trademark their NIL \u2014 filed in 24 hours by licensed attorneys.",
    url: "/for-athletes",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "NIL Trademark Protection for Athletes | Just Protected",
    description: "Protect your Name, Image & Likeness before someone else does. Just Protected helps college and pro athletes trademark their NIL \u2014 filed in 24 hours by licensed attorneys.",
  },
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

import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { AthletesLanding } from "@/components/athletes-landing"
import type { Metadata } from "next"
import { OG_IMAGE } from "@/lib/seo"

const description =
  "File a trademark for the name you compete under. Licensed attorneys usually file within 24 hours. Registration takes months. NIL and likeness rights are separate."

export const metadata: Metadata = {
  openGraph: {
    title: "NIL Trademark Protection for Athletes | Just Protected",
    description,
    url: "/for-athletes",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "NIL Trademark Protection for Athletes | Just Protected",
    description,
    images: [OG_IMAGE.url],
  },
  alternates: { canonical: "/for-athletes" },
  title: "NIL Trademark Protection for Athletes | Just Protected",
  description,
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

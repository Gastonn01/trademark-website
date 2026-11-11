import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { MusiciansLanding } from "@/components/musicians-landing"
import type { Metadata } from "next"
import { OG_IMAGE } from "@/lib/seo"

export const metadata: Metadata = {
  openGraph: {
    title: "Trademark Protection for Musicians & Artists | Just Protected",
    description: "File a trademark for your artist or stage name. Licensed attorneys usually file within 24 hours. Registration takes months. A cloned voice is a separate right.",
    url: "/for-musicians",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trademark Protection for Musicians & Artists | Just Protected",
    description: "File a trademark for your artist or stage name. Licensed attorneys usually file within 24 hours. Registration takes months. A cloned voice is a separate right.",
    images: [OG_IMAGE.url],
  },
  alternates: { canonical: "/for-musicians" },
  title: "Trademark Protection for Musicians & Artists | Just Protected",
  description:
    "File a trademark for your artist or stage name. Licensed attorneys usually file within 24 hours. Registration takes months. A cloned voice is a separate right.",
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

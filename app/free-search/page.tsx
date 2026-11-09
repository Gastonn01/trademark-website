import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Trademark Name Check | Just Protected",
  description: "Check whether your name or brand is already claimed. Free trademark search with attorney follow-up.",
  alternates: { canonical: "/free-search" },
  openGraph: {
    title: "Free Trademark Name Check | Just Protected",
    description: "Check whether your name or brand is already claimed. Free trademark search with attorney follow-up.",
    url: "/free-search",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Trademark Name Check | Just Protected",
    description: "Check whether your name or brand is already claimed. Free trademark search with attorney follow-up.",
  },
}

import { NavBar } from "@/components/nav-bar"
import { FreeSearchForm } from "@/components/free-search-form"
import { Footer } from "@/components/footer"

export default function FreeSearchPage() {
  return (
    <main className="bg-[#F7F5F1] min-h-screen">
      <NavBar />
      <FreeSearchForm />
      <Footer />
    </main>
  )
}

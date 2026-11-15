import type { Metadata } from "next"
import { NavBar } from "@/components/nav-bar"
import { FreeSearchForm } from "@/components/free-search-form"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Free Trademark Name Check | Just Protected",
  description: "Check whether your name or brand is already claimed. Free trademark search with attorney follow-up.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/free-search" },
}

export default function FreeSearchDetailsPage() {
  return (
    <main className="bg-[#F7F5F1] min-h-screen">
      <NavBar />
      <FreeSearchForm />
      <Footer />
    </main>
  )
}

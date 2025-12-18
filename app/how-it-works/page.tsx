import { NavBar } from "@/components/nav-bar"
import { HowItWorksContent } from "@/components/how-it-works-content"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How It Works | Just Protected",
  description:
    "Learn how Just Protected simplifies global trademark registration in 4 easy steps. Get a free search and expert legal support.",
}

export default function HowItWorksPage() {
  return (
    <main className="bg-white min-h-screen">
      <NavBar />
      <HowItWorksContent />
      <Footer />
    </main>
  )
}

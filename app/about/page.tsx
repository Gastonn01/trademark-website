import { NavBar } from "../../components/nav-bar"
import { AboutContent } from "../../components/about-content"
import { Footer } from "../../components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Just Protected | Leading Trademark Registration Services",
  description:
    "Learn about Just Protected, a leader in online trademark registration. Our expert team combines legal expertise with cutting-edge technology to protect your brand globally.",
}

export default function AboutPage() {
  return (
    <main className="bg-gradient-to-b from-blue-50 to-white min-h-screen pt-24">
      <NavBar />
      <AboutContent />
      <Footer />
    </main>
  )
}


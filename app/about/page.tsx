import { NavBar } from "../../components/nav-bar"
import { AboutContent } from "../../components/about-content"
import { Footer } from "../../components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  openGraph: {
    title: "About Just Protected | Leading Trademark Registration Services",
    description: "Learn about Just Protected, a leader in online trademark registration. Our expert team combines legal expertise with cutting-edge technology to protect your brand globally.",
    url: "/about",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Just Protected | Leading Trademark Registration Services",
    description: "Learn about Just Protected, a leader in online trademark registration. Our expert team combines legal expertise with cutting-edge technology to protect your brand globally.",
  },
  alternates: { canonical: "/about" },
  title: "About Just Protected | Leading Trademark Registration Services",
  description:
    "Learn about Just Protected, a leader in online trademark registration. Our expert team combines legal expertise with cutting-edge technology to protect your brand globally.",
}

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      <NavBar />
      <AboutContent />
      <Footer />
    </main>
  )
}

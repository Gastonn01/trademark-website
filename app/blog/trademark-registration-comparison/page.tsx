import type { Metadata } from "next"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { TrademarkRegistrationComparison } from "@/components/trademark-registration-comparison"

export const metadata: Metadata = {
  openGraph: {
    title: "Trademark Registration Comparison by Country | Global Guide 2026",
    description: "Compare trademark registration processes, costs, and timelines across major global markets. Essential guide for businesses with international vision.",
    url: "/blog/trademark-registration-comparison",
    siteName: "Just Protected",
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trademark Registration Comparison by Country | Global Guide 2026",
    description: "Compare trademark registration processes, costs, and timelines across major global markets. Essential guide for businesses with international vision.",
  },
  title: "Trademark Registration Comparison by Country | Global Guide 2026",
  description:
    "Compare trademark registration processes, costs, and timelines across major global markets. Essential guide for businesses with international vision.",
  keywords:
    "trademark registration, international comparison, global intellectual property, trademark registration costs, trademark registration timelines",
  alternates: {
    canonical: "/blog/trademark-registration-comparison",
  },
}

export default function TrademarkRegistrationComparisonPage() {
  return (
    <main className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      <NavBar />
      <TrademarkRegistrationComparison />
      <Footer />
    </main>
  )
}

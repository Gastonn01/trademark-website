import type { Metadata } from "next"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { TrademarkClassificationGuide } from "@/components/trademark-classification-guide"

export const metadata: Metadata = {
  openGraph: {
    title: "Complete Guide to Trademark Classification | Nice System Explained",
    description: "Explore our detailed guide on the Nice Classification system for trademarks. Learn how to correctly categorize your goods or services for successful trademark registration.",
    url: "/blog/trademark-classification",
    siteName: "Just Protected",
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete Guide to Trademark Classification | Nice System Explained",
    description: "Explore our detailed guide on the Nice Classification system for trademarks. Learn how to correctly categorize your goods or services for successful trademark registration.",
  },
  title: "Complete Guide to Trademark Classification | Nice System Explained",
  description:
    "Explore our detailed guide on the Nice Classification system for trademarks. Learn how to correctly categorize your goods or services for successful trademark registration.",
  keywords: "trademark classification, Nice system, trademark registration, trademark classes, intellectual property",
  alternates: {
    canonical: "/blog/trademark-classification",
  },
}

export default function TrademarkClassificationPage() {
  return (
    <main className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <NavBar />
      <TrademarkClassificationGuide />
      <Footer />
    </main>
  )
}

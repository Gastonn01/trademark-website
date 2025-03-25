import type { Metadata } from "next"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { TrademarkClassificationGuide } from "@/components/trademark-classification-guide"

export const metadata: Metadata = {
  title: "Complete Guide to Trademark Classification | Nice System Explained",
  description:
    "Explore our detailed guide on the Nice Classification system for trademarks. Learn how to correctly categorize your goods or services for successful trademark registration.",
  keywords: "trademark classification, Nice system, trademark registration, trademark classes, intellectual property",
  alternates: {
    canonical: "https://justprotected.com/blog/trademark-classification/",
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


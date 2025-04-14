import JiffyBagGenericizedTrademarkClientPage from "./JiffyBagGenericizedTrademarkClientPage"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "When Brands Become Generic: The Case of Jiffy Bag | Trademark Protection",
  description:
    "Explore how 'Jiffy Bag' became a genericized trademark for padded envelopes, especially in British English, and what this means for trademark protection.",
  alternates: {
    canonical: "https://justprotected.com/blog/jiffy-bag-genericized-trademark/",
  },
  openGraph: {
    title: "When Brands Become Generic: The Case of Jiffy Bag | Trademark Protection",
    description:
      "Explore how 'Jiffy Bag' became a genericized trademark for padded envelopes, especially in British English, and what this means for trademark protection.",
    url: "https://justprotected.com/blog/jiffy-bag-genericized-trademark/",
    siteName: "Just Protected",
    locale: "en_US",
    type: "article",
    publishedTime: "2025-04-08T00:00:00.000Z",
  },
  twitter: {
    card: "summary_large_image",
    title: "When Brands Become Generic: The Case of Jiffy Bag | Trademark Protection",
    description:
      "Explore how 'Jiffy Bag' became a genericized trademark for padded envelopes, especially in British English, and what this means for trademark protection.",
  },
}

export default function JiffyBagGenericizedTrademarkPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <JiffyBagGenericizedTrademarkClientPage />
      <Footer />
    </main>
  )
}

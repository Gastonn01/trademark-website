import type { Metadata } from "next"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import RegisterTrademarkFranceClientPage from "./RegisterTrademarkFranceClientPage"

export const metadata: Metadata = {
  title: "How to Register a Trademark in France (2025) | Complete Guide",
  description:
    "Learn how to register a trademark in France with our comprehensive guide. Understand the INPI process, costs, timeline, and requirements for protecting your brand in the French market.",
  alternates: {
    canonical: "https://justprotected.com/blog/register-trademark-france/",
  },
  openGraph: {
    title: "How to Register a Trademark in France (2025) | Complete Guide",
    description:
      "Learn how to register a trademark in France with our comprehensive guide. Understand the INPI process, costs, timeline, and requirements for protecting your brand in the French market.",
    url: "https://justprotected.com/blog/register-trademark-france/",
    type: "article",
    publishedTime: "2025-04-05T00:00:00.000Z",
    authors: ["Just Protected Team"],
  },
}

export default function RegisterTrademarkFrancePage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <RegisterTrademarkFranceClientPage />
      <Footer />
    </main>
  )
}

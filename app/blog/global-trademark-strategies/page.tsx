import type { Metadata } from "next"
import GlobalTrademarkStrategiesClientPage from "./GlobalTrademarkStrategiesClientPage"

export const metadata: Metadata = {
  openGraph: {
    title: "Global Trademark Strategies | Just Protected",
    description: "Learn about effective global trademark strategies for international brand protection and expansion.",
    url: "/blog/global-trademark-strategies",
    siteName: "Just Protected",
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Trademark Strategies | Just Protected",
    description: "Learn about effective global trademark strategies for international brand protection and expansion.",
  },
  alternates: { canonical: "/blog/global-trademark-strategies" },
  title: "Global Trademark Strategies | Just Protected",
  description: "Learn about effective global trademark strategies for international brand protection and expansion.",
}

export default function GlobalTrademarkStrategiesPage() {
  return <GlobalTrademarkStrategiesClientPage />
}

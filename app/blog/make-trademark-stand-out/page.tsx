import type { Metadata } from "next"
import MakeTrademarkStandOutClientPage from "./MakeTrademarkStandOutClientPage"

export const metadata: Metadata = {
  title: "Make Your Trademark Stand Out | Just Protected",
  description:
    "Learn how to create a distinctive trademark that stands out in the marketplace and increases your chances of successful registration.",

  alternates: { canonical: "/blog/make-trademark-stand-out" },

  openGraph: {
    title: "Make Your Trademark Stand Out | Just Protected",
    description: "Learn how to create a distinctive trademark that stands out in the marketplace and increases your chances of successful registration.",
    url: "/blog/make-trademark-stand-out",
    siteName: "Just Protected",
    locale: "en_US",
    type: "article",
  },

  twitter: {
    card: "summary_large_image",
    title: "Make Your Trademark Stand Out | Just Protected",
    description: "Learn how to create a distinctive trademark that stands out in the marketplace and increases your chances of successful registration.",
  },
}

export default function MakeTrademarkStandOutPage() {
  return <MakeTrademarkStandOutClientPage />
}

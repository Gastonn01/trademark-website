import type { Metadata } from "next"
import TrademarkRegistrationProcessClientPage from "./TrademarkRegistrationProcessClientPage"

export const metadata: Metadata = {
  openGraph: {
    title: "Trademark Registration Process | Just Protected",
    description: "Learn about the trademark registration process, from search to registration, and how to protect your brand effectively.",
    url: "/blog/trademark-registration-process",
    siteName: "Just Protected",
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trademark Registration Process | Just Protected",
    description: "Learn about the trademark registration process, from search to registration, and how to protect your brand effectively.",
  },
  alternates: { canonical: "/blog/trademark-registration-process" },
  title: "Trademark Registration Process | Just Protected",
  description:
    "Learn about the trademark registration process, from search to registration, and how to protect your brand effectively.",
}

export default function TrademarkRegistrationProcess() {
  return <TrademarkRegistrationProcessClientPage />
}

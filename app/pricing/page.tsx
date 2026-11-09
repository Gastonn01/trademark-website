import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trademark Pricing | Just Protected",
  description: "Trademark filing prices. This address forwards to the detailed price list.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Trademark Pricing | Just Protected",
    description: "Trademark filing prices. This address forwards to the detailed price list.",
    url: "/pricing",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trademark Pricing | Just Protected",
    description: "Trademark filing prices. This address forwards to the detailed price list.",
  },
  robots: { index: false, follow: false },
}

import { redirect } from "next/navigation"

export default function PricingPage() {
  redirect("/detailed-pricelist")
}

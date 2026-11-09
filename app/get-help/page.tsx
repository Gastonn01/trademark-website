import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Get Trademark Help | Just Protected",
  description: "Get help from licensed trademark attorneys on filing, monitoring, and brand protection.",
  alternates: { canonical: "/get-help" },
  openGraph: {
    title: "Get Trademark Help | Just Protected",
    description: "Get help from licensed trademark attorneys on filing, monitoring, and brand protection.",
    url: "/get-help",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Trademark Help | Just Protected",
    description: "Get help from licensed trademark attorneys on filing, monitoring, and brand protection.",
  },
}

import { NavBar } from "@/components/nav-bar"
import { GetHelpContent } from "@/components/get-help-content"

export default function GetHelpPage() {
  return (
    <main>
      <NavBar />
      <GetHelpContent />
    </main>
  )
}

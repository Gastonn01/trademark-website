import { NavBar } from "@/components/nav-bar"
import { GetHelpContent } from "@/components/get-help-content"

import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Get Help | Just Protected",
  description: "Contact Just Protected and tell us how we can assist you with trademark protection.",
  path: "/get-help",
})

export default function GetHelpPage() {
  return (
    <main>
      <NavBar />
      <GetHelpContent />
    </main>
  )
}

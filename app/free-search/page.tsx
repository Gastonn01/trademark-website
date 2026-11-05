import { NavBar } from "@/components/nav-bar"
import { FreeSearchForm } from "@/components/free-search-form"
import { Footer } from "@/components/footer"
import { Suspense } from "react"

import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Free Trademark Search | Just Protected",
  description: "Check whether your name or brand is already claimed. Free trademark search with no credit card required.",
  path: "/free-search",
})

export default function FreeSearchPage() {
  return (
    <main className="bg-[#F7F5F1] min-h-screen">
      <NavBar />
      <Suspense fallback={<div className="max-w-6xl mx-auto px-4 pt-24 pb-12 text-center">Loading search form...</div>}>
        <FreeSearchForm />
      </Suspense>
      <Footer />
    </main>
  )
}

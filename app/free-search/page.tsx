import { NavBar } from "@/components/nav-bar"
import { FreeSearchForm } from "@/components/free-search-form"
import { Footer } from "@/components/footer"
import { Suspense } from "react"

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

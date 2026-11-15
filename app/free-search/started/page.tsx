import type { Metadata } from "next"
import { Suspense } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { NameCheckStart } from "@/components/name-check-start"

export const metadata: Metadata = {
  title: "Free Trademark Name Check | Just Protected",
  description: "Check whether your name or brand is already claimed. Free trademark search with attorney follow-up.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/free-search" },
}

export default function FreeSearchStartedPage() {
  return (
    <main className="bg-[#F7F5F1] min-h-screen">
      <NavBar />
      <Suspense
        fallback={
          <section className="container mx-auto px-4 py-10 max-w-xl">
            <h1 className="font-serif text-4xl text-primary">Free name check</h1>
          </section>
        }
      >
        <NameCheckStart />
      </Suspense>
      <Footer />
    </main>
  )
}

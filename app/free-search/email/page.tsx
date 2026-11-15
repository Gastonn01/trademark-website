import type { Metadata } from "next"
import { Suspense } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { NameCheckEmailForm } from "@/components/name-check-email-form"

export const metadata: Metadata = {
  title: "Email for your name check | Just Protected",
  description: "Add an email so Just Protected can send the name-check result.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/free-search/email" },
}

export default function NameCheckEmailPage() {
  return (
    <main className="bg-[#F7F5F1] min-h-screen">
      <NavBar />
      <Suspense
        fallback={
          <section className="container mx-auto px-4 py-10 max-w-xl">
            <h1 className="font-serif text-4xl text-primary">Where should we send the result?</h1>
          </section>
        }
      >
        <NameCheckEmailForm />
      </Suspense>
      <Footer />
    </main>
  )
}

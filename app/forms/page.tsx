import { Suspense } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { RegistrationInfoForm } from "./components/RegistrationInfoForm"

import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Trademark Registration Information | Just Protected",
  description: "Provide the information and documents required for your trademark registration.",
  path: "/forms",
  noindex: true,
})

export default async function FormsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  // Get token from URL if available
  const token = typeof params.token === "string" ? params.token : undefined

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Trademark Registration Information</h1>
            <p className="text-gray-600 mb-8">
              Please provide the required information and documents for your trademark registration.
            </p>

            <Suspense fallback={<p className="text-gray-600">Loading the registration form…</p>}>
              <RegistrationInfoForm token={token} />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

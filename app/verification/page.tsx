import { VerificationContent } from "@/components/verification-content"
import { WorldwideProtection } from "@/components/worldwide-protection"
import { ComparisonTable } from "@/components/comparison-table"
import type { Metadata } from "next"

export const metadata: Metadata = {
  openGraph: {
    title: "Trademark Verification and Registration | Just Protected",
    description: "Verify and register your trademark globally with our comprehensive protection services.",
    url: "/verification",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trademark Verification and Registration | Just Protected",
    description: "Verify and register your trademark globally with our comprehensive protection services.",
  },
  alternates: { canonical: "/verification" },
  title: "Trademark Verification and Registration | Just Protected",
  description: "Verify and register your trademark globally with our comprehensive protection services.",
}

export default function VerificationPage({
  searchParams,
}: {
  searchParams: { search_id?: string }
}) {
  return (
    <main className="flex flex-col min-h-screen">
      <VerificationContent searchId={searchParams.search_id} />
      <WorldwideProtection />
      <ComparisonTable />
    </main>
  )
}

import { JsonLd } from "@/components/json-ld"
import { serviceJsonLd } from "@/lib/seo"
import { VerificationContent } from "@/components/verification-content"
import { WorldwideProtection } from "@/components/worldwide-protection"
import { ComparisonTable } from "@/components/comparison-table"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trademark Verification and Registration | Just Protected",
  description: "Verify and register your trademark globally with our comprehensive protection services.",

  alternates: { canonical: "/verification" },

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
}

export default function VerificationPage({
  searchParams,
}: {
  searchParams: { search_id?: string }
}) {
  return (
    <main className="flex flex-col min-h-screen">
      <JsonLd
        data={serviceJsonLd({
          name: "Trademark Verification and Registration",
          description: "Verify and register your trademark globally with our comprehensive protection services.",
          path: "/verification",
        })}
      />
      <VerificationContent searchId={searchParams.search_id} />
      <WorldwideProtection />
      <ComparisonTable />
    </main>
  )
}

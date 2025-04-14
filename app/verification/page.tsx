import { VerificationContent } from "@/components/verification-content"
import { WorldwideProtection } from "@/components/worldwide-protection"
import { ComparisonTable } from "@/components/comparison-table"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trademark Verification and Registration | Just Protected",
  description: "Verify and register your trademark globally with our comprehensive protection services.",
}

export default function VerificationPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <VerificationContent />
      <WorldwideProtection />
      <ComparisonTable />
    </main>
  )
}

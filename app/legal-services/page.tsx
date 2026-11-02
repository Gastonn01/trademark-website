import { NavBar } from "@/components/nav-bar"
import { LegalServicesContent } from "@/components/legal-services-content"
import { Footer } from "@/components/footer"

import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { pageMetadata, serviceJsonLd } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Legal Services | Just Protected",
  description: "Protection, enforcement and support for your trademark worldwide, after registration and when a dispute comes up.",
  path: "/legal-services",
})

export default function LegalServicesPage() {
  return (
    <main className="bg-gradient-to-b from-indigo-50 to-white">
      <JsonLd
        data={serviceJsonLd({
          name: "Legal Services",
          description:
            "Protection, enforcement and support for your trademark worldwide — enforcing your rights, responding to challenges, or navigating legal requirements in specific countries.",
          path: "/legal-services",
        })}
      />
      <NavBar />
      <LegalServicesContent />
      <Footer />
    </main>
  )
}

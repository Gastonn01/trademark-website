import { NavBar } from "@/components/nav-bar"
import { ServicesContent } from "@/components/services-content"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trademark Services | Just Protected",
  description: "Check a brand name, register a trademark, or get help with an existing brand. Find the right trademark service and guidance for your business.",
  alternates: { canonical: "/services" },
}

export default function ServicesPage() {
  return (
    <main>
      <NavBar />
      <ServicesContent />
      <Footer />
    </main>
  )
}

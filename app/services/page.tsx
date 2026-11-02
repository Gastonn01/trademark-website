import { NavBar } from "@/components/nav-bar"
import { ServicesContent } from "@/components/services-content"

import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { pageMetadata, serviceJsonLd } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Services | Just Protected",
  description: "Business consulting, compliance and risk management, digital transformation, market research, global expansion, and cybersecurity.",
  path: "/services",
})

export default function ServicesPage() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: [
            ["Business Consulting", "We help businesses of all sizes achieve their goals through strategic planning, process improvement, and operational excellence."],
            ["Compliance & Risk Management", "We help businesses mitigate risk and ensure compliance with relevant regulations and standards."],
            ["Digital Transformation", "We help businesses leverage technology to improve efficiency, productivity, and customer experience."],
            ["Market Research & Analysis", "We help businesses understand their target market, identify opportunities, and make data-driven decisions."],
            ["Global Expansion", "We help businesses expand their operations into new markets and regions."],
            ["Cybersecurity", "We help businesses protect their data and systems from cyber threats."],
          ].map(([name, description], index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: serviceJsonLd({ name, description, path: "/services" }),
          })),
        }}
      />
      <NavBar />
      <ServicesContent />
    </main>
  )
}

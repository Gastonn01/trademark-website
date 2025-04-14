import type { Metadata } from "next"
import { USPTODetroitSatelliteOfficeClientPage } from "./USPTODetroitSatelliteOfficeClientPage"

export const metadata: Metadata = {
  title: "USPTO's Historic Expansion: The Opening of Detroit's Satellite Office | Trademark Expert",
  description:
    "Learn about the USPTO's first satellite office in Detroit, opened in 2012, and how it has impacted patent and trademark services across the United States.",
  keywords:
    "USPTO, Detroit satellite office, Elijah J. McCoy, patent office, trademark office, intellectual property, USPTO expansion",
  openGraph: {
    title: "USPTO's Historic Expansion: The Opening of Detroit's Satellite Office",
    description:
      "Learn about the USPTO's first satellite office in Detroit, opened in 2012, and how it has impacted patent and trademark services across the United States.",
    type: "article",
    url: "https://yourdomain.com/blog/uspto-detroit-satellite-office",
  },
}

export default function USPTODetroitSatelliteOfficePage() {
  return <USPTODetroitSatelliteOfficeClientPage />
}

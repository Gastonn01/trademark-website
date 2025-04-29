import type { Metadata } from "next"
import { MeghanMarkleAsEverTrademarkChallengesClientPage } from "./MeghanMarkleAsEverTrademarkChallengesClientPage"

export const metadata: Metadata = {
  title: 'Celebrity Trademark Troubles: Lessons from Meghan Markle\'s "As Ever" Brand Challenges',
  description:
    'Explore the trademark disputes and operational challenges faced by Meghan Markle\'s "As Ever" lifestyle brand, and the valuable lessons for business owners.',
  openGraph: {
    title: 'Celebrity Trademark Troubles: Lessons from Meghan Markle\'s "As Ever" Brand Challenges',
    description:
      'Explore the trademark disputes and operational challenges faced by Meghan Markle\'s "As Ever" lifestyle brand, and the valuable lessons for business owners.',
    type: "article",
    publishedTime: "2025-04-09T00:00:00Z",
    authors: ["Trademark Legal Team"],
    images: [
      {
        url: "/images/meghan-markle-as-ever-trademark.png",
        width: 1200,
        height: 630,
        alt: "Meghan Markle wearing a rust-colored outfit, discussing her 'As Ever' brand",
      },
    ],
  },
}

export default function MeghanMarkleAsEverTrademarkChallengesPage() {
  return <MeghanMarkleAsEverTrademarkChallengesClientPage />
}

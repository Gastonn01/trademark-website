import type { Metadata } from "next"
import RegisteredTrademarkSymbolHistoryClientPage from "./RegisteredTrademarkSymbolHistoryClientPage"

export const metadata: Metadata = {
  title: "The Origin of the ® Symbol: How the Lanham Act of 1946 Shaped Trademark History",
  description:
    "Discover the history of the registered trademark symbol (®) and its connection to the Trademark Act of 1946, also known as the Lanham Act.",
  openGraph: {
    title: "The Origin of the ® Symbol: How the Lanham Act of 1946 Shaped Trademark History",
    description:
      "Discover the history of the registered trademark symbol (®) and its connection to the Trademark Act of 1946, also known as the Lanham Act.",
    type: "article",
    url: "https://your-domain.com/blog/registered-trademark-symbol-history",
    images: [
      {
        url: "https://your-domain.com/images/registered-trademark-symbol.jpg",
        width: 1200,
        height: 630,
        alt: "Registered Trademark Symbol History",
      },
    ],
  },
}

export default function RegisteredTrademarkSymbolHistoryPage() {
  return <RegisteredTrademarkSymbolHistoryClientPage />
}

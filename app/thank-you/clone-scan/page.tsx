import type { Metadata } from "next"
import { CloneScanThankYou } from "./clone-scan-thank-you"

export const metadata: Metadata = {
  title: "Clone scan requested | Just Protected",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you/clone-scan" },
}

export default function CloneScanThankYouPage() {
  return <CloneScanThankYou />
}

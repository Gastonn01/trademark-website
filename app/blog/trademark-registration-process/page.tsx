import type { Metadata } from "next"
import TrademarkRegistrationProcessClientPage from "./TrademarkRegistrationProcessClientPage"

export const metadata: Metadata = {
  title: "Trademark Registration Process | Just Protected",
  description:
    "Learn about the trademark registration process, from search to registration, and how to protect your brand effectively.",
}

export default function TrademarkRegistrationProcess() {
  return <TrademarkRegistrationProcessClientPage />
}

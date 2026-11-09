import type { Metadata } from "next"
import MaximiseSuccessfulTrademarkRegistrationClientPage from "./MaximiseSuccessfulTrademarkRegistrationClientPage"

export const metadata: Metadata = {
  openGraph: {
    title: "Maximise Successful Trademark Registration | Just Protected",
    description: "Learn how to maximise your chances of successful trademark registration with these expert tips and strategies.",
    url: "/blog/maximise-successful-trademark-registration",
    siteName: "Just Protected",
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maximise Successful Trademark Registration | Just Protected",
    description: "Learn how to maximise your chances of successful trademark registration with these expert tips and strategies.",
  },
  alternates: { canonical: "/blog/maximise-successful-trademark-registration" },
  title: "Maximise Successful Trademark Registration | Just Protected",
  description:
    "Learn how to maximise your chances of successful trademark registration with these expert tips and strategies.",
}

export default function MaximiseSuccessfulTrademarkRegistrationPage() {
  return <MaximiseSuccessfulTrademarkRegistrationClientPage />
}

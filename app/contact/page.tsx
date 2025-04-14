import type { Metadata } from "next"
import { NavBar } from "@/components/nav-bar"
import { ContactContent } from "@/components/contact-content"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Contact Us | Just Protected",
  description:
    "Contact Just Protected for expert trademark registration services. Get in touch with our team for a free consultation.",
}

export default function ContactPage() {
  return (
    <main className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <NavBar />
      <ContactContent />
      <Footer />
    </main>
  )
}

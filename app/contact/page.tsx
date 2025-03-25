import { NavBar } from "@/components/nav-bar"
import { ContactContent } from "@/components/contact-content"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <main className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <NavBar />
      <ContactContent />
      <Footer />
    </main>
  )
}


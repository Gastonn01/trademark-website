import { NavBar } from "@/components/nav-bar"
import { PrivacyPolicy } from "@/components/privacy-policy"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <NavBar />
      <PrivacyPolicy />
      <Footer />
    </main>
  )
}

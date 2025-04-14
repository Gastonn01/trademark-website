import { NavBar } from "@/components/nav-bar"
import { CookiePolicy } from "@/components/cookie-policy"
import { Footer } from "@/components/footer"

export default function CookiePolicyPage() {
  return (
    <main className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <NavBar />
      <CookiePolicy />
      <Footer />
    </main>
  )
}

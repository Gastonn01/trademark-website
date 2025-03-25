import { NavBar } from "@/components/nav-bar"
import { FreeSearchForm } from "@/components/free-search-form"
import { Footer } from "@/components/footer"

export default function FreeSearchPage() {
  return (
    <main className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <NavBar />
      <FreeSearchForm />
      <Footer />
    </main>
  )
}


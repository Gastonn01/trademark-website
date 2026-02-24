import { GraciasContactoContent } from "@/components/gracias-contacto-content"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

export default function GraciasContactoPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar />
      <main>
        <GraciasContactoContent />
      </main>
      <Footer />
    </div>
  )
}

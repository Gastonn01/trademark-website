import type { Metadata } from "next"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { CalendlyWidget } from "@/components/calendly-widget"

export const metadata: Metadata = {
  title: "Book a Call | Just Protected",
  description: "Talk to a specialist about protecting your brand — free 30-minute consultation, no obligation.",
}

export default function BookACallPage() {
  return (
    <main className="bg-white min-h-screen">
      <NavBar />

      <section className="bg-primary text-white py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-4">Free consultation</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            Talk to a specialist about protecting your brand
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            30 minutes, no cost, no obligation. Bring your situation — we'll tell you exactly where you stand and
            what to do next.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <CalendlyWidget />
        </div>
      </section>

      <Footer />
    </main>
  )
}

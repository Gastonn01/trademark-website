import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

export function FunnelThankYou({
  kicker,
  title,
  body,
  homeLabel = "Back to Just Protected",
}: {
  kicker: string
  title: string
  body: string
  homeLabel?: string
}) {
  return (
    <main className="bg-[#F7F5F1] min-h-screen">
      <NavBar />
      <section className="container mx-auto px-4 py-16 md:py-24 max-w-2xl text-center">
        <p className="label-caps text-accent mb-4">{kicker}</p>
        <h1 className="font-serif text-4xl md:text-5xl text-primary tracking-tight mb-5">{title}</h1>
        <p className="text-gray-600 leading-relaxed mb-8">{body}</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-primary bg-accent hover:brightness-105 rounded-full"
        >
          {homeLabel}
        </Link>
      </section>
      <Footer />
    </main>
  )
}

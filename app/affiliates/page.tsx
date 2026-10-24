import type { Metadata } from "next"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { AffiliateSignupForm } from "@/components/affiliate-signup-form"

export const metadata: Metadata = {
  title: "Affiliate Program for Creators | Just Protected",
  description: "Earn commission recommending Just Protected's trademark registration and brand protection service to your audience.",
}

export default function AffiliatesPage() {
  return (
    <main className="bg-white min-h-screen">
      <NavBar />

      <section className="bg-primary text-white py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-4">For creators</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            Earn commission recommending Just Protected
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            If your content covers business, e-commerce, or personal branding, your audience probably needs this.
            We give you your own code and you earn 20% on every registration made with it.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-bold text-primary mb-4">How it works</h2>
            <ul className="space-y-4 text-gray-700 leading-relaxed">
              <li>
                <strong>1. You sign up</strong> — fill out the form, we'll reach out with your unique code.
              </li>
              <li>
                <strong>2. You share it</strong> — whenever it fits your content, no required posts or fixed
                schedule.
              </li>
              <li>
                <strong>3. You get paid</strong> — 20% on every trademark registration made with your code, no cap.
              </li>
            </ul>
            <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/10">
              <p className="text-sm text-gray-700 leading-relaxed">
                You don't need a huge following — this tends to work better with small, specific audiences
                (e-commerce, personal branding, business) than with big generic ones.
              </p>
            </div>
          </div>
          <AffiliateSignupForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}

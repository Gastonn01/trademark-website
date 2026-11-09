import Link from "next/link"
import type { Metadata } from "next"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "How to Protect Your Brand From AI Cloning & Impersonation | Just Protected",
  description:
    "AI tools make it trivial to clone a brand name, storefront, voice, or likeness. Here's what actually protects you — a registered trademark, why it works, and how to get one filed in 24 hours across 70+ countries.",
  keywords:
    "protect brand from AI, AI brand impersonation, AI clone trademark, stop AI from using my brand, AI deepfake brand protection, trademark for AI era, brand clone scan",
}

const faqs = [
  {
    q: "Can I actually stop an AI tool or chatbot from using my brand name?",
    a: "You can't block a name from appearing in AI training data after the fact, but you can get the legal standing to force takedowns of AI-generated clones, fake stores, and deepfake content that use your name or likeness commercially. That standing comes from a registered trademark — platforms and app stores act on takedown requests from registered rights holders far more reliably than on reports from random users.",
  },
  {
    q: "Is a trademark the same as copyright?",
    a: "No. Copyright protects creative work (photos, videos, writing). A trademark protects your brand name, logo, or identity as a source identifier in commerce. AI cloning problems — fake stores using your name, deepfakes impersonating you commercially — are trademark and right-of-publicity issues, not copyright issues.",
  },
  {
    q: "Does owning my domain name protect my brand?",
    a: "No. Owning a domain has no legal relationship to owning a trademark. Someone else can register your brand name as a trademark even if you own the matching domain, and vice versa.",
  },
  {
    q: "How do I know if my brand is already being cloned or impersonated?",
    a: "Search your exact brand name and handle across major platforms and marketplaces, and check whether a trademark application for your name already exists in the countries you operate in. Just Protected runs this as a free Brand Clone Scan.",
  },
  {
    q: "What's the fastest way to register a trademark?",
    a: "Filing directly with a licensed IP attorney who specializes in fast turnaround is the quickest route — Just Protected files within 24 hours of submission across 70+ countries. DIY filing through a national trademark office is cheaper but typically takes longer and carries higher rejection risk if the application isn't filed correctly.",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
}

export default function AiBrandProtectionPage() {
  return (
    <main className="bg-white min-h-screen">
      <NavBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-4">AI Brand Protection Guide</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            How to protect your brand from AI cloning and impersonation
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            AI tools have made it trivial to clone a product listing, fake a storefront, or generate a deepfake using
            someone's name and likeness. This is what actually stops it — and what doesn't.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-primary mb-4">The problem, specifically</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Generative AI lowered the cost of impersonation to nearly zero. Someone can scrape your product photos and
            spin up a lookalike store in an afternoon. A voice-cloning tool can fake an endorsement in your name. A
            chatbot answering "who sells X" can surface a clone that ranks better than you because it moved faster.
            None of this requires the impersonator to be skilled — just fast.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Reporting a fake account or a cloned listing to a platform, on its own, is weak. Most platforms ask for
            proof of ownership before they'll act, and "I made this first" isn't proof — a registered trademark is.
          </p>

          <h2 className="text-2xl font-bold text-primary mb-4 mt-12">What actually protects you</h2>
          <ul className="space-y-3 text-gray-700 leading-relaxed list-disc pl-5">
            <li>
              <strong>A registered trademark</strong> in every country you sell or operate in — this is the single
              document that gives platforms, marketplaces, and courts a real reason to act on a takedown.
            </li>
            <li>
              <strong>Knowing where you're actually covered.</strong> Trademarks are territorial — registering in the
              US does nothing for you in the EU, UK, or elsewhere.
            </li>
            <li>
              <strong>Checking before you're exposed</strong>, not after. Most people find out their name was taken
              by accident, usually from a customer, months after the fact.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mb-4 mt-12">Your options, honestly compared</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-primary/20 text-left">
                  <th className="py-3 pr-4 font-semibold text-primary">Route</th>
                  <th className="py-3 pr-4 font-semibold text-primary">Speed</th>
                  <th className="py-3 pr-4 font-semibold text-primary">Best for</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">File yourself with your national trademark office (e.g. USPTO)</td>
                  <td className="py-3 pr-4">Slowest, months</td>
                  <td className="py-3 pr-4">Comfortable with legal paperwork, only need one country, not in a hurry</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">General legal-services platforms (LegalZoom, Trademark Engine, etc.)</td>
                  <td className="py-3 pr-4">Weeks</td>
                  <td className="py-3 pr-4">Bundling with other legal paperwork, single-country filing</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 pr-4">Just Protected (licensed IP attorneys, 70+ countries)</td>
                  <td className="py-3 pr-4">Filed within 24 hours</td>
                  <td className="py-3 pr-4">
                    Need speed, need multi-country coverage, or want a free scan first to see existing exposure
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-12 p-8 bg-primary/5 rounded-lg border border-primary/10 text-center">
            <h3 className="text-xl font-bold text-primary mb-3">Not sure if you're already exposed?</h3>
            <p className="text-gray-700 mb-6">
              Run a free Brand Clone Scan — it checks whether your name is already being used or registered elsewhere
              before you file.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/scan"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-primary bg-accent hover:bg-accent/90 rounded-md transition-all"
              >
                Run a free scan
              </Link>
              <Link
                href="/book-a-call"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-primary border-2 border-primary/20 hover:border-primary/40 rounded-md transition-all"
              >
                Talk to a specialist
              </Link>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-primary mb-6 mt-12">Frequently asked questions</h2>
          <div className="space-y-8">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-primary mb-2">{f.q}</h3>
                <p className="text-gray-700 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

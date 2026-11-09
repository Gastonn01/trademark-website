import Link from "next/link"
import { notFound } from "next/navigation"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { CheckCircle2, ArrowRight, Shield, Clock, Globe2, FileText } from "lucide-react"
import { countryPricingData } from "@/lib/pricing-data"
import {
  countrySlug,
  getAllCountryNames,
  getCountryBySlug,
  relatedCountries,
  regionForCountry,
  timelineForCountry,
} from "@/lib/country-pages"
import type { Metadata } from "next"

export function generateStaticParams() {
  return getAllCountryNames().map((name) => ({ country: countrySlug(name) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>
}): Promise<Metadata> {
  const { country } = await params
  const name = getCountryBySlug(country)
  if (!name) return {}
  const data = countryPricingData[name]
  return {
    title: `Trademark Registration in ${name} (2026): Cost & Process | Just Protected`,
    description: `Register your trademark in ${name} from $${data.prices.USD} USD all-inclusive. Licensed attorneys, filed in 24 hours, monthly installments available. Free trademark search included.`,
    keywords: `trademark registration ${name}, register trademark in ${name}, ${name} trademark cost, how to trademark in ${name}, ${name} brand protection`,
    alternates: {
      canonical: `https://justprotected.com/trademark-registration/${country}`,
    },
  }
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  const name = getCountryBySlug(country)
  if (!name) notFound()

  const data = countryPricingData[name]
  const timeline = timelineForCountry(name)
  const region = regionForCountry(name)
  const related = relatedCountries(name)
  const monthly = Math.round((data.prices.USD * 0.7) / 11)
  const activation = Math.round(data.prices.USD * 0.3)

  const faqs = [
    {
      q: `How much does trademark registration cost in ${name}?`,
      a: `Trademark registration in ${name} costs $${data.prices.USD} USD all-inclusive for one class — covering government fees, local agent fees, and attorney preparation. Additional classes cost $${data.additionalClassPrice} USD each. You can pay upfront or split it into 11 monthly installments of about $${monthly}/month after a $${activation} activation fee.`,
    },
    {
      q: `How long does trademark registration take in ${name}?`,
      a: `The full registration process in ${name} typically takes ${timeline} from filing to certificate. However, your legal protection starts from the filing date — we file within 24 hours of receiving your application, so you're protected almost immediately.`,
    },
    {
      q: `Do I need a local attorney to register a trademark in ${name}?`,
      a: `In most cases, foreign applicants need a local representative or agent in ${name}. That's included in our service — we work with licensed local agents and attorneys in ${name}, so you don't need to find or manage one yourself.`,
    },
    {
      q: `What can I trademark in ${name}?`,
      a: `You can register brand names, personal names, logos, slogans, and in many cases product shapes or sounds — as long as the mark is distinctive and not already registered. Our free search checks existing registrations in ${name} before you spend anything.`,
    },
    {
      q: `Can I extend my ${name} trademark to other countries later?`,
      a: `Yes. Trademarks are territorial — a registration in ${name} only protects you there. You can add more countries at any time, and depending on the country, the Madrid Protocol can streamline international expansion. We handle multi-country strategies routinely.`,
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

  return (
    <main className="bg-white min-h-screen">
      <NavBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://flagcdn.com/${data.flag}.svg`}
                alt={`${name} flag`}
                className="h-8 w-auto rounded shadow"
              />
              <span className="text-accent text-sm font-medium uppercase tracking-wider">{region}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Trademark Registration in {name}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Protect your brand in {name} from ${data.prices.USD} USD all-inclusive. Licensed attorneys, filed within
              24 hours, no hidden fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/free-search"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-primary bg-accent hover:bg-accent/90 rounded-md transition-all duration-300 shadow-lg"
              >
                Start free trademark search
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
              {["Free search included", "Filed in 24 hours", "Local agents included", "Money-back guarantee"].map(
                (item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <span>{item}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING CARD */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            <div className="bg-primary text-white px-8 py-6">
              <h2 className="text-2xl font-bold">Trademark cost in {name}</h2>
              <p className="text-gray-300 text-sm mt-1">All-inclusive — government fees, local agent, and attorney work</p>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="text-4xl font-bold text-primary mb-1">${data.prices.USD}</div>
                  <div className="text-sm text-gray-500">USD — one class, total</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="text-4xl font-bold text-primary mb-1">€{data.prices.EUR}</div>
                  <div className="text-sm text-gray-500">EUR — one class, total</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="text-4xl font-bold text-primary mb-1">£{data.prices.GBP}</div>
                  <div className="text-sm text-gray-500">GBP — one class, total</div>
                </div>
              </div>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Pay monthly:</strong> ${activation} activation fee today, then ~${monthly}/month over 11
                    installments
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Additional classes:</strong> ${data.additionalClassPrice} USD per extra class of goods or
                    services
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Includes:</strong> AI-powered search, attorney review, filing, office action support, and 1
                    year of monitoring
                  </span>
                </div>
              </div>
              <Link
                href="/free-search"
                className="mt-8 w-full inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-primary bg-accent hover:bg-accent/90 rounded-md transition-all shadow-lg"
              >
                Check if your name is available in {name} — free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-primary text-center mb-4">
            How to register a trademark in {name}
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Four steps. We handle the legal work — you stay informed at every stage.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "1. Free search",
                desc: `We check existing trademarks in ${name} to make sure your name is available before you spend anything.`,
              },
              {
                icon: FileText,
                title: "2. Attorney filing",
                desc: `Our attorneys and local agents in ${name} prepare and file your application within 24 hours.`,
              },
              {
                icon: Clock,
                title: "3. Examination",
                desc: `The trademark office in ${name} examines your application. We respond to any objections — included.`,
              },
              {
                icon: Globe2,
                title: "4. Registered",
                desc: `Registration typically completes in ${timeline}. Your protection runs from the filing date.`,
              },
            ].map((step, i) => (
              <div key={i} className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <step.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — server-rendered for SEO */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            Trademark registration in {name}: FAQ
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED COUNTRIES */}
      {related.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-primary text-center mb-8">
              Also registering elsewhere in {region}?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {related.map((rc) => {
                const rcData = countryPricingData[rc]
                return (
                  <Link
                    key={rc}
                    href={`/trademark-registration/${countrySlug(rc)}`}
                    className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-accent/50 hover:shadow-md transition-all"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://flagcdn.com/${rcData.flag}.svg`}
                      alt={`${rc} flag`}
                      className="h-5 w-auto rounded"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{rc}</div>
                      <div className="text-xs text-gray-500">from ${rcData.prices.USD}</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-accent text-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to protect your brand in {name}?</h2>
          <p className="text-gray-300 mb-8">
            Start with a free trademark search — 60 seconds, no credit card, results within 24 hours.
          </p>
          <Link
            href="/free-search"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-900 bg-white hover:bg-gray-100 rounded-md transition-all shadow-lg"
          >
            Start free search
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

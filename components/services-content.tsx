import Link from "next/link"
import { ArrowRight, Search, FileCheck, Shield } from "lucide-react"

const services = [
  { href: "/free-search", icon: Search, label: "Start here", title: "Check your brand", description: "Tell us your name, what you sell or do, and where you need protection. Request a preliminary review and understand what needs checking before you file.", cta: "Request a free review" },
  { href: "/verification", icon: FileCheck, label: "Ready to file?", title: "Register a trademark", description: "Choose your market and proposed filing scope. Review the price and required information before deciding to proceed.", cta: "Start a registration" },
  { href: "/legal-services", icon: Shield, label: "Already have a brand?", title: "Get trademark support", description: "Ask about an objection, a disputed name, suspected misuse, or other trademark questions. The next step depends on the facts and your rights.", cta: "Explore trademark support" },
]
const audiences = [
  { href: "/for-businesses", title: "Businesses & entrepreneurs", description: "Company names, product names, and growing brands." },
  { href: "/for-amazon-sellers", title: "Amazon sellers", description: "Check a product brand before packaging, inventory, and launch." },
  { href: "/for-creators", title: "Creators & influencers", description: "Names, handles, and brands connected to your content." },
  { href: "/for-athletes", title: "Athletes", description: "Athlete brands and the trademark side of commercial identity." },
  { href: "/for-musicians", title: "Musicians & artists", description: "Stage names, band names, and merchandise brands." },
]

export function ServicesContent() {
  return <div className="bg-[#FAF8F4] text-primary">
    <section className="bg-primary text-white px-5 py-20 md:py-28"><div className="max-w-5xl mx-auto">
      <p className="label-caps text-accent mb-6">Trademark services</p>
      <h1 className="font-serif text-5xl md:text-6xl leading-tight max-w-3xl mb-7">One brand.<br /><span className="text-accent italic">A clear next step.</span></h1>
      <p className="text-lg text-white/75 max-w-2xl leading-relaxed">Check a name, register a trademark, or get help with an existing brand. Start with the question you need answered.</p>
    </div></section>
    <section aria-labelledby="services-heading" className="max-w-6xl mx-auto px-5 py-20">
      <h2 id="services-heading" className="font-serif text-4xl mb-10">How can we help?</h2>
      <div className="grid lg:grid-cols-3 gap-6">{services.map(service => <article key={service.href} className="rounded-2xl bg-white border border-primary/10 p-8 flex flex-col">
        <service.icon className="text-accent w-7 h-7 mb-6" aria-hidden="true" />
        <p className="label-caps text-xs text-gray-500 mb-3">{service.label}</p>
        <h3 className="font-serif text-3xl mb-4">{service.title}</h3>
        <p className="text-gray-600 leading-relaxed mb-7 flex-1">{service.description}</p>
        <Link href={service.href} className="font-semibold inline-flex items-center gap-2 underline underline-offset-4">{service.cta}<ArrowRight className="w-4 h-4" /></Link>
      </article>)}</div>
      <p className="text-sm text-gray-600 mt-7">Not sure where to start? <Link href="/book-a-call" className="underline">Book a call</Link> or <Link href="/detailed-pricelist" className="underline">browse prices by country</Link>.</p>
    </section>
    <section aria-labelledby="audiences-heading" className="bg-white px-5 py-20"><div className="max-w-6xl mx-auto">
      <p className="label-caps text-accent mb-4">Your situation</p>
      <h2 id="audiences-heading" className="font-serif text-4xl mb-5">Find guidance for your business.</h2>
      <p className="text-gray-600 max-w-2xl mb-10">These pages explain the same trademark services in the context of what you do.</p>
      <div className="grid md:grid-cols-2 gap-5">{audiences.map(audience => <Link key={audience.href} href={audience.href} className="border border-primary/15 rounded-xl p-6 hover:border-accent transition-colors"><h3 className="font-semibold text-xl mb-2">{audience.title} →</h3><p className="text-gray-600">{audience.description}</p></Link>)}</div>
    </div></section>
    <section className="max-w-6xl mx-auto px-5 py-20">
      <h2 className="font-serif text-4xl mb-8">Further help & resources</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div><h3 className="font-semibold mb-3">Brand Clone Scan</h3><p className="text-gray-600 mb-4">Explore the scan request for an existing brand. Automated findings have limits; suspected misuse may need further review.</p><Link href="/scan" className="underline">View the scan →</Link><br /><Link href="/escaneo" className="text-sm underline">Ver en español</Link></div>
        <div><h3 className="font-semibold mb-3">Brand protection guides</h3><p className="text-gray-600 mb-4">Read about trademarks, online identity, and the questions to ask before choosing a name.</p><Link href="/blog" className="underline">Browse articles →</Link><br /><Link href="/ai-brand-protection" className="text-sm underline">AI brand protection guide</Link></div>
        <div><h3 className="font-semibold mb-3">Work with us</h3><p className="text-gray-600 mb-4">Explore the affiliate program or contact the team about working together.</p><Link href="/affiliates" className="underline">Affiliate program →</Link><br /><Link href="/contact" className="text-sm underline">Contact the team</Link></div>
      </div>
    </section>
  </div>
}

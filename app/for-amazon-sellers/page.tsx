import type { Metadata } from "next"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { AmazonBrandCheckForm } from "@/components/amazon-brand-check-form"

export const metadata: Metadata = {
  openGraph: {
    title: "Trademark Help for Amazon Sellers | Just Protected",
    description: "Launching a product brand on Amazon? Request a preliminary trademark review for your name, products, and target market before committing to packaging and inventory.",
    url: "/for-amazon-sellers",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trademark Help for Amazon Sellers | Just Protected",
    description: "Launching a product brand on Amazon? Request a preliminary trademark review for your name, products, and target market before committing to packaging and inventory.",
  },
  title: "Trademark Help for Amazon Sellers | Just Protected",
  description: "Launching a product brand on Amazon? Request a preliminary trademark review for your name, products, and target market before committing to packaging and inventory.",
  alternates: { canonical: "/for-amazon-sellers" },
}

export default function AmazonSellersPage() {
  return <main className="bg-[#FAF8F4] min-h-screen">
    <NavBar />
    <section className="bg-primary text-white px-5 py-20 md:py-28">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        <div className="lg:sticky lg:top-28">
          <p className="label-caps text-accent mb-6">For product brands launching on Amazon</p>
          <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-7">Before you print the packaging,<br /><span className="italic text-accent">check the name.</span></h1>
          <p className="text-lg text-white/80 leading-relaxed mb-7">You’ve chosen the products. You’re building the brand. Find out what needs checking before you invest in a name you may need to change.</p>
          <p className="text-white/70 leading-relaxed mb-8">Tell us your name, what you sell, and where you plan to sell it. We’ll help you understand the trademark questions and the next steps toward filing.</p>
          <ul className="space-y-3 text-sm text-white/80"><li>✓ Free preliminary review request</li><li>✓ Everyday language — no class numbers to figure out</li><li>✓ Country-specific filing quote before you commit</li></ul>
          <Link href="/detailed-pricelist" className="inline-block mt-8 text-accent underline underline-offset-4">Browse filing prices by country →</Link>
        </div>
        <div id="brand-review" className="scroll-mt-28"><AmazonBrandCheckForm /></div>
      </div>
    </section>
    <section className="max-w-6xl mx-auto px-5 py-20">
      <p className="label-caps text-accent mb-4">The part to get right early</p>
      <h2 className="font-serif text-4xl text-primary mb-10">A company name. A domain. A trademark.<br />Three different checks.</h2>
      <div className="grid md:grid-cols-3 gap-8">{[
        ["Your company", "Registering a company does not itself establish that its name is clear to use as a trademark."],
        ["Your website", "Buying a domain or finding an available social handle is not trademark clearance."],
        ["Your products", "Trademark review considers similar names, relevant goods and services, and the market where you need protection."],
      ].map(([title, text]) => <article key={title} className="border-t border-primary/20 pt-6"><h3 className="text-xl text-primary font-semibold mb-3">{title}</h3><p className="text-gray-600 leading-relaxed">{text}</p></article>)}</div>
    </section>
    <section className="bg-white px-5 py-20"><div className="max-w-4xl mx-auto">
      <h2 className="font-serif text-4xl text-primary mb-6">Planning to use Amazon Brand Registry?</h2>
      <p className="text-gray-600 leading-relaxed mb-5">Amazon requires an eligible registered or pending trademark, plus other requirements such as a brand name or logo permanently affixed to your products or packaging. Accepted offices and application status depend on Amazon’s current rules.</p>
      <p className="text-gray-600 leading-relaxed mb-5">We help with the trademark side. Amazon makes its own enrollment decisions. Just Protected is independent of Amazon and is not presented as an Amazon IP Accelerator provider.</p>
      <a href="https://sell.amazon.com/blog/brand-registry-requirements" target="_blank" rel="noopener noreferrer" className="text-primary underline">Read Amazon’s official eligibility requirements ↗</a>
    </div></section>
    <section className="max-w-6xl mx-auto px-5 py-20">
      <h2 className="font-serif text-4xl text-primary mb-10">What happens after you ask?</h2>
      <ol className="grid md:grid-cols-3 gap-8">{[
        ["01 · Tell us the basics", "Your name, products, target country, and email. You don’t need to know trademark terminology."],
        ["02 · Understand the next step", "We review your request and explain the scope of checks, potential concerns, and any further review needed."],
        ["03 · Decide whether to file", "If you want to proceed, we confirm the proposed filing scope and quote. Government fees and service fees should be clear before payment."],
      ].map(([title, text]) => <li key={title}><h3 className="font-semibold text-primary mb-3">{title}</h3><p className="text-gray-600 leading-relaxed">{text}</p></li>)}</ol>
      <div className="mt-12"><a href="#brand-review" className="inline-block rounded-full bg-primary text-white px-8 py-4 font-semibold">Request my free brand review →</a></div>
      <p className="mt-6 text-sm text-gray-600">Still planning your launch? <a href="/downloads/amazon-brand-launch-checklist.html" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Save the free pre-packaging checklist →</a></p>
      <p className="mt-4 text-sm text-gray-600"><Link href="/blog/amazon-brand-registry-trademark-checklist" className="underline underline-offset-4">Read the Amazon Brand Registry trademark guide →</Link></p>
      <p className="text-xs text-gray-500 mt-8 max-w-3xl">A preliminary review is not a guarantee of availability, registration, or Amazon enrollment. A match in another class is not automatically irrelevant: related products and well-known marks can also matter.</p>
    </section>
    <Footer />
  </main>
}

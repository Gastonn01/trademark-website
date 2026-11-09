import type { Metadata } from "next"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  openGraph: {
    title: "Amazon Brand Registry: Trademark Checks Before You Launch | Just Protected",
    description: "Understand the trademark questions behind an Amazon launch: pending applications, brand names, product classes, and checks before packaging and inventory.",
    url: "/blog/amazon-brand-registry-trademark-checklist",
    siteName: "Just Protected",
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amazon Brand Registry: Trademark Checks Before You Launch | Just Protected",
    description: "Understand the trademark questions behind an Amazon launch: pending applications, brand names, product classes, and checks before packaging and inventory.",
  },
  title: "Amazon Brand Registry: Trademark Checks Before You Launch | Just Protected",
  description: "Understand the trademark questions behind an Amazon launch: pending applications, brand names, product classes, and checks before packaging and inventory.",
  alternates: { canonical: "/blog/amazon-brand-registry-trademark-checklist" },
}
export default function AmazonTrademarkGuide() {
  return <main className="bg-[#FAF8F4] text-primary">
    <NavBar />
    <article className="max-w-4xl mx-auto px-5 py-16 md:py-24">
      <p className="label-caps text-accent mb-6">Amazon sellers · launch planning</p>
      <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-7">Amazon Brand Registry: what to check about your trademark before you launch.</h1>
      <p className="text-lg text-gray-600 leading-relaxed mb-8">A seller account, a brand name, and a trademark application involve different decisions. Use this guide to organize the questions before you commit to branded inventory.</p>
      <div className="rounded-xl bg-white border border-primary/10 p-6 mb-12"><p className="font-semibold mb-3">Start with four details</p><ul className="list-disc pl-5 space-y-2 text-gray-600"><li>The exact name on your products.</li><li>What you sell, described in everyday language.</li><li>The country or territory where you need protection.</li><li>The person or business that will own the application.</li></ul></div>
      <section className="space-y-5 mb-12"><h2 className="font-serif text-3xl">Do I need a trademark to sell on Amazon?</h2><p className="text-gray-700 leading-relaxed">Selling on Amazon and enrolling in Brand Registry are separate. Amazon describes Brand Registry as a program for eligible brand owners, with trademark and branding requirements. Don’t assume that setting up a seller account completes either your trademark review or Brand Registry enrollment.</p><p><a href="https://sell.amazon.com/blog/what-is-amazon-brand-registry" className="underline">Amazon’s explanation of Brand Registry ↗</a></p></section>
      <section className="space-y-5 mb-12"><h2 className="font-serif text-3xl">Can I use a pending trademark application?</h2><p className="text-gray-700 leading-relaxed">Amazon accepts eligible registered marks and certain pending applications. The issuing office, status, and brand details matter. Check the rules for your intended market before making a filing decision, and confirm that the name on the application and your proposed branding meet the enrollment requirements.</p><p className="text-gray-700 leading-relaxed">Amazon also offers IP Accelerator through vetted providers. Just Protected is independent of Amazon; this page does not present us as an IP Accelerator provider or promise faster enrollment.</p><p><a href="https://sell.amazon.com/blog/brand-registry-requirements" className="underline">Official requirements ↗</a> · <a href="https://sell.amazon.com/programs/ip-accelerator" className="underline">Amazon IP Accelerator ↗</a></p></section>
      <section className="space-y-5 mb-12"><h2 className="font-serif text-3xl">What should I check before printing the name?</h2><p className="text-gray-700 leading-relaxed">Separate your practical launch checks from your legal review. Domain availability, a social handle, and a company registration do not settle whether a proposed product brand conflicts with existing trademark rights.</p><p className="text-gray-700 leading-relaxed">For a US filing, the USPTO explains that searching its register is one essential part of clearance. A useful review also considers confusingly similar marks and related products. A search that returns no exact spelling match is not a clearance opinion.</p><p><a href="https://www.uspto.gov/trademarks/search/federal-trademark-searching" className="underline">USPTO search guidance ↗</a></p></section>
      <section className="space-y-5 mb-12"><h2 className="font-serif text-3xl">Is a similar name fine in another class?</h2><p className="text-gray-700 leading-relaxed">Classes organize goods and services, but they do not create automatic safe zones. The USPTO notes that related products can matter across international classes. Marks can be similar in sound, appearance, meaning, or commercial impression even when their spelling differs.</p><p className="text-gray-700 leading-relaxed">Describe what you actually sell before deciding which records are relevant. For example, “clothing” needs a more useful description than “online business”. Different territories require their own assessment.</p><p><a href="https://www.uspto.gov/trademarks/search/likelihood-confusion" className="underline">USPTO likelihood-of-confusion guidance ↗</a></p></section>
      <section className="space-y-5 mb-12"><h2 className="font-serif text-3xl">What happens after a preliminary review?</h2><p className="text-gray-700 leading-relaxed">A preliminary review should explain what was checked, relevant concerns, and what still needs further investigation. Before paying for filing, confirm the proposed owner, territory, products, classes, government fees, service fees, and what happens if an objection arises.</p><p className="text-gray-700 leading-relaxed">Registration and Amazon enrollment are decisions made through their respective processes. Neither can be guaranteed by a search result or a service provider.</p></section>
      <aside className="bg-primary text-white rounded-2xl p-8"><h2 className="font-serif text-3xl mb-4">Tell us what you’re launching.</h2><p className="text-white/75 mb-6">Send the brand name, products, market, and your email. Request a free preliminary review and understand the next step before any paid filing.</p><Link href="/for-amazon-sellers?utm_source=blog&amp;utm_medium=owned_content&amp;utm_campaign=amazon_launch" className="inline-block rounded-full bg-accent text-primary px-6 py-3 font-semibold">Request a brand review →</Link><p className="mt-5"><a href="/downloads/amazon-brand-launch-checklist.html" className="text-sm underline text-white/80">Save the pre-packaging checklist</a></p></aside>
      <p className="text-xs text-gray-500 mt-8">General educational information, not a clearance opinion or legal advice. Check current office and Amazon requirements for your circumstances. Campaign visual is illustrative.</p>
    </article><Footer />
  </main>
}

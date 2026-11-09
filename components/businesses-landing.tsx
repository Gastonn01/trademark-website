"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

export function BusinessesLanding() {
  return (
    <div>
      {/* HERO */}
      <section className="relative bg-primary overflow-hidden">
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
              <p className="label-caps text-accent mb-8">Brand Protection for Businesses & Entrepreneurs</p>

              <h1 className="font-serif text-white text-5xl md:text-6xl leading-[1.1] tracking-tight mb-8">
                Someone can clone your store
                <br />
                <span className="italic text-accent">by this afternoon.</span>
              </h1>

              <p className="text-base md:text-lg text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                AI made copying a storefront, product photos, or a brand name trivial. A registered trademark is
                the one document that gets a fake store taken down fast — instead of never.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  href="/free-search?audience=business"
                  className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-primary bg-accent hover:brightness-105 rounded-full transition-all duration-300"
                >
                  Check if my brand is protected
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/detailed-pricelist"
                  className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white/80 border border-white/25 hover:border-white/60 hover:text-white rounded-full transition-all duration-300"
                >
                  See pricing
                </Link>
              </div>

              <p className="label-caps text-[0.65rem] text-white/40">
                Free name check&ensp;&middot;&ensp;Filed in 24 hours&ensp;&middot;&ensp;70+ countries&ensp;&middot;&ensp;Licensed attorneys
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHAT'S AT STAKE */}
      <section className="py-24 md:py-32 bg-[#F7F5F1]">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div {...fade} className="text-center mb-16">
            <p className="label-caps text-accent mb-5">Your name is your business</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-tight mb-5">
              Here&apos;s what&apos;s at risk
            </h2>
            <p className="text-gray-500 font-light max-w-2xl mx-auto">
              Whatever you sell, your brand name is what customers actually trust. Product listings, ad accounts,
              repeat customers — all of it depends on your name meaning something, and staying yours.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-10 gap-y-12">
            {[
              {
                tag: "Cloned stores",
                title: "A fake storefront using your name",
                description:
                  "Someone scrapes your product photos and listings and stands up a lookalike store — often selling at a lower price, keeping the money, and shipping nothing. Customers blame you. Without a trademark, getting it taken down can take months.",
              },
              {
                tag: "Ad account risk",
                title: "Flagged for using your own logo",
                description:
                  "Ad platforms side with whoever filed first. It's not rare for a business owner to get their own ad account flagged for \"infringing\" a brand they built — because someone else registered it first.",
              },
              {
                tag: "Marketplace disputes",
                title: "Losing your listings on a marketplace",
                description:
                  "Amazon, Etsy, and similar platforms require proof of trademark ownership to resolve brand disputes and enroll in brand protection programs. No registration, no leverage — even if you were first.",
              },
              {
                tag: "Trademark squatting",
                title: "Someone registers your name before you do",
                description:
                  "It happens more than people think, and it's usually discovered by accident, months later, by which point the options are worse and more expensive. Filing first costs a fraction of fighting to get a name back.",
              },
            ].map((risk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="pt-6 border-t border-primary/15"
              >
                <p className="label-caps text-[0.65rem] text-accent mb-4">{risk.tag}</p>
                <h3 className="text-lg font-semibold text-primary mb-3">{risk.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{risk.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU CAN TRADEMARK */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div {...fade} className="text-center mb-16">
            <p className="label-caps text-accent mb-5">More than you think</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-tight">
              What can a business trademark?
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {[
              { tag: "Identity", title: "Your business name", desc: "The name customers actually search for and recognize you by." },
              { tag: "Visual brand", title: "Your logo", desc: "Your logo, icon, or the visual mark on your packaging and site." },
              { tag: "Tagline", title: "Your slogan or tagline", desc: "A distinctive phrase your business is known for in marketing." },
              { tag: "Product line", title: "A product or product line name", desc: "A named product, collection, or line that's distinct from your business name." },
              { tag: "Packaging", title: "Distinctive packaging", desc: "Trade dress — a recognizable shape, color scheme, or packaging design." },
              { tag: "Domain match", title: "Your domain-matching name", desc: "Owning the .com doesn't register the trademark — these are separate, and both matter." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.6 }}
                className="pt-6 border-t border-primary/15"
              >
                <p className="label-caps text-[0.65rem] text-accent mb-4">{item.tag}</p>
                <h3 className="text-lg font-semibold text-primary mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 md:py-32 bg-[#F7F5F1]">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div {...fade} className="text-center mb-16">
            <p className="label-caps text-accent mb-5">The process</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-tight mb-5">Simple. Fast. Done.</h2>
            <p className="text-gray-500 font-light">You run the business. We handle the legal side.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-x-10 gap-y-12 mb-16">
            {[
              {
                number: "01",
                title: "Free name check",
                description:
                  "We search trademark databases across 170+ countries. Find out instantly if your name is already claimed — or at risk of being taken.",
              },
              {
                number: "02",
                title: "We file in 24 hours",
                description:
                  "Tell us what to protect and where you operate. Our licensed attorneys handle every part of the application. No forms, no legal knowledge needed.",
              },
              {
                number: "03",
                title: "You're covered",
                description:
                  "Legal protection from your filing date. You can now demand takedowns on cloned stores, resolve marketplace disputes, and expand with confidence.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="pt-6 border-t border-primary/15"
              >
                <div className="font-serif italic text-2xl text-accent mb-4">{step.number}</div>
                <h3 className="text-lg font-semibold text-primary mb-3">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade} className="text-center">
            <Link
              href="/free-search?audience=business"
              className="inline-flex items-center justify-center px-10 py-4 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-full transition-all duration-300"
            >
              Begin your free name check
            </Link>
          </motion.div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-24 md:py-32 bg-primary">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="label-caps text-accent mb-5">What&apos;s included</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white tracking-tight leading-tight mb-6">
                Everything included.
                <br />
                <span className="italic text-accent">One monthly plan.</span>
              </h2>
              <p className="text-white/50 font-light mb-10 leading-relaxed">
                From filing to monitoring — covered. No surprise legal invoices. No hidden fees. Just protection
                that works.
              </p>
              <Link
                href="/free-search?audience=business"
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-primary bg-accent hover:brightness-105 rounded-full transition-all duration-300"
              >
                Start your free name check
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <ul className="space-y-4">
                {[
                  "Free trademark search across 170+ countries",
                  "Licensed attorney review",
                  "Filing within 24 hours",
                  "Coverage in 70+ countries",
                  "Business-specific goods & services classification",
                  "1 year of monitoring included",
                  "Alerts if someone files something similar",
                  "Marketplace & platform takedown support",
                  "Office action support if issues arise",
                  "Money-back guarantee",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-white/70 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* REAL CASE */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div {...fade} className="text-center mb-16">
            <p className="label-caps text-accent mb-5">Not hypothetical</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-tight mb-5">
              It&apos;s already happening
            </h2>
            <p className="text-gray-500 font-light">These cases are why business owners are registering now.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-10 gap-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08, duration: 0.6 }} className="pt-6 border-t border-primary/15">
              <p className="label-caps text-[0.65rem] text-accent mb-4">Counterfeit listings</p>
              <h3 className="text-lg font-semibold text-primary mb-3">TikTok Shop counterfeits</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                Sellers with unregistered brands found counterfeit versions of their products listed on TikTok
                Shop — same name, same packaging. Without trademark registration, getting them removed took
                months. With it, it takes days.
              </p>
              <Link href="/blog/tiktok-shop-counterfeit-violation-appeal" className="text-accent font-semibold hover:underline text-sm">
                Read the full case →
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16, duration: 0.6 }} className="pt-6 border-t border-primary/15">
              <p className="label-caps text-[0.65rem] text-accent mb-4">AI-generated brands</p>
              <h3 className="text-lg font-semibold text-primary mb-3">AI-generated logos & fake brands</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                AI tools can now generate logos, names, and full visual identities that look strikingly similar
                to established businesses. If your brand isn&apos;t registered, there&apos;s little stopping
                someone from launching a lookalike next to yours.
              </p>
              <Link href="/blog/ai-generated-logos-brand-names-real-risk" className="text-accent font-semibold hover:underline text-sm">
                Read the full case →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-[#F7F5F1]">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div {...fade} className="text-center mb-14">
            <p className="label-caps text-accent mb-5">Common questions</p>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-primary">
              Questions business owners ask us
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="w-full">
            {[
              {
                q: "I already have an LLC. Isn't my business name protected?",
                a: "No — registering a business entity (an LLC or corporation) with your state just reserves that legal entity name. It doesn't stop someone else from using a similar name for their products or trademark, or from registering it as a trademark themselves. They're two separate systems.",
              },
              {
                q: "I own the domain. Doesn't that protect the name?",
                a: "No. Domain ownership and trademark ownership are unrelated. You can own yourbrand.com and still have someone else register \"Yourbrand\" as a trademark — and you'd have no automatic right to stop them.",
              },
              {
                q: "Someone already cloned my store. Is it too late to register?",
                a: "No — register now. A registration doesn't undo what already happened, but it's the single most effective thing you can do to get the clone taken down and to prevent it from happening again with a stronger legal position.",
              },
              {
                q: "Do I need to register in every country I ship to?",
                a: "Not necessarily every country, but every country where you meaningfully sell or plan to expand. Trademarks are territorial — a US registration does nothing for you in the EU or UK. Our attorneys will help you prioritize based on where your actual exposure is.",
              },
              {
                q: "What's the difference between trademark and copyright for a business?",
                a: "Copyright protects your creative content — product photos, descriptions, videos. Trademark protects your brand name and logo as identifiers of your business. A cloned storefront using your name but different photos is a trademark issue, not a copyright one.",
              },
              {
                q: "How much does it cost?",
                a: "The US is $65/month over 11 months. EU is $99/month. Most business owners start with 2–3 key markets and pay under $200/month total — with no large upfront cost. The search is completely free. Check our pricing page for full country-by-country details.",
              },
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-semibold text-primary">{item.q}</AccordionTrigger>
                <AccordionContent className="text-gray-500 leading-relaxed">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-primary rounded-3xl px-8 py-16 md:px-16 md:py-20 text-center">
              <p className="label-caps text-accent mb-6">Your brand took years to build</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white tracking-tight leading-tight mb-6 max-w-2xl mx-auto">
                Don&apos;t let a clone <span className="italic text-accent">take it.</span>
              </h2>
              <p className="text-white/50 font-light max-w-xl mx-auto mb-10 leading-relaxed">
                Start with a free name check. It takes 60 seconds, costs nothing, and tells you exactly where
                you stand.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <Link
                  href="/free-search?audience=business"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 text-sm font-semibold text-primary bg-accent hover:brightness-105 rounded-full transition-all duration-300"
                >
                  Check if my brand is protected — free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/detailed-pricelist"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 text-sm font-semibold text-white/80 border border-white/25 hover:border-white/60 hover:text-white rounded-full transition-all duration-300"
                >
                  See pricing
                </Link>
              </div>

              <p className="label-caps text-[0.65rem] text-white/35">
                No credit card required&ensp;&middot;&ensp;Results in 24 hours&ensp;&middot;&ensp;Money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

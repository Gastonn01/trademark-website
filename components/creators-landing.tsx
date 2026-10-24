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

export function CreatorsLanding() {
  return (
    <div>
      {/* HERO */}
      <section className="relative bg-primary overflow-hidden">
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
              <p className="label-caps text-accent mb-8">Brand Protection for Creators & Influencers</p>

              <h1 className="font-serif text-white text-5xl md:text-6xl leading-[1.1] tracking-tight mb-8">
                AI is faking your face.
                <br />
                <span className="italic text-accent">Here&apos;s how you fight back.</span>
              </h1>

              <p className="text-base md:text-lg text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                Deepfake ads. Fake sponsorship posts. AI accounts impersonating you. Your name and face are
                being used to make money — without your permission. A trademark gives you the legal power to
                stop it.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  href="/free-search?audience=creator"
                  className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-primary bg-accent hover:brightness-105 rounded-full transition-all duration-300"
                >
                  Check if my name is protected
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
            <p className="label-caps text-accent mb-5">Your brand is your business</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-tight mb-5">
              Here&apos;s what&apos;s at risk
            </h2>
            <p className="text-gray-500 font-light max-w-2xl mx-auto">
              As a creator, your name, handle, and personal brand are worth real money. Brand deals,
              merchandise, courses, communities — all of it depends on you owning your identity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-10 gap-y-12">
            {[
              {
                tag: "AI deepfakes",
                title: "AI deepfake ads",
                description:
                  "Someone generates a video of you promoting a product you've never heard of. Your followers see it. Brands see it. Your reputation takes the hit — and without a trademark, your legal options are limited.",
              },
              {
                tag: "Impersonation",
                title: "Fake accounts & impersonation",
                description:
                  "Copycat accounts use your name and likeness to sell products, run scams, or poach your audience. A registered trademark makes it far easier to get them removed — from any platform, in any country.",
              },
              {
                tag: "Deal diligence",
                title: "Brand deals falling through",
                description:
                  "Serious brands and agencies check whether your name is protected before signing. No trademark? No deal — or a much smaller one. It's become a basic requirement in creator contracts.",
              },
              {
                tag: "Trademark squatting",
                title: "Someone registers your name first",
                description:
                  "Name squatters are real. They register creator names, handles, and catchphrases as trademarks — then demand money to give them back. Filing first costs a fraction of what it costs to fight back.",
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
              What can creators trademark?
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {[
              { tag: "Identity", title: "Your name", desc: "Your real name or creator name — the one your audience knows you by." },
              { tag: "Handle", title: "Your handle", desc: "Your @username or channel name, if it's how people find you." },
              { tag: "Catchphrase", title: "Your catchphrase", desc: "A recurring phrase, sign-off, or saying you're known for." },
              { tag: "Visual brand", title: "Your logo or visual brand", desc: "Your personal logo, icon, or signature visual style." },
              { tag: "Show name", title: "Your show or series name", desc: "The name of your podcast, video series, or regular content format." },
              { tag: "Merch brand", title: "Your merch brand", desc: "If you sell merchandise, the brand name on it deserves its own protection." },
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
            <p className="text-gray-500 font-light">You create content. We handle the legal side.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-x-10 gap-y-12 mb-16">
            {[
              {
                number: "01",
                title: "Free name check",
                description:
                  "We search trademark databases across 170+ countries. Find out instantly if your name or handle is already claimed — or at risk.",
              },
              {
                number: "02",
                title: "We file in 24 hours",
                description:
                  "Tell us what to protect and where. Our licensed attorneys handle every part of the application. No forms, no legal knowledge needed.",
              },
              {
                number: "03",
                title: "You're covered",
                description:
                  "Legal protection from your filing date. You can now demand takedowns, block fakes, and sign brand deals with confidence.",
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
              href="/free-search?audience=creator"
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
                href="/free-search?audience=creator"
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
                  "Creator-specific goods & services classification",
                  "1 year of monitoring included",
                  "Alerts if someone files something similar",
                  "Platform takedown support (Instagram, TikTok, YouTube)",
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
            <p className="text-gray-500 font-light">These cases are why creators are registering now.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-10 gap-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08, duration: 0.6 }} className="pt-6 border-t border-primary/15">
              <p className="label-caps text-[0.65rem] text-accent mb-4">Counterfeit merch</p>
              <h3 className="text-lg font-semibold text-primary mb-3">TikTok Shop counterfeits</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                Creators with unregistered brands found counterfeit versions of their merchandise selling on
                TikTok Shop — using their name and likeness. Without trademark registration, getting them
                removed took months. With it, it takes days.
              </p>
              <Link href="/blog/tiktok-shop-counterfeit-violation-appeal" className="text-accent font-semibold hover:underline text-sm">
                Read the full case →
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16, duration: 0.6 }} className="pt-6 border-t border-primary/15">
              <p className="label-caps text-[0.65rem] text-accent mb-4">AI-generated brands</p>
              <h3 className="text-lg font-semibold text-primary mb-3">AI-generated logos & fake brands</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                AI tools can now generate logos, brand names, and visual identities that look strikingly similar
                to established creators. If your brand isn&apos;t registered, there&apos;s little stopping
                someone from launching a lookalike.
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
              Questions creators ask us
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="w-full">
            {[
              {
                q: "Can I trademark my @handle or username?",
                a: "Yes, if it functions as a brand identifier. If people know you by your handle and it's associated with your content or business, it's registrable as a trademark. This is one of the most important things creators can do — handles get copied constantly.",
              },
              {
                q: "What if AI is already using my face or voice?",
                a: "A trademark is one of your strongest tools. Combined with platform terms of service and in some jurisdictions, right-of-publicity laws, a registered trademark gives you legal standing to demand immediate takedowns. Without one, your options are far more limited and slower.",
              },
              {
                q: "Do I need to be a big creator to need this?",
                a: "No. In fact, smaller creators are more at risk — they're less likely to have legal protection already in place, and name squatters actively target rising creators before they get big. It's much cheaper and easier to register now than to fight for your name later.",
              },
              {
                q: "Can I trademark a catchphrase or sign-off?",
                a: "Yes — if it's distinctive and associated with your brand. Phrases that are unique to you and that your audience recognises you by are strong candidates. Generic phrases (\"Have a great day!\") typically aren't registrable, but distinctive ones are.",
              },
              {
                q: "Which countries should I register in?",
                a: "Start where your audience and brand deals are. For most creators, that means the US and EU as a minimum. If you have significant audiences in the UK, Australia, or other markets, we can add those. Our attorneys will advise based on your situation.",
              },
              {
                q: "How much does it cost?",
                a: "The US is $65/month over 11 months. EU is $99/month. Most creators start with 2–3 key markets and pay under $200/month total — with no large upfront cost. The search is completely free. Check our pricing page for full country-by-country details.",
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
                Don&apos;t let AI or copycats <span className="italic text-accent">take it.</span>
              </h2>
              <p className="text-white/50 font-light max-w-xl mx-auto mb-10 leading-relaxed">
                Start with a free name check. It takes 60 seconds, costs nothing, and tells you exactly where
                you stand.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <Link
                  href="/free-search?audience=creator"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 text-sm font-semibold text-primary bg-accent hover:brightness-105 rounded-full transition-all duration-300"
                >
                  Check if my name is protected — free
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

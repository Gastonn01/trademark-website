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

export function AthletesLanding() {
  return (
    <div>
      {/* HERO */}
      <section className="relative bg-primary overflow-hidden">
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
              <p className="label-caps text-accent mb-8">NIL Protection for Athletes</p>

              <h1 className="font-serif text-white text-5xl md:text-6xl leading-[1.1] tracking-tight mb-8">
                Your name is worth money.
                <br />
                <span className="italic text-accent">Make sure it&apos;s yours.</span>
              </h1>

              <p className="text-base md:text-lg text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                Since NIL rights opened up, your name, image, and likeness can earn you real money —
                sponsorships, deals, appearances. But if your name isn&apos;t trademarked, someone else can
                register it, use it, or fake endorsements in your name. We fix that in 24 hours.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  href="/free-search?audience=athlete"
                  className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-primary bg-accent hover:brightness-105 rounded-full transition-all duration-300"
                >
                  Check if my name is taken
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

      {/* WHAT IS NIL */}
      <section className="py-24 md:py-32 bg-[#F7F5F1]">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div {...fade} className="text-center mb-16">
            <p className="label-caps text-accent mb-5">Plain English, no jargon</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-tight">
              What is NIL — and why does it matter?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-x-10 gap-y-12 mb-14">
            {[
              {
                letter: "N",
                word: "Name",
                description:
                  "Your name — including your nickname, your number, or the brand you've built around yourself. If it's how people know you, it has value.",
              },
              {
                letter: "I",
                word: "Image",
                description:
                  "Your face, your likeness, your look. Companies want to put famous athletes in their ads — and AI can now fake it without asking.",
              },
              {
                letter: "L",
                word: "Likeness",
                description:
                  "Your style, your signature move, your voice. Everything that makes you recognisable as you — and everything that can be misused without legal protection.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="pt-6 border-t border-primary/15"
              >
                <div className="font-serif italic text-4xl text-accent mb-4">{item.letter}</div>
                <h3 className="text-lg font-semibold text-primary mb-3">{item.word}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade} className="border-t border-primary/15 pt-8 text-center max-w-2xl mx-auto">
            <p className="text-gray-600 leading-relaxed">
              In 2021, the NCAA changed its rules. For the first time, college athletes can earn money from
              their NIL — sponsorships, social media deals, appearances, merchandise.{" "}
              <strong className="text-primary font-semibold">
                But without a trademark, your NIL is unprotected.
              </strong>{" "}
              Anyone can register your name before you do.
            </p>
          </motion.div>
        </div>
      </section>

      {/* THE RISKS */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div {...fade} className="text-center mb-16">
            <p className="label-caps text-accent mb-5">What happens without protection</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-tight mb-5">
              The threats are real — and growing
            </h2>
            <p className="text-gray-500 font-light max-w-xl mx-auto">
              These aren&apos;t hypothetical. They&apos;re happening to athletes right now.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-10 gap-y-12">
            {[
              {
                tag: "Trademark squatting",
                title: "Name squatters",
                description:
                  "Someone registers your name as a trademark before you do. Now you can't use it commercially without legal risk — or you have to pay to buy it back.",
              },
              {
                tag: "AI impersonation",
                title: "AI fake endorsements",
                description:
                  "AI-generated videos or images show you endorsing products you've never heard of. Brands, scammers, and competitors can fake your face and voice.",
              },
              {
                tag: "Counterfeit merch",
                title: "Counterfeit merchandise",
                description:
                  "People sell merchandise with your name and likeness and you see none of the money. Without a trademark, it's hard to enforce takedowns.",
              },
              {
                tag: "Sponsor diligence",
                title: "Deal-breaker for sponsors",
                description:
                  "Serious brands ask whether your name is trademarked before signing a deal. Without one, you're leaving money on the table or losing deals entirely.",
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

      {/* HOW IT WORKS */}
      <section className="py-24 md:py-32 bg-[#F7F5F1]">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div {...fade} className="text-center mb-16">
            <p className="label-caps text-accent mb-5">The process</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-tight mb-5">
              How we protect your NIL
            </h2>
            <p className="text-gray-500 font-light">Three steps. No lawyers to find. No forms to figure out.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-x-10 gap-y-12 mb-16">
            {[
              {
                number: "01",
                title: "Free name check",
                description:
                  "We search trademark databases in 170+ countries to see if your name is already registered — or at risk. Takes seconds. Completely free.",
              },
              {
                number: "02",
                title: "We file for you in 24h",
                description:
                  "Our licensed attorneys prepare and file your application. You don't need to understand trademark law — that's what we're for.",
              },
              {
                number: "03",
                title: "You're protected",
                description:
                  "Your name is registered in the countries you choose. You get legal standing to stop fakes, demand takedowns, and sign deals with confidence.",
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
              href="/free-search?audience=athlete"
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
                <span className="italic text-accent">No surprises.</span>
              </h2>
              <p className="text-white/50 font-light mb-10 leading-relaxed">
                One monthly plan covers everything from filing to monitoring. No hidden legal fees, no surprise
                invoices.
              </p>
              <Link
                href="/free-search?audience=athlete"
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
                  "Licensed attorney review of your application",
                  "Filing within 24 hours",
                  "Coverage in 70+ countries (your choice)",
                  "1 year of trademark monitoring included",
                  "Alerts if someone tries to register something similar",
                  "Office action support if issues arise",
                  "Digital certificate of registration",
                  "NIL-specific goods & services classification",
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

      {/* REAL CASE CALLOUT */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div {...fade} className="text-center mb-16">
            <p className="label-caps text-accent mb-5">Not hypothetical</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-tight mb-5">
              It&apos;s already happening
            </h2>
            <p className="text-gray-500 font-light">Real cases. Real money. Real consequences.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-10 gap-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08, duration: 0.6 }} className="pt-6 border-t border-primary/15">
              <p className="label-caps text-[0.65rem] text-accent mb-4">Sports & celebration IP</p>
              <h3 className="text-lg font-semibold text-primary mb-3">Cole Palmer&apos;s celebration trademark</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                Chelsea star Cole Palmer moved to trademark his signature goal celebration — a simple gesture
                that became his brand. Athletes are waking up to the fact that even their on-field moments have
                commercial value worth protecting.
              </p>
              <Link href="/blog/cole-palmer-celebration-trademark" className="text-accent font-semibold hover:underline text-sm">
                Read the full case →
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16, duration: 0.6 }} className="pt-6 border-t border-primary/15">
              <p className="label-caps text-[0.65rem] text-accent mb-4">AI voice cloning</p>
              <h3 className="text-lg font-semibold text-primary mb-3">AI voice cloning hits musicians</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                When a fake Drake song went viral, it exposed how easily AI can clone a famous person&apos;s
                voice and create content they never made. Without legal protection, the tools to fight back are
                limited — a trademark changes that.
              </p>
              <Link href="/blog/ai-voice-cloning-drake-ip-battleground" className="text-accent font-semibold hover:underline text-sm">
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
              Questions athletes ask us
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="w-full">
            {[
              {
                q: "Can college athletes trademark their name?",
                a: "Yes. Since the NCAA changed its NIL rules in 2021, college athletes can fully monetise their Name, Image & Likeness — and trademarking your name is the single most important legal step to do that safely. There are no restrictions on college athletes registering trademarks.",
              },
              {
                q: "What exactly does a trademark protect for an athlete?",
                a: "A trademark gives you exclusive rights to use your name (or other mark) commercially in the categories you register. That means you can stop others from: selling merchandise with your name, running fake sponsorship ads, registering your name as a domain or brand, and using AI to fake endorsements in your name.",
              },
              {
                q: "How long does it take to file?",
                a: "We file your application within 24 hours of receiving your information. The official registration process with trademark offices takes 6–18 months depending on the country — but you have legal protection from the filing date, not the registration date. So the sooner you file, the sooner you're protected.",
              },
              {
                q: "Do I need to trademark in every country?",
                a: "No — but you should register in the countries where your deals and audience are. Most athletes start with the US, EU, and UK. If you have a global fanbase or international sponsorship deals, we can expand from there. Our monthly installment plan makes multi-country registration affordable.",
              },
              {
                q: "What if someone already registered my name?",
                a: "Don't panic — it happens. Our free search will tell you immediately if there's a conflict. Depending on the situation, there may be options: oppositions, challenges, or registration in different categories. Our attorneys will advise you on the best path forward.",
              },
              {
                q: "How much does it cost?",
                a: "It depends on which countries you want protection in. The US is $65/month over 11 months. EU is $99/month. Most athletes start with 2–3 key markets for under $200/month total — with no large upfront fee. Check our pricing page for full details.",
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
              <p className="label-caps text-accent mb-6">Every day counts</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white tracking-tight leading-tight mb-6 max-w-2xl mx-auto">
                Every day without a trademark <span className="italic text-accent">is a risk.</span>
              </h2>
              <p className="text-white/50 font-light max-w-xl mx-auto mb-10 leading-relaxed">
                Name squatters are active. AI doesn&apos;t ask permission. Sponsors want to see legal protection
                before signing. Start with a free name check — it takes 60 seconds and costs nothing.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <Link
                  href="/free-search?audience=athlete"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 text-sm font-semibold text-primary bg-accent hover:brightness-105 rounded-full transition-all duration-300"
                >
                  Check if my name is taken — free
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

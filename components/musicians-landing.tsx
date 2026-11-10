"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { PublishedFaq } from "@/components/published-faq"

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

export function MusiciansLanding() {
  return (
    <div>
      {/* HERO */}
      <section className="relative bg-primary overflow-hidden">
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
              <p className="label-caps text-accent mb-8">Trademark Protection for Musicians & Artists</p>

              <h1 className="font-serif text-white text-5xl md:text-6xl leading-[1.1] tracking-tight mb-8">
                AI is cloning your voice.
                <br />
                <span className="italic text-accent">Your name is next.</span>
              </h1>

              <p className="text-base md:text-lg text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                Fake AI songs. Cloned vocals. Counterfeit merch. A trademark protects your name as a brand and
                helps against fake merch and impersonation. A cloned voice is a separate right. Attorneys
                usually file within 24 hours. Registration takes months.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  href="/free-search?audience=musician"
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
                Free name check&ensp;&middot;&ensp;Usually filed within 24 hours&ensp;&middot;&ensp;Licensed attorneys&ensp;&middot;&ensp;15+ years of experience
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* THE AI THREAT */}
      <section className="py-24 md:py-32 bg-[#F7F5F1]">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div {...fade} className="text-center mb-16">
            <p className="label-caps text-accent mb-5">What&apos;s changed</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-tight mb-5">
              The music industry&apos;s AI crisis
            </h2>
            <p className="text-gray-500 font-light max-w-xl mx-auto">
              What was science fiction two years ago is now a weekly reality for artists of all sizes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-10 gap-y-12">
            {[
              {
                tag: "Voice cloning",
                title: "Voice cloning",
                description:
                  "Anyone with a few minutes of your recordings can clone your voice. AI tools create \"new songs\" by you — for free — that you never made, never approved, and never got paid for.",
              },
              {
                tag: "Fake collaborations",
                title: "Fake AI collaborations",
                description:
                  "AI-generated duets and features with your voice appear online without your consent. A cloned voice is mainly a publicity right. A trademark helps when the listing uses your name as a brand.",
              },
              {
                tag: "Counterfeit merch",
                title: "Counterfeit merchandise",
                description:
                  "Fake merch using your name shows up in shops and online stores. A trademark in that country can help against copies that use the name as a brand. It does not cover your face or voice by itself.",
              },
              {
                tag: "Name theft",
                title: "Name and band name theft",
                description:
                  "Someone else can file your artist or band name as a brand in a country where you have not filed. Trademarks are territorial. Filing there claims the name as a brand. It does not mean you own the person.",
              },
            ].map((threat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="pt-6 border-t border-primary/15"
              >
                <p className="label-caps text-[0.65rem] text-accent mb-4">{threat.tag}</p>
                <h3 className="text-lg font-semibold text-primary mb-3">{threat.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{threat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DRAKE CASE CALLOUT */}
      <section className="py-20 md:py-24 bg-primary">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div {...fade} className="text-center">
            <p className="label-caps text-accent mb-8">The moment the industry noticed</p>
            <blockquote className="font-serif italic text-2xl md:text-3xl text-white leading-snug mb-8">
              &ldquo;When a fake AI Drake song went viral, it exposed something the industry had long ignored:
              any artist&apos;s voice can be replicated — and current law isn&apos;t equipped to stop it.&rdquo;
            </blockquote>
            <p className="text-white/50 font-light mb-8 leading-relaxed">
              A trademark doesn&apos;t solve every AI problem. But it gives you the legal standing to act —
              immediately, by licensed attorneys.
            </p>
            <div className="flex flex-col items-center gap-3">
              <Link
                href="/blog/ai-voice-cloning-drake-ip-battleground"
                className="inline-flex items-center gap-2 text-accent hover:brightness-110 font-semibold transition-all text-sm"
              >
                Read the full breakdown of the Drake AI case →
              </Link>
              <Link
                href="/blog/protect-voice-and-likeness-from-ai-deepfakes"
                className="inline-flex items-center gap-2 text-accent hover:brightness-110 font-semibold transition-all text-sm"
              >
                How voice and likeness rules work, including the ELVIS Act →
              </Link>
              <Link
                href="/blog/elvis-eminem-suno-ai-music-lawsuits"
                className="inline-flex items-center gap-2 text-accent hover:brightness-110 font-semibold transition-all text-sm"
              >
                Elvis and Eminem rightsholders sue Suno →
              </Link>
              <Link
                href="/blog/how-to-trademark-a-username-or-brand-name"
                className="inline-flex items-center gap-2 text-accent hover:brightness-110 font-semibold transition-all text-sm"
              >
                How to trademark a stage name or brand name →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT YOU CAN PROTECT */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div {...fade} className="text-center mb-16">
            <p className="label-caps text-accent mb-5">Your artistic identity</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-tight mb-5">
              What musicians can protect
            </h2>
            <p className="text-gray-500 font-light">Everything that makes up your artistic identity.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {[
              { tag: "Artist name", title: "Your artist name", desc: "Your stage name or the name you release music under — the most important thing to register." },
              { tag: "Band name", title: "Your band name", desc: "Band names are frequently copied, especially when touring internationally. Register before you go global." },
              { tag: "Label name", title: "Your label or imprint name", desc: "If you release music under your own label, that brand deserves protection too." },
              { tag: "Visual identity", title: "Your logo or visual identity", desc: "The artwork, logo, or visual signature associated with your music and merch." },
              { tag: "Signature phrase", title: "A signature phrase or lyric", desc: "A phrase strongly associated with you can be trademarked — think beyond just your name." },
              { tag: "Merch brand", title: "Your merchandise brand", desc: "Protect the brand on your merch so counterfeits can be legally removed from any marketplace." },
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
            <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-tight mb-5">
              How we protect you
            </h2>
            <p className="text-gray-500 font-light">No legal expertise needed. Just your artist name.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-x-10 gap-y-12 mb-16">
            {[
              {
                number: "01",
                title: "Free name check",
                description:
                  "We search trademark databases for your artist name, band name, or brand. Instant results, completely free.",
              },
              {
                number: "02",
                title: "We file in 24 hours",
                description:
                  "Our licensed attorneys handle the entire application. You focus on making music. We handle the legal side — done in 24 hours.",
              },
              {
                number: "03",
                title: "Filing date secured",
                description:
                  "We file in the countries you choose. Rights date from that filing. Registration typically takes months. The mark protects your name as a brand. A cloned voice is a separate publicity right.",
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
              href="/free-search?audience=musician"
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
                Priced per country.
                <br />
                <span className="italic text-accent">Per class.</span>
              </h2>
              <p className="text-white/50 font-light mb-10 leading-relaxed">
                There is no single monthly plan. Each filing is priced for one country and one class, with a
                separate published fee for each extra class.{" "}
                <Link href="/detailed-pricelist" className="text-accent underline underline-offset-2">
                  See the price list
                </Link>{" "}
                and the{" "}
                <Link href="/trademark-registration/united-states" className="text-accent underline underline-offset-2">
                  United States page
                </Link>
                , which lists $1,010 USD for one class and $499 USD for each extra class. That page also offers
                instalments — a split of the same filing fee, not a subscription.
              </p>
              <Link
                href="/free-search?audience=musician"
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-primary bg-accent hover:brightness-105 rounded-full transition-all duration-300"
              >
                Start your free name check
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <ul className="space-y-4">
                {[
                  "Free trademark search",
                  "Licensed attorney review",
                  "Filing, usually within 24 hours",
                  "Coverage in the countries you choose",
                  "Music & entertainment-specific classification",
                  "1 year of monitoring included",
                  "Alerts if someone files a similar name",
                  "AI content takedown support",
                  "Counterfeit merch removal support",
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

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div {...fade} className="text-center mb-14">
            <p className="label-caps text-accent mb-5">Common questions</p>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-primary">
              Questions musicians ask us
            </h2>
          </motion.div>

          <PublishedFaq
            items={[
              {
                question: "Can I trademark my artist name or stage name?",
                answer:
                  "Yes, if the name identifies your music, merch, or other services as a brand. A trademark protects that name in the classes you file. It does not mean you own the word in general, and it does not own your voice.",
              },
              {
                question: "What can I do about AI songs that use my voice?",
                answer:
                  "A cloned voice is mainly a publicity and copyright question, plus whatever the platform's rules allow. A trademark helps when the track or the listing uses your name as a brand. It does not make every AI song trademark infringement, and platforms are not required to remove one just because you ask.",
              },
              {
                question: "Can I trademark a band name?",
                answer:
                  "Yes, if the band name functions as a brand for music, entertainment, or merchandise. Each class is its own filing. Touring in another country does not extend a registration there.",
              },
              {
                question: "What if another artist already has my name?",
                answer:
                  "Our free search will tell you immediately. If there's a conflict, our attorneys will advise on the options: different geographic territories, different goods and services categories, or a formal opposition if the existing registration is weak. Many conflicts are more manageable than they appear.",
              },
              {
                question: "Do I need to register in every country I tour in?",
                answer:
                  "A trademark covers the country where it is filed. You do not have to file everywhere at once. Start with your home country and the markets that matter for your music. Pricing is per country and per class. The United States page offers instalments on that filing fee.",
              },
              {
                question: "How much does it cost?",
                answer:
                  "It depends on the country and the number of classes. The United States page lists $1,010 USD for one class and $499 USD for each extra class, and it offers instalments on that fee. Other countries are on the price list. The name check is free.",
              },
            ]}
          />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 md:py-32 bg-[#F7F5F1]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-primary rounded-3xl px-8 py-16 md:px-16 md:py-20 text-center">
              <p className="label-caps text-accent mb-6">Your legacy is at stake</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white tracking-tight leading-tight mb-6 max-w-2xl mx-auto">
                Your music is your legacy. <span className="italic text-accent">Don&apos;t let AI rewrite it.</span>
              </h2>
              <p className="text-white/50 font-light max-w-xl mx-auto mb-10 leading-relaxed">
                Start with a free name check. 60 seconds. No credit card. Find out if your artist name is
                already at risk.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <Link
                  href="/free-search?audience=musician"
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
                No credit card required&ensp;&middot;&ensp;Usually filed within 24 hours&ensp;&middot;&ensp;15+ years of experience
              </p>
              <p className="text-xs text-white/40 mt-4">General information, not legal advice.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

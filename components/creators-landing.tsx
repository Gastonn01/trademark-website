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
                Deepfake ads. Fake sponsorships. Impersonation accounts. A trademark is your name as a brand —
                the document platforms ask for. It is not ownership of your face or voice. Attorneys usually
                file within 24 hours. Registration takes months.
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
                Free name check&ensp;&middot;&ensp;Usually filed within 24 hours&ensp;&middot;&ensp;Licensed attorneys&ensp;&middot;&ensp;15+ years of experience
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
              merchandise, courses, communities — a trademark protects that name as a brand. It does not own your face or voice.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-10 gap-y-12">
            {[
              {
                tag: "AI deepfakes",
                title: "AI deepfake ads",
                description:
                  "Someone generates a video of you promoting a product you've never heard of. A trademark helps when it uses your name as a brand. Your face and voice are separate publicity rights.",
              },
              {
                tag: "Impersonation",
                title: "Fake accounts & impersonation",
                description:
                  "Copycat accounts use your name and likeness to sell products or run scams. A trademark can help a platform act when the account uses your name as a brand. It does not cover every country, and it does not remove every lookalike.",
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
                  "We search trademark databases for your name or handle. Find out instantly if it is already claimed — or at risk.",
              },
              {
                number: "02",
                title: "We file in 24 hours",
                description:
                  "Tell us what to protect and where. Our licensed attorneys handle every part of the application. No forms, no legal knowledge needed.",
              },
              {
                number: "03",
                title: "Filing date secured",
                description:
                  "We file in the countries you choose. Rights date from that filing. Registration typically takes months. The mark helps platforms act when your name is used as a brand. It does not own your face or voice.",
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
                  "Free trademark search",
                  "Licensed attorney review",
                  "Filing, usually within 24 hours",
                  "Coverage in the countries you choose",
                  "Creator-specific goods & services classification",
                  "1 year of monitoring included",
                  "Alerts if someone files something similar",
                  "Platform takedown support (Instagram, TikTok, YouTube)",
                  "Office action support if issues arise",
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
          <div className="mt-12 pt-8 border-t border-primary/15">
            <p className="label-caps text-[0.65rem] text-accent mb-3">Guides</p>
            <h3 className="text-lg font-semibold text-primary mb-3">Read the full guides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog/how-creators-protect-name-brand-and-likeness" className="text-accent font-semibold hover:underline">
                  How creators protect a name, brand, and likeness →
                </Link>
              </li>
              <li>
                <Link href="/blog/how-to-trademark-a-username-or-brand-name" className="text-accent font-semibold hover:underline">
                  How to trademark a username or brand name →
                </Link>
              </li>
              <li>
                <Link href="/blog/protect-voice-and-likeness-from-ai-deepfakes" className="text-accent font-semibold hover:underline">
                  Protecting your voice and likeness from AI deepfakes →
                </Link>
              </li>
            </ul>
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

          <PublishedFaq
            items={[
              {
                question: "Can I trademark my @handle or username?",
                answer:
                  "A handle is an account the platform controls. The word in that handle can be filed as a trademark if it identifies goods or services you actually offer. Owning the @ does not own the trademark, and a trademark does not control every lookalike account.",
              },
              {
                question: "What if AI is already using my face or voice?",
                answer:
                  "A trademark helps when the misuse uses your name as a brand or implies you endorse a product. Your face and voice are mainly publicity and likeness rights, which are separate, plus whatever the platform's rules allow. A filing can help platforms act. It does not own your face or voice, and it is not an instant takedown of every deepfake.",
              },
              {
                question: "Do I need to be a big creator to need this?",
                answer:
                  "No. Filing earlier can matter because rights date from the filing date, and registration typically takes months. It is easier to file a name that is still available than to fight over it later.",
              },
              {
                question: "Can I trademark a catchphrase or sign-off?",
                answer:
                  "Yes — if it's distinctive and used as a brand. Phrases that your audience recognises as yours are stronger candidates. Generic phrases (\"Have a great day!\") typically aren't registrable.",
              },
              {
                question: "Which countries should I register in?",
                answer:
                  "Start where your audience and brand deals are. A filing covers that country only. Pricing is per country and per class on the price list. The United States page offers instalments on that country's filing fee.",
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

"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Check your name",
      description: "Verify your name or brand is available across every jurisdiction that matters to you. Free, in seconds.",
    },
    {
      number: "02",
      title: "Attorneys file it",
      description: "Licensed trademark attorneys prepare and file your application — usually within 24 hours.",
    },
    {
      number: "03",
      title: "We monitor",
      description: "Track your application in real time while we watch for conflicts and AI misuse of your identity.",
    },
    {
      number: "04",
      title: "You own it",
      description: "Your name is registered. You now hold the legal power to remove fakes, copycats and counterfeits.",
    },
  ]

  return (
    <section className="py-24 md:py-32 bg-[#F7F5F1]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="label-caps text-accent mb-5">The process</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-tight">
              Four steps. Then it&apos;s yours.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12 mb-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="pt-6 border-t border-primary/15"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
              >
                <div className="font-serif italic text-2xl text-accent mb-4">{step.number}</div>
                <h3 className="text-lg font-semibold text-primary mb-3">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link
              href="/free-search"
              className="inline-flex items-center justify-center px-10 py-4 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-full transition-all duration-300"
            >
              Start with the free search
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"

export function WhyChooseUsSection() {
  const benefits = [
    {
      stat: "24/7 monitoring",
      title: "AI identity monitoring",
      description:
        "We watch for AI-generated content using your name, face, or voice — and give you the legal tools to demand immediate takedowns.",
    },
    {
      stat: "NIL ready",
      title: "NIL protection for athletes",
      description:
        "College and pro athletes: lock in your Name, Image & Likeness rights before someone else does. Every deal you sign depends on it.",
    },
    {
      stat: "Anti-deepfake",
      title: "Voice & likeness defense",
      description:
        "AI voice cloning and deepfakes are exploding. A trademark helps when your name is used as a brand. It does not own your face or voice — publicity rights are separate.",
    },
    {
      stat: "Worldwide",
      title: "Global coverage",
      description:
        "File your name, catchphrase, or brand in the countries you choose, with one process managed by licensed attorneys.",
    },
    {
      stat: "Usually 24 hours",
      title: "24-hour filing",
      description:
        "Licensed attorneys usually file within 24 hours. Every day you wait is a day someone else can file the name first.",
    },
  ]

  return (
    <section className="py-24 md:py-32 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="max-w-2xl mb-16 md:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="label-caps text-accent mb-5">Why Just Protected</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white tracking-tight leading-tight mb-6">
              Built for the creator generation.
            </h2>
            <p className="text-white/50 font-light leading-relaxed">
              The old trademark system was built for corporations. We built this for athletes,
              influencers, musicians — anyone whose name is their brand.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="pt-6 border-t border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.6 }}
              >
                <p className="label-caps text-[0.65rem] text-accent mb-4">{benefit.stat}</p>
                <h3 className="text-lg font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

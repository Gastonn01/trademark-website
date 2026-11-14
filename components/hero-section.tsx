"use client"

import { motion } from "framer-motion"
import { NameCheckPrompt } from "@/components/name-check-prompt"

export function HeroSection() {
  return (
    <div className="relative bg-primary overflow-hidden">
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-32 lg:py-40 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center flex flex-col"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="label-caps text-accent mb-4 md:mb-8 order-1">
              Athletes&ensp;&middot;&ensp;Creators&ensp;&middot;&ensp;Musicians
            </p>

            <h1 className="order-2 font-serif text-white text-[1.875rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] md:leading-[1.08] tracking-tight mb-4 md:mb-8">
              AI is using your name.
              <br />
              <span className="italic text-accent">Time to fight back.</span>
            </h1>

            <div className="order-3 md:order-4 max-w-xl mx-auto mb-5 md:mb-0 w-full">
              <NameCheckPrompt variant="hero" id="name-check-hero" />
            </div>

            <p className="order-4 md:order-3 text-sm md:text-lg text-white/60 mb-0 md:mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Deepfakes. Voice cloning. Fake sponsorships. Licensed attorneys usually file
              within 24 hours. That filing claims your name as a brand — not your face or
              voice. Registration still takes months.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-start justify-center gap-x-20 gap-y-8 pt-10 md:pt-14 mt-10 md:mt-16 border-t border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            {[
              { label: "Coverage", value: "Worldwide" },
              { label: "Years of experience", value: "15+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center min-w-[8rem]">
                <div className="font-serif text-3xl md:text-4xl text-white mb-2">{stat.value}</div>
                <div className="label-caps text-[0.65rem] text-white/40">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

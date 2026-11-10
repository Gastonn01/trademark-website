"use client"

import { ArrowRight, Search } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="relative bg-primary overflow-hidden">
      <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="label-caps text-accent mb-8">
              Athletes&ensp;&middot;&ensp;Creators&ensp;&middot;&ensp;Musicians
            </p>

            <h1 className="font-serif text-white text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight mb-8">
              AI is using your name.
              <br />
              <span className="italic text-accent">Time to fight back.</span>
            </h1>

            <p className="text-base md:text-lg text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Deepfakes. Voice cloning. Fake sponsorships. Licensed attorneys usually file
              within 24 hours. That filing claims your name as a brand — not your face or
              voice. Registration still takes months.
            </p>

            <div className="max-w-xl mx-auto mb-6">
              <div className="bg-white rounded-full shadow-2xl p-1.5 flex flex-col sm:flex-row gap-1.5">
                <div className="flex-1 flex items-center px-5 py-3">
                  <Search className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Your name or brand"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        window.dispatchEvent(new CustomEvent("jp:instant-check", { detail: searchTerm }))
                      }
                    }}
                    className="flex-1 bg-transparent border-none outline-none text-primary placeholder:text-gray-400 min-w-0"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("jp:instant-check", { detail: searchTerm }))
                  }}
                  className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold text-primary bg-accent hover:brightness-105 rounded-full transition-all duration-300 whitespace-nowrap"
                >
                  Check your name
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
              <p className="text-white/40 text-xs mt-4 tracking-wide">
                Free search&ensp;&middot;&ensp;No credit card&ensp;&middot;&ensp;Results in seconds
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-start justify-center gap-x-20 gap-y-8 pt-14 mt-16 border-t border-white/10"
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

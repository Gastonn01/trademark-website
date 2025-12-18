"use client"

import Link from "next/link"
import { ArrowRight, Shield, CheckCircle2, Search } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/abstract-legal-pattern.png')] opacity-5 bg-cover bg-center" />

      <div className="container mx-auto px-4 py-20 md:py-28 lg:py-36 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 mb-8">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">Trusted by 10,000+ Businesses Worldwide</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Protect Your Brand.
              <br />
              <span className="text-accent">Secure Your Future.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Expert trademark registration in 70+ countries. Filed within 24 hours by licensed attorneys with a 95%
              success rate.
            </p>

            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-white rounded-lg shadow-2xl p-2 flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded-md">
                  <Search className="h-5 w-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Search your trademark name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400"
                  />
                </div>
                <Link
                  href={`/free-search${searchTerm ? `?q=${encodeURIComponent(searchTerm)}` : ""}`}
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-accent hover:bg-accent/90 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                  Check Availability
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <p className="text-gray-300 text-sm mt-3">
                Free trademark search • No credit card required • Results in seconds
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
              {["Licensed Attorneys", "24-Hour Filing", "95% Success Rate", "Money-Back Guarantee"].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {[
              { label: "Countries Covered", value: "70+" },
              { label: "Trademarks Filed", value: "10,000+" },
              { label: "Success Rate", value: "95%" },
              { label: "Years Experience", value: "15+" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

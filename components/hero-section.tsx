"use client"

import Link from "next/link"
import { CheckCircle, Globe, Shield } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <>
      {/* 
        Updated gradient colors:
        - from-blue-800: #1e40af (darker blue for top)
        - to-blue-700: #1d4ed8 (lighter blue for bottom)
      */}
      <div className="bg-gradient-to-b from-blue-800 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Trademark Registration Made Effortless
            </motion.h1>

            <motion.p
              className="text-lg mb-12 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              We handle everything — from search to filing — so you can focus on building your brand, not filling out
              forms.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-6 max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {["70+ Countries", "24-Hour Filing", "Expert Handling", "Transparent Pricing"].map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-3 w-[200px]"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                >
                  <CheckCircle className="h-5 w-5 text-blue-300 flex-shrink-0" />
                  <span className="text-center">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Start Free Search Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <Link
                href="/free-search"
                className="inline-block px-8 py-4 text-base font-semibold text-blue-700 bg-white rounded-md shadow-lg hover:bg-blue-50 transition-colors duration-300"
              >
                Start My Registration
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Services Section - Distinct and Standing Out */}
      <div className="bg-white py-8 shadow-lg relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Trademark Registration Service */}
              <Link href="/free-search" className="block h-full">
                <motion.div
                  className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 flex items-center cursor-pointer h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-blue-600 text-white p-4 rounded-full mr-5 flex-shrink-0">
                    <Shield className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-blue-700 mb-1">Trademark Registration</h3>
                    <p className="text-gray-600 mb-2">Secure your brand identity legally</p>
                    <p className="text-blue-600 font-bold">Starting from $299</p>
                  </div>
                </motion.div>
              </Link>

              {/* Worldwide Monitoring Service - Coming Soon */}
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 shadow-md transition-all duration-300 flex items-center h-full relative opacity-90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  Coming Soon
                </div>
                <div className="bg-blue-600 text-white p-4 rounded-full mr-5 flex-shrink-0">
                  <Globe className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-700 mb-1">Worldwide Trademark Monitoring</h3>
                  <p className="text-gray-600 mb-2">Official trademark offices and web domains</p>
                  <p className="text-blue-600 font-bold inline-flex items-center">Starting from €10/month</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

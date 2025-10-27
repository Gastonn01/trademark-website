"use client"

import { Shield, DollarSign } from "lucide-react"
import { motion } from "framer-motion"

export function TrustBanner() {
  return (
    <motion.section
      className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-y border-blue-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Transparent Pricing */}
            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="bg-blue-600 text-white p-3 rounded-lg flex-shrink-0">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-700 mb-2">Flat fees. No hidden extras.</h3>
                <p className="text-gray-700">
                  What you see is what you pay — always. No surprise charges, no unclear government fees.
                </p>
              </div>
            </motion.div>

            {/* Communication Promise */}
            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="bg-blue-600 text-white p-3 rounded-lg flex-shrink-0">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-700 mb-2">Always in the loop</h3>
                <p className="text-gray-700">
                  Clear updates at every stage — no guessing, no waiting. We keep you informed from search to filing.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

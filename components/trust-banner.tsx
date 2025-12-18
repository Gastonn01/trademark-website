"use client"

import { Building2, Award, Users, Globe2 } from "lucide-react"
import { motion } from "framer-motion"

export function TrustBanner() {
  const trustItems = [
    { icon: Building2, text: "Registered Law Firm" },
    { icon: Award, text: "15+ Years" },
    { icon: Users, text: "Expert Team" },
    { icon: Globe2, text: "Global Coverage" },
  ]

  return (
    <motion.section
      className="py-16 bg-white border-b border-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {trustItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                  <item.icon className="h-6 w-6 text-accent" />
                </div>
                <p className="text-sm text-gray-600 font-light">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

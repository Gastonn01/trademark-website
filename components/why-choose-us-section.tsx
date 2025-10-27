"use client"

import { Shield, Globe, Clock, DollarSign, Users, Zap } from "lucide-react"
import { motion } from "framer-motion"

export function WhyChooseUsSection() {
  const reasons = [
    {
      title: "Global Reach + Speed",
      description:
        "File your trademark in over 70 countries. Most applications prepared and filed within 24 hours by qualified professionals.",
      icon: Globe,
    },
    {
      title: "Always Informed",
      description:
        "You'll receive clear updates at every stage. Our team keeps you in the loop from search to official filing.",
      icon: Clock,
    },
    {
      title: "Transparent Pricing",
      description: "Flat fees with no hidden extras. What you see is what you pay — always.",
      icon: DollarSign,
    },
    {
      title: "Expert Handling",
      description:
        "Qualified professionals handle your application from start to finish. Focus on your brand, not paperwork.",
      icon: Users,
    },
    { title: "AI-Powered Analysis", description: "Advanced algorithms for higher approval rates", icon: Zap },
    { title: "Post-Registration Support", description: "Ongoing protection and renewal management", icon: Shield },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Your Brand is Safe With Us</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Transparent pricing, expert handling, and constant updates — everything designed to give you total
            confidence in protecting your name.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <reason.icon className="h-12 w-12 mb-4 text-blue-700" />
              <h3 className="text-xl font-semibold mb-2 text-blue-700">{reason.title}</h3>
              <p className="text-gray-700">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

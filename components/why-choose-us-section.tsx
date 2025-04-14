"use client"

import { Shield, Globe, Clock, DollarSign, Users, Zap } from "lucide-react"
import { motion } from "framer-motion"

export function WhyChooseUsSection() {
  const reasons = [
    { title: "Global Network", description: "Access to legal experts in over 180 countries", icon: Globe },
    {
      title: "Industry Specialization",
      description: "Tailored solutions for your specific business sector",
      icon: Users,
    },
    { title: "Transparent Reporting", description: "Real-time dashboard to track application status", icon: Clock },
    {
      title: "Flexible Payment Options",
      description: "Installment plans and multi-country discounts available",
      icon: DollarSign,
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
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Beyond The Process</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            While our streamlined process ensures efficiency, here's what makes our service truly exceptional
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
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

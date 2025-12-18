"use client"

import Link from "next/link"
import { Search, FileText, Eye, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

export function ProcessSection() {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Free Trademark Search",
      description: "Verify your brand's availability across multiple jurisdictions instantly.",
    },
    {
      number: "02",
      icon: FileText,
      title: "Expert Application",
      description: "Our legal team prepares and files your application with precision.",
    },
    {
      number: "03",
      icon: Eye,
      title: "Monitoring",
      description: "Track your application status and receive real-time updates.",
    },
    {
      number: "04",
      icon: CheckCircle2,
      title: "Protection Secured",
      description: "Your trademark is registered and protected across selected territories.",
    },
  ]

  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 via-white to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-6">How It Works</h2>
            <p className="text-lg text-gray-600 font-light">
              A streamlined process designed for efficiency and clarity
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="h-full p-6 rounded-lg border border-gray-100 bg-white hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                <div className="mb-6">
                  <div className="text-6xl font-serif font-light text-gray-100 group-hover:text-accent/20 transition-colors duration-300 mb-6">
                    {step.number}
                  </div>
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                    <step.icon className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <h3 className="text-xl font-serif font-normal text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed font-light">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link
            href="/free-search"
            className="inline-flex items-center justify-center px-10 py-4 text-base font-medium text-white bg-accent hover:bg-accent/90 transition-colors duration-300"
          >
            Begin Your Application
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

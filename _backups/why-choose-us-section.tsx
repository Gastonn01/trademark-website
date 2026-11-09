"use client"

import { Shield, Clock, DollarSign, Users, Globe2, Award } from "lucide-react"
import { motion } from "framer-motion"

export function WhyChooseUsSection() {
  const benefits = [
    {
      icon: Globe2,
      title: "Global Coverage",
      description:
        "Register your trademark in over 70 countries with a single streamlined application process managed by experienced attorneys.",
      stat: "70+ Countries",
    },
    {
      icon: Clock,
      title: "24-Hour Filing",
      description:
        "Most applications filed within 24 hours. Our licensed trademark attorneys work around the clock to protect your brand immediately.",
      stat: "Same-Day Service",
    },
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description:
        "Clear, upfront fees with no hidden charges. What you see is what you pay—guaranteed. No surprises, ever.",
      stat: "Fixed Fees",
    },
    {
      icon: Users,
      title: "Expert Legal Team",
      description:
        "Dedicated licensed attorneys and trademark specialists handle every aspect of your application with proven expertise.",
      stat: "15+ Years Exp",
    },
    {
      icon: Shield,
      title: "Comprehensive Protection",
      description:
        "Full trademark registration services plus ongoing monitoring to catch potential infringements before they become problems.",
      stat: "Full Protection",
    },
    {
      icon: Award,
      title: "Proven Success",
      description:
        "95% approval rate backed by thousands of satisfied clients. Join businesses who trust us to protect their most valuable assets.",
      stat: "95% Success",
    },
  ]

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
              Why Leading Brands Choose Us
            </h2>
            <p className="text-lg text-gray-600">
              Professional trademark services backed by legal expertise, transparency, and proven results
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="group bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl hover:border-accent/50 transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <benefit.icon className="h-7 w-7 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-sm font-bold text-accent px-3 py-1 bg-accent/10 rounded-full">
                  {benefit.stat}
                </span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

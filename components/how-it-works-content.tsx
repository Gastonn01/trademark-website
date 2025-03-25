"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, FileCheck, Shield, Clock } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function HowItWorksContent() {
  return (
    <div className="container mx-auto px-4 py-16 relative">
      {/* Background decorative elements */}
      <div className="absolute top-40 left-10 w-24 h-24 bg-blue-400 rounded-full opacity-10 blur-2xl"></div>
      <div className="absolute bottom-40 right-10 w-32 h-32 bg-teal-400 rounded-full opacity-10 blur-2xl"></div>

      <div className="max-w-4xl mx-auto">
        {/* Hero section with statistics */}
        <motion.h1
          className="text-4xl font-bold mb-6 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How It Works
        </motion.h1>
        <motion.p
          className="text-xl text-center mb-8 text-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Register your trademark in 4 simple steps
        </motion.p>

        {/* Statistics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-white mb-1">100%</div>
            <div className="text-blue-100 text-sm">Dedicated Service</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-white mb-1">10+</div>
            <div className="text-blue-100 text-sm">Legal Experts</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-white mb-1">50+</div>
            <div className="text-blue-100 text-sm">Countries Covered</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-white mb-1">24h</div>
            <div className="text-blue-100 text-sm">Response Time</div>
          </div>
        </motion.div>

        {/* Interactive selector */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-white text-lg font-medium mb-4">What type of trademark are you looking to register?</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="bg-white/20 hover:bg-white/30 transition-colors rounded-md p-3 text-center cursor-pointer">
              <div className="text-white text-sm">Brand Name</div>
            </div>
            <div className="bg-white/20 hover:bg-white/30 transition-colors rounded-md p-3 text-center cursor-pointer">
              <div className="text-white text-sm">Logo</div>
            </div>
            <div className="bg-white/20 hover:bg-white/30 transition-colors rounded-md p-3 text-center cursor-pointer">
              <div className="text-white text-sm">Slogan</div>
            </div>
            <div className="bg-white/20 hover:bg-white/30 transition-colors rounded-md p-3 text-center cursor-pointer">
              <div className="text-white text-sm">Sound</div>
            </div>
            <div className="bg-white/20 hover:bg-white/30 transition-colors rounded-md p-3 text-center cursor-pointer">
              <div className="text-white text-sm">Product Design</div>
            </div>
            <div className="bg-white/20 hover:bg-white/30 transition-colors rounded-md p-3 text-center cursor-pointer">
              <div className="text-white text-sm">Other</div>
            </div>
          </div>
        </motion.div>

        <h2 className="text-2xl font-bold text-center text-white mb-8">Our 4-Step Process</h2>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6 border-blue-200 bg-white/95 backdrop-blur shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Search className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-blue-900">1. Free Search</h2>
                  <p className="text-gray-600 mb-4">
                    Our attorneys will conduct a preliminary search to assess the registrability of your trademark. This
                    helps identify potential conflicts early in the process.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="font-medium text-blue-800">What you get:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                      <li>Comprehensive trademark search</li>
                      <li>Legal assessment report</li>
                      <li>Registration strategy recommendation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-6 border-blue-200 bg-white/95 backdrop-blur shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <FileCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-blue-900">2. Application Filing</h2>
                  <p className="text-gray-600 mb-4">
                    Our team prepares and files your trademark application with all necessary documentation. We ensure
                    everything is done correctly to minimize the risk of rejection.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="font-medium text-blue-800">What you get:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                      <li>Professional application preparation</li>
                      <li>Class selection assistance</li>
                      <li>Documentation handling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6 border-blue-200 bg-white/95 backdrop-blur shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-blue-900">3. Application Processing</h2>
                  <p className="text-gray-600 mb-4">
                    We monitor your application throughout the process and handle any office actions or objections that
                    may arise. Our team keeps you updated on the progress.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="font-medium text-blue-800">What you get:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                      <li>Progress tracking</li>
                      <li>Office action responses</li>
                      <li>Regular status updates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="p-6 border-blue-200 bg-white/95 backdrop-blur shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-blue-900">4. Registration & Protection</h2>
                  <p className="text-gray-600 mb-4">
                    Once your trademark is registered, we provide ongoing support to help you maintain and protect your
                    intellectual property rights.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="font-medium text-blue-800">What you get:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                      <li>Registration certificate</li>
                      <li>Monitoring services</li>
                      <li>Renewal reminders</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Client testimonial */}
        <motion.div
          className="mt-12 mb-12 bg-white/10 backdrop-blur-sm rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
            <div>
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-.181h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <blockquote className="text-white italic mb-2">
                "The process was incredibly smooth. Within 6 months, our trademark was registered in both the US and EU
                markets. Their team handled everything professionally and kept us informed every step of the way."
              </blockquote>
              <div className="text-blue-100 font-medium">John Doe, CEO of TechStartup Inc.</div>
            </div>
          </div>
        </motion.div>

        {/* FAQ section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h3 className="text-2xl font-bold text-center text-white mb-6">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">How long does the trademark registration process take?</h4>
              <p className="text-blue-100">
                The timeline varies by country, but typically ranges from 6-18 months. We'll provide you with specific
                estimates based on your filing locations.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">What happens if my trademark application is rejected?</h4>
              <p className="text-blue-100">
                Our team will analyze the reasons for rejection and develop a strategy to address them, which may
                include filing a response, modifying your application, or appealing the decision.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Can I trademark my business name in multiple countries?</h4>
              <p className="text-blue-100">
                Yes, we offer international trademark registration services and can help you protect your brand in
                multiple jurisdictions through individual filings or international systems like the Madrid Protocol.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Ready to protect your brand?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:from-blue-600 hover:to-teal-500 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/verification">Start with free search</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 text-blue-100 text-sm">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>Expert legal support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


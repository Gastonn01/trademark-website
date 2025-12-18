"use client"

import { Card } from "@/components/ui/card"
import { Search, FileCheck, Shield, Clock } from "lucide-react"
import Link from "next/link"

export function HowItWorksContent() {
  return (
    <div className="container mx-auto px-4 py-16 relative">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center bg-gradient-to-b from-gray-50 to-white py-6 rounded-2xl text-gray-900 shadow-sm">
          How It Works
        </h1>
        <p className="text-2xl text-center mb-16 text-gray-600 font-light">Register your trademark in 4 simple steps</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 hover:from-accent hover:to-accent/90 transition-all duration-300 rounded-2xl p-6 text-center cursor-pointer group shadow-lg hover:shadow-xl hover:-translate-y-1">
            <div className="text-4xl font-bold text-white mb-2">100%</div>
            <div className="text-gray-300 group-hover:text-white text-sm transition-colors">Dedicated Service</div>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 hover:from-accent hover:to-accent/90 transition-all duration-300 rounded-2xl p-6 text-center cursor-pointer group shadow-lg hover:shadow-xl hover:-translate-y-1">
            <div className="text-4xl font-bold text-white mb-2">10+</div>
            <div className="text-gray-300 group-hover:text-white text-sm transition-colors">Legal Experts</div>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 hover:from-accent hover:to-accent/90 transition-all duration-300 rounded-2xl p-6 text-center cursor-pointer group shadow-lg hover:shadow-xl hover:-translate-y-1">
            <div className="text-4xl font-bold text-white mb-2">50+</div>
            <div className="text-gray-300 group-hover:text-white text-sm transition-colors">Countries Covered</div>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 hover:from-accent hover:to-accent/90 transition-all duration-300 rounded-2xl p-6 text-center cursor-pointer group shadow-lg hover:shadow-xl hover:-translate-y-1">
            <div className="text-4xl font-bold text-white mb-2">24h</div>
            <div className="text-gray-300 group-hover:text-white text-sm transition-colors">Response Time</div>
          </div>
        </div>

        <div className="bg-gradient-to-b from-accent/5 to-white rounded-lg p-6 mb-12">
          <h3 className="text-gray-900 text-lg font-medium mb-4">
            What type of trademark are you looking to register?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="bg-white hover:bg-accent/5 hover:border-accent transition-all rounded-md p-3 text-center cursor-pointer border-2 border-gray-200">
              <div className="text-gray-900 text-sm">Brand Name</div>
            </div>
            <div className="bg-white hover:bg-accent/5 hover:border-accent transition-all rounded-md p-3 text-center cursor-pointer border-2 border-gray-200">
              <div className="text-gray-900 text-sm">Logo</div>
            </div>
            <div className="bg-white hover:bg-accent/5 hover:border-accent transition-all rounded-md p-3 text-center cursor-pointer border-2 border-gray-200">
              <div className="text-gray-900 text-sm">Slogan</div>
            </div>
            <div className="bg-white hover:bg-accent/5 hover:border-accent transition-all rounded-md p-3 text-center cursor-pointer border-2 border-gray-200">
              <div className="text-gray-900 text-sm">Sound</div>
            </div>
            <div className="bg-white hover:bg-accent/5 hover:border-accent transition-all rounded-md p-3 text-center cursor-pointer border-2 border-gray-200">
              <div className="text-gray-900 text-sm">Product Design</div>
            </div>
            <div className="bg-white hover:bg-accent/5 hover:border-accent transition-all rounded-md p-3 text-center cursor-pointer border-2 border-gray-200">
              <div className="text-gray-900 text-sm">Other</div>
            </div>
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">Our 4-Step Process</h2>

        <div className="space-y-10">
          <div>
            <Card className="p-8 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-accent">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Search className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-900">1. Free Search</h2>
                  <p className="text-gray-600 mb-4">
                    Our attorneys will conduct a preliminary search to assess the registrability of your trademark. This
                    helps identify potential conflicts early in the process.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="font-medium text-gray-900">What you get:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                      <li>Comprehensive trademark search</li>
                      <li>Legal assessment report</li>
                      <li>Registration strategy recommendation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-8 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-accent">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <FileCheck className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-900">2. Application Filing</h2>
                  <p className="text-gray-600 mb-4">
                    Our team prepares and files your trademark application with all necessary documentation. We ensure
                    everything is done correctly to minimize the risk of rejection.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="font-medium text-gray-900">What you get:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                      <li>Professional application preparation</li>
                      <li>Class selection assistance</li>
                      <li>Documentation handling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-8 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-accent">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-900">3. Application Processing</h2>
                  <p className="text-gray-600 mb-4">
                    We monitor your application throughout the process and handle any office actions or objections that
                    may arise. Our team keeps you updated on the progress.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="font-medium text-gray-900">What you get:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                      <li>Progress tracking</li>
                      <li>Office action responses</li>
                      <li>Regular status updates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-8 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-accent">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-900">4. Registration & Protection</h2>
                  <p className="text-gray-600 mb-4">
                    Once your trademark is registered, we provide ongoing support to help you maintain and protect your
                    intellectual property rights.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="font-medium text-gray-900">What you get:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                      <li>Registration certificate</li>
                      <li>Monitoring services</li>
                      <li>Renewal reminders</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-16 mb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
            <div>
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <blockquote className="text-white italic mb-2">
                "The process was incredibly smooth. Within 6 months, our trademark was registered in both the US and EU
                markets. Their team handled everything professionally and kept us informed every step of the way."
              </blockquote>
              <div className="text-gray-300 font-medium">Alexander Schmidt, CEO of GlobalTech Solutions</div>
            </div>
          </div>
        </div>

        <div className="mb-12 bg-gradient-to-b from-white to-accent/5 p-8 rounded-lg">
          <h3 className="font-serif text-2xl font-bold text-center text-gray-900 mb-6">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg p-4">
              <h4 className="text-gray-900 font-medium mb-2">How long does the trademark registration process take?</h4>
              <p className="text-gray-700">
                The timeline varies by country, but typically ranges from 6-18 months. We'll provide you with specific
                estimates based on your filing locations.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <h4 className="text-gray-900 font-medium mb-2">What happens if my trademark application is rejected?</h4>
              <p className="text-gray-700">
                Our team will analyze the reasons for rejection and develop a strategy to address them, which may
                include filing a response, modifying your application, or appealing the decision.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <h4 className="text-gray-900 font-medium mb-2">
                Can I trademark my business name in multiple countries?
              </h4>
              <p className="text-gray-700">
                Yes, we offer international trademark registration services and can help you protect your brand in
                multiple jurisdictions through individual filings or international systems like the Madrid Protocol.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-16">
            Ready to protect your brand?
          </h2>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link
              href="/detailed-pricelist#top"
              className="bg-accent hover:bg-accent/90 text-white px-12 py-5 rounded-xl text-xl font-semibold flex items-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Start Registration <span className="ml-2">→</span>
            </Link>

            <Link
              href="/pricing"
              className="border-2 border-accent text-accent hover:bg-accent/10 px-12 py-5 rounded-xl text-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

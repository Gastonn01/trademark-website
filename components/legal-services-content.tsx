"use client"

import { Card } from "@/components/ui/card"
import { Shield, Scale, Globe, FileText, Target, Users } from "lucide-react"
import Link from "next/link"

export function LegalServicesContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 via-indigo-800 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Legal Services</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Protection, enforcement & support for your trademark worldwide
            </p>
            <p className="text-lg text-blue-200 max-w-3xl mx-auto">
              Even after your trademark is registered, situations arise where you need professional help — whether it's
              enforcing your rights, responding to challenges, or navigating legal requirements in specific countries.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-gray-700 leading-relaxed">
              We provide access to trusted trademark professionals and local partners who can support you wherever your
              brand is protected. Our goal is simple: give you the help you need to keep your trademark secure and
              enforceable, without complexity or uncertainty.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">What We Can Help With</h2>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <Card className="p-8 hover:shadow-xl transition-shadow border-t-4 border-blue-600">
              <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-blue-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Trademark Enforcement & Dispute Support</h3>
              <p className="text-gray-600 mb-6">
                If someone is using your trademark without permission — online, offline, or in another country — we can
                connect you with the right legal support to take action.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Unauthorized use investigations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Cease and desist letters</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Marketplace infringement takedowns</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Domain name disputes (UDRP, cybersquatting)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Negotiation support with infringing parties</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Coordinating local enforcement with attorneys</span>
                </li>
              </ul>
            </Card>

            {/* Service 2 */}
            <Card className="p-8 hover:shadow-xl transition-shadow border-t-4 border-indigo-600">
              <div className="bg-indigo-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <FileText className="w-7 h-7 text-indigo-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Office Actions & Oppositions</h3>
              <p className="text-gray-600 mb-6">
                Even well-prepared applications sometimes face challenges from trademark offices or other rights
                holders.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>Responses to trademark office objections</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>Submissions of additional documents or clarifications</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>Handling oppositions from third parties</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>Renewal-related compliance issues</span>
                </li>
              </ul>
              <p className="text-sm text-gray-500 mt-4 italic">
                Support is available whether you filed through us or elsewhere.
              </p>
            </Card>

            {/* Service 3 */}
            <Card className="p-8 hover:shadow-xl transition-shadow border-t-4 border-blue-600">
              <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-blue-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">International Legal Assistance</h3>
              <p className="text-gray-600 mb-6">
                Trademark laws differ widely by country, and working with the right local professionals is essential.
              </p>
              <ul className="space-y-2 text-gray-600 mb-4">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Countries where your trademark is already registered</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Countries where you plan to expand</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Countries where infringement may be occurring</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600 italic">
                You don't need to understand every country's system — we guide the process for you.
              </p>
            </Card>

            {/* Service 4 */}
            <Card className="p-8 hover:shadow-xl transition-shadow border-t-4 border-indigo-600">
              <div className="bg-indigo-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Scale className="w-7 h-7 text-indigo-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Trademark Portfolio Management</h3>
              <p className="text-gray-600 mb-6">
                As your brand grows, so does the need for organized trademark management.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>Tracking renewal deadlines</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>Monitoring for potential conflicts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>Evaluating brand expansions into new markets</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>Preparing filings for additional classes or countries</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>Maintaining consistent protection across your portfolio</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-4 font-medium">All in one place.</p>
            </Card>

            {/* Service 5 */}
            <Card className="p-8 hover:shadow-xl transition-shadow border-t-4 border-blue-600">
              <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-blue-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Brand Protection Strategy</h3>
              <p className="text-gray-600 mb-6">
                Whether you're a startup or an established business, protecting your brand long-term requires a clear
                strategy.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Identify the countries where trademark protection matters most</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Understand risks and opportunities for expansion</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Plan renewals and future filings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Assess threats related to counterfeits or copycats</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-4 italic">
                This turns trademark protection from reactive to strategic.
              </p>
            </Card>

            {/* Service 6 - Placeholder for visual balance */}
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-none flex flex-col justify-center items-center text-center">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">You Always Stay in Control</h3>
              <p className="text-gray-600">
                We help you understand your options and next steps at every stage of the process.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">How We Work</h2>
            <p className="text-xl text-gray-700 text-center mb-12">
              We focus on clarity, transparency, and support at every step:
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Tell us what's happening</h3>
                <p className="text-gray-600">Whether it's infringement, expansion, or a dispute.</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">We assess the situation</h3>
                <p className="text-gray-600">And outline your available options clearly.</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">We coordinate with legal partners</h3>
                <p className="text-gray-600">In the relevant jurisdictions if needed.</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  4
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">You choose the path forward</h3>
                <p className="text-gray-600">And we guide the process from start to finish.</p>
              </div>
            </div>

            <div className="mt-12 p-6 bg-blue-100 border-l-4 border-blue-600 rounded-r-lg">
              <p className="text-lg text-gray-800">
                <strong>No hidden commitments, no unexpected surprises</strong> — just clear support designed to protect
                your brand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to get help?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Whether you're dealing with an infringement issue or expanding internationally, we're here to support you.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Tell us about your situation →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

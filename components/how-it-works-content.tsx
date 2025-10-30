"use client"

import { Card } from "@/components/ui/card"
import {
  Search,
  FileCheck,
  Clock,
  Shield,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Globe,
  Award,
  CreditCard,
} from "lucide-react"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function HowItWorksContent() {
  return (
    <div className="container mx-auto px-4 py-12 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Simple, Fast, Affordable Trademark Registration
          </h1>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Expert-led trademark registration made easy. Our WTR-recognized attorneys handle everything for you—from
            free distinctiveness check to complete filing and 10-year protection.
          </p>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-blue-700 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">24h</div>
            <div className="text-blue-100 text-sm">Free Check Results</div>
          </div>
          <div className="bg-blue-700 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">10+</div>
            <div className="text-blue-100 text-sm">Legal Experts</div>
          </div>
          <div className="bg-blue-700 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">50+</div>
            <div className="text-blue-100 text-sm">Countries Covered</div>
          </div>
          <div className="bg-blue-700 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">10yr</div>
            <div className="text-blue-100 text-sm">Protection Period</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <Award className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">World-Class Attorneys in Every Country</h3>
              <p className="text-gray-700 mb-3">
                We work exclusively with top-tier trademark attorneys who are recognized by the World Trademark Review
                (WTR) and hold the highest credentials in their respective jurisdictions. Each country's filing is
                handled by local experts who understand the nuances of regional trademark law.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                  WTR Recognized
                </span>
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                  Local Expertise
                </span>
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                  Licensed Professionals
                </span>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-white mb-8">Our 4-Step Process</h2>

        <div className="space-y-6">
          {/* Step 1 */}
          <Card className="p-6 border-blue-200 bg-white shadow-xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-semibold text-blue-900">Step 1: Free Lawyer's Check</h2>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                    24h Results
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  Our experienced trademark attorneys conduct a comprehensive distinctiveness assessment of your mark.
                  We analyze whether your trademark is unique enough to be registered and identify potential conflicts
                  with existing marks.
                </p>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                  <p className="font-medium text-blue-800 mb-2">Why this step matters:</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Saves time and money by identifying issues before filing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Provides professional legal opinion on registrability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Identifies similar marks that could cause conflicts</span>
                    </li>
                  </ul>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq1" className="border-gray-200">
                    <AccordionTrigger className="text-sm font-medium text-gray-700 hover:text-blue-600">
                      What can happen during the free check?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600">
                      Our attorneys will assess if your mark is distinctive enough (not generic or descriptive), search
                      for identical or similar existing trademarks, and provide recommendations on whether to proceed,
                      modify your mark, or consider alternative strategies.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <Link
                href="/free-search"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Start Free Check
              </Link>
            </div>
          </Card>

          {/* Step 2 */}
          <Card className="p-6 border-blue-200 bg-white shadow-xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <FileCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2 text-blue-900">Step 2: Application Drafting & Filing</h2>
                <p className="text-gray-600 mb-4">
                  We handle everything for you. Our team prepares your application with meticulous attention to detail,
                  and our qualified attorneys review and file it directly with the trademark office. You don't need to
                  do anything—we take care of the entire process.
                </p>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                  <p className="font-medium text-blue-800 mb-2">What we do for you:</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>We prepare your complete application with all required documentation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Our attorneys review every detail for accuracy and compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>We file your application directly with the trademark office</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>We provide legal representation throughout the entire process</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>We ensure proper class selection and goods/services descriptions</span>
                    </li>
                  </ul>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq2" className="border-gray-200">
                    <AccordionTrigger className="text-sm font-medium text-gray-700 hover:text-blue-600">
                      Do I need to file the application myself?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600">
                      No, absolutely not. We handle the entire filing process for you. Our attorneys prepare, review,
                      and submit your application directly to the trademark office. We also act as your official
                      representative, handling all communications and responding to any office actions. You simply
                      provide us with the necessary information, and we take care of everything else.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </Card>

          {/* Step 3 */}
          <Card className="p-6 border-blue-200 bg-white shadow-xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-semibold text-blue-900">Step 3: IPO Examination</h2>
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">
                    3-12 months
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  The Intellectual Property Office examines your application to ensure it meets all legal requirements.
                  Throughout this process, we monitor your application and handle any communications or responses
                  needed.
                </p>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                  <p className="font-medium text-blue-800 mb-2">What happens during examination:</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Formal examination:</strong> Checking application completeness and fees
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Substantive examination:</strong> Assessing distinctiveness and conflicts
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Publication:</strong> Public notice period for oppositions (2-3 months)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Office actions:</strong> We handle any objections or requests for clarification
                      </span>
                    </li>
                  </ul>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq3" className="border-gray-200">
                    <AccordionTrigger className="text-sm font-medium text-gray-700 hover:text-blue-600">
                      What if there's an office action or opposition?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600">
                      Don't worry—we handle everything. Office actions are common and usually addressable. Our attorneys
                      will analyze any objections, develop a response strategy, and handle all communications with the
                      trademark office on your behalf. If someone opposes your application, we'll represent you
                      throughout the opposition proceedings. You don't need to take any action yourself.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </Card>

          {/* Step 4 */}
          <Card className="p-6 border-blue-200 bg-white shadow-xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2 text-blue-900">Step 4: 10-Year Validity & Protection</h2>
                <p className="text-gray-600 mb-4">
                  Once registered, your trademark is protected for 10 years and can be renewed indefinitely. You receive
                  an official registration certificate and gain exclusive rights to use your mark in commerce.
                </p>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                  <p className="font-medium text-blue-800 mb-2">Your ownership rights include:</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Exclusive right to use the mark for your goods/services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Legal grounds to prevent others from using similar marks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Ability to license or sell your trademark</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Official registration certificate for your records</span>
                    </li>
                  </ul>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="faq4" className="border-gray-200">
                    <AccordionTrigger className="text-sm font-medium text-gray-700 hover:text-blue-600">
                      What about renewal and maintenance?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600">
                      Your trademark must be renewed every 10 years to maintain protection. We provide renewal reminders
                      well in advance and can handle the renewal process for you. Between renewals, you should actively
                      use your mark and monitor for potential infringements.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-12 bg-white rounded-lg p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">Educational Resources & Tools</h3>
          <p className="text-center text-gray-600 mb-8">
            Access our comprehensive suite of tools and resources to help you understand trademark law and make informed
            decisions.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/blog"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
            >
              <BookOpen className="w-6 h-6 text-blue-600 mb-2" />
              <h4 className="font-semibold text-gray-900 mb-1">Trademark Academy</h4>
              <p className="text-sm text-gray-600">Learn the fundamentals of trademark law</p>
            </Link>

            <Link
              href="/blog"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
            >
              <BookOpen className="w-6 h-6 text-blue-600 mb-2" />
              <h4 className="font-semibold text-gray-900 mb-1">Trademark Dictionary</h4>
              <p className="text-sm text-gray-600">Understand legal terminology</p>
            </Link>

            <Link
              href="/blog"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
            >
              <Globe className="w-6 h-6 text-blue-600 mb-2" />
              <h4 className="font-semibold text-gray-900 mb-1">Country Guide</h4>
              <p className="text-sm text-gray-600">Country-specific requirements</p>
            </Link>

            <Link
              href="/blog"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
            >
              <FileCheck className="w-6 h-6 text-blue-600 mb-2" />
              <h4 className="font-semibold text-gray-900 mb-1">Class Assist</h4>
              <p className="text-sm text-gray-600">Find the right trademark classes</p>
            </Link>

            <Link
              href="/blog"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
            >
              <Search className="w-6 h-6 text-blue-600 mb-2" />
              <h4 className="font-semibold text-gray-900 mb-1">Specimen Guide</h4>
              <p className="text-sm text-gray-600">Prepare proper use specimens</p>
            </Link>

            <Link
              href="/blog"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
            >
              <BookOpen className="w-6 h-6 text-blue-600 mb-2" />
              <h4 className="font-semibold text-gray-900 mb-1">IP Case Database</h4>
              <p className="text-sm text-gray-600">Browse trademark case studies</p>
            </Link>
          </div>
        </div>

        <div className="mt-12 bg-blue-700 rounded-lg p-8">
          <h3 className="text-xl font-bold text-center text-white mb-6">Trusted Globally</h3>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <Globe className="w-8 h-8 text-blue-200 mx-auto mb-2" />
              <p className="text-white font-medium">UK Office</p>
              <p className="text-blue-200 text-sm">London</p>
            </div>
            <div className="text-center">
              <Globe className="w-8 h-8 text-blue-200 mx-auto mb-2" />
              <p className="text-white font-medium">US Office</p>
              <p className="text-blue-200 text-sm">New York</p>
            </div>
            <div className="text-center">
              <Globe className="w-8 h-8 text-blue-200 mx-auto mb-2" />
              <p className="text-white font-medium">EU Office</p>
              <p className="text-blue-200 text-sm">Brussels</p>
            </div>
            <div className="text-center">
              <Globe className="w-8 h-8 text-blue-200 mx-auto mb-2" />
              <p className="text-white font-medium">Australia Office</p>
              <p className="text-blue-200 text-sm">Sydney</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 pt-6 border-t border-blue-600">
            <div className="flex items-center gap-2 text-blue-100">
              <CreditCard className="w-5 h-5" />
              <span className="text-sm">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <Award className="w-5 h-5" />
              <span className="text-sm">Certified Attorneys</span>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Money-Back Guarantee</span>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to protect your brand?</h2>
          <p className="text-lg text-blue-100 mb-8">Start with a free lawyer's check today</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              href="/free-search"
              className="bg-yellow-400 text-blue-900 hover:bg-yellow-500 px-8 py-3 rounded-lg text-lg font-semibold flex items-center shadow-lg transition-colors"
            >
              Start Free Lawyer's Check <span className="ml-2">→</span>
            </Link>

            <Link
              href="/detailed-pricelist"
              className="border-2 border-white text-white hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              View Pricing
            </Link>

            <Link
              href="/about"
              className="border-2 border-white text-white hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

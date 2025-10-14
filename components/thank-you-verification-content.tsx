"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Mail, Phone, ArrowRight, FileText, Shield, Home, CreditCard } from "lucide-react"
import Link from "next/link"

export function ThankYouVerificationContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 shadow-lg">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Registration Complete!</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your trademark registration has been successfully submitted. Our team will begin processing your application
            immediately.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* What Happens Next */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center text-2xl text-gray-900">
                <Clock className="w-6 h-6 mr-3 text-blue-600" />
                What Happens Next?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Application Review</h4>
                    <p className="text-gray-600 text-sm">
                      Our trademark specialists will review your application for completeness and accuracy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Filing Preparation</h4>
                    <p className="text-gray-600 text-sm">
                      We'll prepare all necessary documentation and file with the relevant trademark offices.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Regular Updates</h4>
                    <p className="text-gray-600 text-sm">
                      You'll receive email updates at each stage of the registration process.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Registration Certificate</h4>
                    <p className="text-gray-600 text-sm">
                      Once approved, you'll receive your official trademark registration certificate.
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <span className="font-semibold text-green-800 block">Initial Review</span>
                    <span className="text-green-700 text-sm">Within 24-48 hours</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center text-2xl text-gray-900">
                <Mail className="w-6 h-6 mr-3 text-blue-600" />
                Need Assistance?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600">
                Our dedicated support team is here to help you throughout the entire registration process.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email Support</p>
                    <p className="text-blue-600 font-medium">trademarks@justprotected.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone Support</p>
                    <p className="text-gray-600 text-sm">Monday - Friday, 9 AM - 6 PM EST</p>
                  </div>
                </div>
              </div>

              {/* Payment Confirmation */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <span className="font-semibold text-green-800 block">Payment Confirmed</span>
                    <span className="text-green-700 text-sm">A receipt has been sent to your email</span>
                  </div>
                </div>
              </div>

              {/* Additional Resources */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Helpful Resources</h3>
                <div className="space-y-3">
                  <Link
                    href="/blog"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
                  >
                    <FileText className="w-4 h-4 mr-3" />
                    <span className="group-hover:underline">Trademark registration guides</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/services"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
                  >
                    <Shield className="w-4 h-4 mr-3" />
                    <span className="group-hover:underline">Additional protection services</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/how-it-works"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
                  >
                    <Clock className="w-4 h-4 mr-3" />
                    <span className="group-hover:underline">Understanding the process</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action Section */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Your Brand is Now Protected</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              We're processing your trademark registration across all selected jurisdictions. You'll receive detailed
              updates throughout the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/trademark-monitoring">
                  <Shield className="w-4 h-4 mr-2" />
                  Trademark Monitoring
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                <Link href="/services">
                  <FileText className="w-4 h-4 mr-2" />
                  Additional Services
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="text-white hover:bg-white/10">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Return Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© 2025 Just Protected. All rights reserved.</p>
          <p className="mt-1">
            Questions? Contact us at{" "}
            <a href="mailto:trademarks@justprotected.com" className="text-blue-600 hover:underline">
              trademarks@justprotected.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

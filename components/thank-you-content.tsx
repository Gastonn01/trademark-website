"use client"

import { useState, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, Mail, Phone } from "lucide-react"

export function ThankYouContent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="container max-w-4xl mx-auto px-4 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-xl text-gray-600">Your trademark search request has been successfully submitted.</p>
        </div>

        {/* What Happens Next */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-blue-600" />
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
                  <h3 className="font-semibold text-gray-900 mb-2">Professional Analysis</h3>
                  <p className="text-gray-600">
                    Our trademark experts will conduct a comprehensive search and analysis of your trademark across
                    multiple databases and jurisdictions.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Expert Review & Contact</h3>
                  <p className="text-gray-600">
                    Our team will get in touch with you shortly with your detailed trademark search results and
                    personalized recommendations for your next steps.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Need Immediate Assistance?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Mail className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Email Support</p>
                  <p className="text-gray-600">support@justprotected.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Phone Support</p>
                  <p className="text-gray-600">Available during business hours</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Why Choose Just Protected?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Expert Legal Team</h4>
                <p className="text-gray-600 text-sm">
                  Our experienced trademark attorneys and legal professionals ensure your brand gets the protection it
                  deserves.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Global Coverage</h4>
                <p className="text-gray-600 text-sm">
                  We help protect your trademark in over 180 countries worldwide, ensuring comprehensive brand
                  protection.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Fast & Reliable</h4>
                <p className="text-gray-600 text-sm">
                  Quick turnaround times and reliable service to get your trademark protection process started
                  efficiently.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Transparent Pricing</h4>
                <p className="text-gray-600 text-sm">
                  No hidden fees or surprise costs. Clear, upfront pricing for all our trademark services.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, Mail } from "lucide-react"

export function ThankYouContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Thank You for Your Submission!</CardTitle>
            <p className="text-lg text-gray-600">
              We've received your trademark search request and our team is already working on it.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Comprehensive Search</h3>
                  <p className="text-gray-600">
                    Our experts will conduct a thorough trademark search across all relevant databases and jurisdictions
                    you selected.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">Expert Analysis & Contact</h3>
                  <p className="text-gray-600">
                    Our team will get in touch with you shortly with a detailed analysis and recommendations for your
                    trademark registration.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-blue-900">What happens next?</h4>
              </div>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>You'll receive a confirmation email within the next few minutes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>Our team will contact you within 24 hours with your results</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                  <span>We'll provide personalized recommendations for your next steps</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <h4 className="font-semibold text-gray-900">Questions?</h4>
              </div>
              <p className="text-gray-600 mb-3">
                If you have any questions or need immediate assistance, don't hesitate to reach out to us.
              </p>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span> support@justprotected.com
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Phone:</span> +1 (555) 123-4567
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

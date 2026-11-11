"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"
import { useCurrency } from "@/hooks/use-currency"
import { formatPrice } from "@/lib/currency-converter"
import { Globe, Shield, Bell } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export function TrademarkMonitoringContent() {
  // Ensure page scrolls to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { currency } = useCurrency()

  const basicPlanPrices = { USD: 91, GBP: 68, EUR: 78 }
  const standardPlanPrices = { USD: 183, GBP: 137, EUR: 157 }
  const premiumPlanPrices = { USD: 366, GBP: 275, EUR: 314 }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - With Visual Elements */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-700 text-white relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-400 rounded-full opacity-20 translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 right-10 w-20 h-20 bg-amber-400 rounded-full opacity-20"></div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left side: Content */}
              <div>
                <h1 className="text-4xl font-bold mb-6">Trademark Monitoring Services</h1>
                <p className="text-xl mb-8">
                  Protect your brand from infringement with our global monitoring solution.
                </p>

                {/* Key benefits with icons */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                    <div className="bg-amber-500 p-2 rounded-full">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <p className="font-medium">Monitored worldwide</p>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                    <div className="bg-amber-500 p-2 rounded-full">
                      <Bell className="h-6 w-6 text-white" />
                    </div>
                    <p className="font-medium">Real-time infringement alerts</p>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                    <div className="bg-amber-500 p-2 rounded-full">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <p className="font-medium">Expert legal recommendations</p>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  asChild
                  className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-8 py-3 rounded-md text-lg"
                >
                  <Link href="#pricing">View Pricing Plans</Link>
                </Button>
              </div>

              {/* Right side: Image */}
              <div className="hidden md:block relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-blue-900/40 rounded-lg z-10"></div>
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="Trademark monitoring dashboard"
                  className="rounded-lg shadow-lg relative z-0"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-500 rounded-lg opacity-20 z-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works & Benefits Section - More Visual */}
      <div className="bg-white py-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-100 rounded-full opacity-50"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">How Our Monitoring Works</h2>

            {/* Process cards with images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Card 1 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
                <div className="h-48 bg-blue-600 relative">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Scanning process"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent flex items-end">
                    <h3 className="text-white text-xl font-bold p-4">1. Continuous Scanning</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600">
                    We monitor trademark databases and online platforms 24/7 for potential conflicts.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
                <div className="h-48 bg-amber-500 relative">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="AI detection"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 to-transparent flex items-end">
                    <h3 className="text-white text-xl font-bold p-4">2. Smart Detection</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600">
                    Our AI identifies potential infringements and similar marks with high accuracy.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
                <div className="h-48 bg-green-600 relative">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Alert system"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent flex items-end">
                    <h3 className="text-white text-xl font-bold p-4">3. Instant Alerts</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600">Receive immediate notifications with actionable recommendations.</p>
                </div>
              </div>
            </div>

            {/* Benefits section with visual elements */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full -translate-y-1/2 translate-x-1/3"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-200 rounded-full translate-y-1/3 -translate-x-1/4"></div>

              <h3 className="text-2xl font-bold text-blue-900 mb-8 text-center">Key Benefits</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Early Detection</h4>
                    <p className="text-sm text-gray-600">Identify issues before they damage your brand</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Check className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Protect Brand Value</h4>
                    <p className="text-sm text-gray-600">Safeguard your reputation and market position</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Check className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Reduce Legal Risks</h4>
                    <p className="text-sm text-gray-600">Minimize costly litigation with proactive monitoring</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Check className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Global Protection</h4>
                    <p className="text-sm text-gray-600">Ensure coverage across all relevant markets</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monitoring Plans Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Monitoring Plans</h2>
            <p className="text-lg text-gray-600">
              Choose the monitoring plan that best fits your business needs and trademark portfolio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <Card className="border-blue-100 overflow-hidden">
              <div className="bg-blue-50 p-6 text-center border-b border-blue-100">
                <h3 className="text-xl font-bold text-blue-900">Basic Monitoring</h3>
                <div className="mt-4 mb-2">
                  <span className="text-3xl font-bold text-blue-900">
                    {formatPrice(basicPlanPrices[currency], currency)}
                  </span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-600">Perfect for small businesses</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">1 trademark monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Core markets covered</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Monthly reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Email alerts</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">Select Plan</Button>
              </div>
            </Card>

            {/* Standard Plan */}
            <Card className="border-blue-400 overflow-hidden shadow-lg relative">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                POPULAR
              </div>
              <div className="bg-blue-600 p-6 text-center border-b border-blue-500">
                <h3 className="text-xl font-bold text-white">Standard Monitoring</h3>
                <div className="mt-4 mb-2">
                  <span className="text-3xl font-bold text-white">
                    {formatPrice(standardPlanPrices[currency], currency)}
                  </span>
                  <span className="text-blue-100">/month</span>
                </div>
                <p className="text-sm text-blue-100">Ideal for growing businesses</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">3 trademarks monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Expanded market coverage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Bi-weekly reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Email & SMS alerts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Social media monitoring</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">Select Plan</Button>
              </div>
            </Card>

            {/* Premium Plan */}
            <Card className="border-blue-100 overflow-hidden">
              <div className="bg-blue-50 p-6 text-center border-b border-blue-100">
                <h3 className="text-xl font-bold text-blue-900">Premium Monitoring</h3>
                <div className="mt-4 mb-2">
                  <span className="text-3xl font-bold text-blue-900">
                    {formatPrice(premiumPlanPrices[currency], currency)}
                  </span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-600">For established brands</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">10 trademarks monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Global coverage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Weekly reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Priority alerts (all channels)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Comprehensive online monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Dedicated account manager</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">Select Plan</Button>
              </div>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Need a custom monitoring solution for your enterprise?</p>
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
              Contact Us for Enterprise Solutions
            </Button>
          </div>
        </div>
      </div>

    </div>
  )
}

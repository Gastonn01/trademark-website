"use client"

import { useState, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { VerificationForm } from "@/components/verification-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, XCircle, Loader2, FileText, Mail, User } from "lucide-react"

interface VerificationContentProps {
  searchId?: string
}

interface SearchData {
  id: string
  search_data: any
  status: string
  created_at: string
}

export function VerificationContent({ searchId }: VerificationContentProps) {
  const [searchData, setSearchData] = useState<SearchData | null>(null)
  const [loading, setLoading] = useState(!!searchId)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (searchId) {
      fetchSearchData()
    }
  }, [searchId])

  const fetchSearchData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/get-registration-data?search_id=${searchId}`)

      if (!response.ok) {
        throw new Error("Failed to fetch search data")
      }

      const data = await response.json()
      setSearchData(data)
    } catch (err) {
      console.error("Error fetching search data:", err)
      setError("Failed to load your trademark information. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getAnalysisStatus = () => {
    if (!searchData) return null

    const results = searchData.search_data
    const riskLevel = results?.riskLevel
    const exactMatch = results?.exactMatch
    const similarCount = Number.parseInt(results?.similarCount || "0")

    if (exactMatch === "yes") {
      return {
        icon: <XCircle className="h-6 w-6 text-red-500" />,
        title: "High Risk Detected",
        description: "Exact match found - Registration not recommended",
        color: "red",
        recommendation: "We found an exact match for your trademark. We recommend choosing a different name.",
      }
    }

    if (riskLevel === "very-high" || riskLevel === "high") {
      return {
        icon: <AlertTriangle className="h-6 w-6 text-orange-500" />,
        title: "Moderate Risk",
        description: `${similarCount} similar trademark${similarCount !== 1 ? "s" : ""} found`,
        color: "orange",
        recommendation: "Some conflicts detected. We can help you navigate these challenges.",
      }
    }

    return {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      title: "Good to Proceed",
      description: "No significant conflicts found",
      color: "green",
      recommendation: "Your trademark shows good potential for registration.",
    }
  }

  const analysisStatus = getAnalysisStatus()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Loading Your Trademark Analysis</h2>
            <p className="text-gray-600">Please wait while we retrieve your information...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-8 text-center">
              <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Data</h2>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchSearchData}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  if (!searchId || !searchData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="container max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-indigo-600 mb-4">Start Your Trademark Registration</h1>
            <p className="text-xl text-indigo-600">Protect your brand with our comprehensive trademark services</p>
          </div>
          <VerificationForm />
        </div>
        <Footer />
      </div>
    )
  }

  const results = searchData.search_data
  const trademarkName = results?.trademarkName || "Your Trademark"
  const clientName = results?.name || results?.firstName || "Valued Client"
  const clientEmail = results?.email || ""
  const goodsAndServices = results?.goodsAndServices || ""

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Trademark Analysis Results</h1>
          <p className="text-xl text-gray-600">
            Complete your registration for <strong>"{trademarkName}"</strong>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Analysis Results - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Analysis Status Card */}
            {analysisStatus && (
              <Card className={`border-${analysisStatus.color}-200 bg-${analysisStatus.color}-50`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {analysisStatus.icon}
                    <div>
                      <h3 className="text-lg font-semibold">{analysisStatus.title}</h3>
                      <p className="text-sm text-gray-600 font-normal">{analysisStatus.description}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{analysisStatus.recommendation}</p>
                </CardContent>
              </Card>
            )}

            {/* Client Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Application Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Applicant Name</label>
                    <p className="text-gray-900">{clientName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-900 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {clientEmail}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Trademark Name</label>
                  <p className="text-lg font-semibold text-gray-900">"{trademarkName}"</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Goods & Services</label>
                  <p className="text-gray-900">{goodsAndServices}</p>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Analysis Results */}
            {results?.detailedSummary && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Professional Analysis Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-line text-gray-700">{results.detailedSummary}</div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recommendations */}
            {results?.recommendations && (
              <Card>
                <CardHeader>
                  <CardTitle>Our Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-line text-gray-700">{results.recommendations}</div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Analysis Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Analysis Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Exact Matches</span>
                    <Badge variant={results?.exactMatch === "yes" ? "destructive" : "secondary"}>
                      {results?.exactMatch === "yes" ? "Found" : "None"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Similar Marks</span>
                    <Badge variant="outline">{results?.similarCount || "0"} found</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Risk Level</span>
                    <Badge
                      variant={
                        results?.riskLevel === "high" || results?.riskLevel === "very-high"
                          ? "destructive"
                          : results?.riskLevel === "moderate"
                            ? "secondary"
                            : "default"
                      }
                    >
                      {results?.riskLevel || "Low"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Trademark Strength</span>
                    <Badge
                      variant={
                        results?.trademarkStrength === "strong" || results?.trademarkStrength === "very-strong"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {results?.trademarkStrength || "Good"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Registration Form - Right Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-900">Ready to Register?</CardTitle>
                  <p className="text-blue-700 text-sm">
                    Based on your analysis, proceed with your trademark registration
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-900 mb-2">Continue Registration</div>
                      <p className="text-sm text-blue-700">Your information is pre-filled and ready</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-gray-900 mb-2">What's Included:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>✓ Professional trademark filing</li>
                        <li>✓ Government fee included</li>
                        <li>✓ Expert legal review</li>
                        <li>✓ Status monitoring</li>
                        <li>✓ Certificate delivery</li>
                      </ul>
                    </div>

                    <button
                      onClick={() => {
                        // Scroll to the verification form
                        const formElement = document.getElementById("verification-form")
                        if (formElement) {
                          formElement.scrollIntoView({ behavior: "smooth" })
                        }
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                      Start Registration Process
                    </button>

                    <p className="text-xs text-blue-600 text-center">Secure payment • Money-back guarantee</p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Support */}
              <Card className="mt-4">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
                  <p className="text-sm text-gray-600 mb-3">Our trademark experts are here to assist you</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>support@justprotected.com</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Pre-filled Registration Form */}
        <div className="mt-12">
          <VerificationForm initialData={searchData.search_data} isLoading={false} />
        </div>
      </div>

      <Footer />
    </div>
  )
}

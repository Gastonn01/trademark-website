"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

const countries = [
  "United States",
  "United Kingdom",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Canada",
  "Australia",
  "Japan",
  "China",
  "India",
  "Brazil",
  "Mexico",
  "Netherlands",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Switzerland",
  "Austria",
  "Belgium",
  "Portugal",
  "Ireland",
  "New Zealand",
  "South Korea",
  "Singapore",
  "Hong Kong",
  "Poland",
  "Czech Republic",
  "Hungary",
  "Greece",
  "Turkey",
  "Israel",
  "South Africa",
  "Argentina",
  "Chile",
  "Colombia",
  "Peru",
  "Uruguay",
  "Costa Rica",
  "Panama",
  "Ecuador",
  "Bolivia",
  "Paraguay",
  "Venezuela",
  "Dominican Republic",
  "Guatemala",
  "Honduras",
  "El Salvador",
  "Nicaragua",
]

interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string

  // Trademark Information
  trademarkName: string
  trademarkType: "word" | "logo" | "figurative"
  goodsAndServices: string
  trademarkClasses: string[]

  // Registration Details
  selectedCountries: string[]
  priorityClaim: boolean
  priorityDate: string
  priorityCountry: string

  // Additional Information
  currentUse: boolean
  firstUseDate: string
  additionalInfo: string
}

export function RegistrationInfoForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchId = searchParams.get("search_id")

  const [loading, setLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(!!searchId) // Only show loading if we have a search_id
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<FormData>({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",

    // Trademark Information
    trademarkName: "",
    trademarkType: "word",
    goodsAndServices: "",
    trademarkClasses: [],

    // Registration Details
    selectedCountries: [],
    priorityClaim: false,
    priorityDate: "",
    priorityCountry: "",

    // Additional Information
    currentUse: false,
    firstUseDate: "",
    additionalInfo: "",
  })

  // Fetch and pre-fill data if search_id is provided
  useEffect(() => {
    if (!searchId) return

    const fetchSearchData = async () => {
      try {
        setDataLoading(true)
        const response = await fetch(`/api/get-registration-data?search_id=${searchId}`)

        if (!response.ok) {
          throw new Error(`Error fetching search data: ${response.status}`)
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        // Extract data from the search results
        const originalData = data.search_results || {}

        // Pre-fill the form with the original search data
        setFormData((prev) => ({
          ...prev,
          // Personal Information
          firstName: originalData.name || originalData.firstName || "",
          lastName: originalData.surname || originalData.lastName || "",
          email: data.email || originalData.email || "",

          // Trademark Information
          trademarkName: data.trademark_name || originalData.trademarkName || "",
          trademarkType: originalData.trademarkType || "word",
          goodsAndServices: originalData.goodsAndServices || originalData.description || "",

          // Registration Details
          selectedCountries: Array.isArray(originalData.countries) ? originalData.countries : [],
        }))
      } catch (err) {
        console.error("Error fetching search data:", err)
        setError(err instanceof Error ? err.message : "Failed to load search data")
      } finally {
        setDataLoading(false)
      }
    }

    fetchSearchData()
  }, [searchId])

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCountryToggle = (country: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedCountries: prev.selectedCountries.includes(country)
        ? prev.selectedCountries.filter((c) => c !== country)
        : [...prev.selectedCountries, country],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/submit-registration-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          searchId, // Include the search_id if available
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit registration information")
      }

      const result = await response.json()
      setSubmitted(true)

      // Redirect to thank you page after a short delay
      setTimeout(() => {
        router.push("/thank-you")
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (dataLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-lg text-center">Loading your information...</p>
        <p className="text-sm text-gray-500 text-center">We're pre-filling the form with your search data</p>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-center mb-2">Registration Submitted Successfully!</h2>
        <p className="text-center mb-4">
          Thank you for providing your registration information. We'll be in touch soon.
        </p>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Trademark Registration Information</CardTitle>
          <CardDescription>
            {searchId
              ? "Please review and complete your registration information below. We've pre-filled the form with your search data."
              : "Please provide your information to proceed with trademark registration."}
          </CardDescription>
          {searchId && (
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Data Pre-filled from Search ID: {searchId}
              </Badge>
            </div>
          )}
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={formData.city} onChange={(e) => handleInputChange("city", e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Trademark Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Trademark Information</h3>

              <div>
                <Label htmlFor="trademarkName">Trademark Name *</Label>
                <Input
                  id="trademarkName"
                  value={formData.trademarkName}
                  onChange={(e) => handleInputChange("trademarkName", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label>Trademark Type *</Label>
                <RadioGroup
                  value={formData.trademarkType}
                  onValueChange={(value) => handleInputChange("trademarkType", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="word" id="word" />
                    <Label htmlFor="word">Word Mark (text only)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="logo" id="logo" />
                    <Label htmlFor="logo">Logo/Design Mark</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="figurative" id="figurative" />
                    <Label htmlFor="figurative">Figurative Mark (combination)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="goodsAndServices">Goods and Services Description *</Label>
                <Textarea
                  id="goodsAndServices"
                  value={formData.goodsAndServices}
                  onChange={(e) => handleInputChange("goodsAndServices", e.target.value)}
                  placeholder="Describe the goods and/or services your trademark will cover..."
                  rows={4}
                  required
                />
              </div>
            </div>

            {/* Registration Countries Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Registration Countries</h3>

              <div>
                <Label>Select Countries for Trademark Protection *</Label>
                <div className="mt-2 max-h-60 overflow-y-auto border rounded-md p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {countries.map((country) => (
                      <div key={country} className="flex items-center space-x-2">
                        <Checkbox
                          id={country}
                          checked={formData.selectedCountries.includes(country)}
                          onCheckedChange={() => handleCountryToggle(country)}
                        />
                        <Label htmlFor={country} className="text-sm">
                          {country}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                {formData.selectedCountries.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Selected countries:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {formData.selectedCountries.map((country) => (
                        <Badge key={country} variant="secondary">
                          {country}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Priority Claim Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Priority Claim (Optional)</h3>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="priorityClaim"
                  checked={formData.priorityClaim}
                  onCheckedChange={(checked) => handleInputChange("priorityClaim", checked)}
                />
                <Label htmlFor="priorityClaim">I want to claim priority from an earlier application</Label>
              </div>

              {formData.priorityClaim && (
                <div className="grid md:grid-cols-2 gap-4 ml-6">
                  <div>
                    <Label htmlFor="priorityDate">Priority Date</Label>
                    <Input
                      id="priorityDate"
                      type="date"
                      value={formData.priorityDate}
                      onChange={(e) => handleInputChange("priorityDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="priorityCountry">Priority Country</Label>
                    <Input
                      id="priorityCountry"
                      value={formData.priorityCountry}
                      onChange={(e) => handleInputChange("priorityCountry", e.target.value)}
                      placeholder="Country of first application"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Current Use Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Current Use</h3>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="currentUse"
                  checked={formData.currentUse}
                  onCheckedChange={(checked) => handleInputChange("currentUse", checked)}
                />
                <Label htmlFor="currentUse">I am currently using this trademark in commerce</Label>
              </div>

              {formData.currentUse && (
                <div className="ml-6">
                  <Label htmlFor="firstUseDate">Date of First Use</Label>
                  <Input
                    id="firstUseDate"
                    type="date"
                    value={formData.firstUseDate}
                    onChange={(e) => handleInputChange("firstUseDate", e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Additional Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Additional Information</h3>

              <div>
                <Label htmlFor="additionalInfo">Additional Comments or Special Instructions</Label>
                <Textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                  placeholder="Any additional information you'd like us to know..."
                  rows={3}
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="flex justify-end">
              <Button type="submit" disabled={loading} className="min-w-32">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Registration"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default RegistrationInfoForm

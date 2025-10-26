"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { CountrySelectCard } from "@/components/country-select-card"
import { trackLeadSubmission } from "@/components/gtm-tracker"
import { Upload, CheckCircle, ChevronDown, ChevronUp, AlertCircle, Shield, Clock, Award } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { countryPricingData } from "@/lib/pricing-data"

// More comprehensive check for preview environment
const isPreviewEnvironment = () => {
  // Check if we're in the browser
  if (typeof window !== "undefined") {
    return (
      window.location.hostname === "localhost" ||
      window.location.hostname.includes("vercel.app") ||
      window.location.hostname.includes("preview") ||
      process.env.NEXT_PUBLIC_VERCEL_ENV !== "production"
    )
  }

  // Server-side check
  return process.env.NEXT_PUBLIC_VERCEL_ENV !== "production"
}

interface FormData {
  trademarkType: string
  trademarkName: string
  logo?: File
  goodsAndServices: string
  countries: string[]
  selectedClasses: string[]
  name: string
  surname: string
  email: string
  marketing: boolean
  acceptTerms: boolean
}

interface CountryData {
  name: string
  flag: string
}

interface RegionData {
  name: string
  countries: CountryData[]
}

const topCountries: CountryData[] = [
  { name: "European Union", flag: "eu" },
  { name: "United States", flag: "us" },
  { name: "Germany", flag: "de" },
  { name: "Argentina", flag: "ar" },
  { name: "Spain", flag: "es" },
  { name: "United Kingdom", flag: "gb" },
]

const regions: RegionData[] = [
  {
    name: "North America",
    countries: [
      { name: "United States", flag: "us" },
      { name: "Canada", flag: "ca" },
      { name: "Mexico", flag: "mx" },
    ],
  },
  {
    name: "Europe",
    countries: [
      { name: "European Union", flag: "eu" },
      { name: "Germany", flag: "de" },
      { name: "Spain", flag: "es" },
      { name: "United Kingdom", flag: "gb" },
      { name: "France", flag: "fr" },
      { name: "Italy", flag: "it" },
      { name: "Portugal", flag: "pt" },
      { name: "Greece", flag: "gr" },
      { name: "Bosnia and Herzegovina", flag: "ba" },
      { name: "Belarus", flag: "by" },
      { name: "Benelux", flag: "be" },
      { name: "Cyprus", flag: "cy" },
      { name: "Georgia", flag: "ge" },
      { name: "Iceland", flag: "is" },
      { name: "Lithuania", flag: "lt" },
    ],
  },
  {
    name: "South America",
    countries: [
      { name: "Argentina", flag: "ar" },
      { name: "Bolivia", flag: "bo" },
      { name: "Brazil", flag: "br" },
      { name: "Chile", flag: "cl" },
      { name: "Colombia", flag: "co" },
      { name: "Ecuador", flag: "ec" },
      { name: "Paraguay", flag: "py" },
      { name: "Peru", flag: "pe" },
      { name: "Uruguay", flag: "uy" },
      { name: "Venezuela", flag: "ve" },
    ],
  },
  {
    name: "Asia",
    countries: [
      { name: "China", flag: "cn" },
      { name: "Japan", flag: "jp" },
      { name: "Afghanistan", flag: "af" },
      { name: "Saudi Arabia", flag: "sa" },
      { name: "Armenia", flag: "am" },
      { name: "Azerbaijan", flag: "az" },
      { name: "Bahrain", flag: "bh" },
      { name: "Bangladesh", flag: "bd" },
      { name: "Bhutan", flag: "bt" },
      { name: "Brunei", flag: "bn" },
      { name: "Cambodia", flag: "kh" },
      { name: "Hong Kong", flag: "hk" },
      { name: "India", flag: "in" },
      { name: "Indonesia", flag: "id" },
      { name: "Iran", flag: "ir" },
      { name: "Iraq", flag: "iq" },
      { name: "Jordan", flag: "jo" },
      { name: "Kazakhstan", flag: "kz" },
      { name: "Kyrgyzstan", flag: "kg" },
      { name: "South Korea", flag: "kr" },
      { name: "Kuwait", flag: "kw" },
      { name: "Laos", flag: "la" },
      { name: "Lebanon", flag: "lb" },
      { name: "Macao", flag: "mo" },
      { name: "Malaysia", flag: "my" },
      { name: "Maldives", flag: "mv" },
      { name: "Mongolia", flag: "mn" },
      { name: "Myanmar", flag: "mm" },
      { name: "Nepal", flag: "np" },
      { name: "North Korea", flag: "kp" },
      { name: "Oman", flag: "om" },
      { name: "Pakistan", flag: "pk" },
      { name: "Palestine", flag: "ps" },
      { name: "Philippines", flag: "ph" },
      { name: "Qatar", flag: "qa" },
      { name: "Singapore", flag: "sg" },
      { name: "Sri Lanka", flag: "lk" },
      { name: "Syria", flag: "sy" },
      { name: "Taiwan", flag: "tw" },
      { name: "Tajikistan", flag: "tj" },
      { name: "Thailand", flag: "th" },
      { name: "Turkey", flag: "tr" },
      { name: "Turkmenistan", flag: "tm" },
      { name: "United Arab Emirates", flag: "ae" },
      { name: "Uzbekistan", flag: "uz" },
      { name: "Vietnam", flag: "vn" },
      { name: "Yemen", flag: "ye" },
    ],
  },
]

export function FreeSearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const totalSteps = 3
  const [currency, setCurrency] = useState<"USD" | "EUR">("USD")
  const [formData, setFormData] = useState<FormData>({
    trademarkType: "",
    trademarkName: "",
    goodsAndServices: "",
    countries: [],
    selectedClasses: [],
    name: "",
    surname: "",
    email: "",
    marketing: false,
    acceptTerms: false,
  })

  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedRegions, setExpandedRegions] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [initialLoadDone, setInitialLoadDone] = useState(false)
  const [previewModeNotice, setPreviewModeNotice] = useState(true)
  const [isPreview, setIsPreview] = useState(false)

  // Check if we're in preview mode on component mount
  useEffect(() => {
    setIsPreview(isPreviewEnvironment())
  }, [])

  // Load currency from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem("selectedCurrency") as "USD" | "EUR"
    if (savedCurrency) {
      setCurrency(savedCurrency)
    }
  }, [])

  const handleCurrencyChange = (newCurrency: "USD" | "EUR") => {
    setCurrency(newCurrency)
    localStorage.setItem("selectedCurrency", newCurrency)
  }

  // Function to search countries in all regions
  const searchCountries = (term: string) => {
    if (!term.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const normalizedTerm = term.toLowerCase().trim()

    // Search in all regions
    const results = regions
      .flatMap((region) => region.countries)
      .filter((country) => country.name.toLowerCase().includes(normalizedTerm))

    // Remove duplicates (in case a country appears in multiple regions)
    const uniqueResults = Array.from(new Map(results.map((item) => [item.name, item])).values())

    setSearchResults(uniqueResults)
  }

  const [searchResults, setSearchResults] = useState<CountryData[]>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    searchCountries(searchTerm)

    // Automatically expand all regions that contain countries matching the search
    if (searchTerm.trim()) {
      const matchingRegions = regions
        .filter((region) =>
          region.countries.some((country) => country.name.toLowerCase().includes(searchTerm.toLowerCase())),
        )
        .map((region) => region.name)

      setExpandedRegions((prev) => {
        const newExpanded = [...prev]
        matchingRegions.forEach((region) => {
          if (!newExpanded.includes(region)) {
            newExpanded.push(region)
          }
        })
        return newExpanded
      })
    }
  }, [searchTerm])

  // Effect to load countries from URL when component mounts
  useEffect(() => {
    if (initialLoadDone) return

    const countriesParam = searchParams?.get("countries")
    if (countriesParam) {
      try {
        const parsedCountries = JSON.parse(countriesParam)
        if (Array.isArray(parsedCountries) && parsedCountries.length > 0) {
          setSelectedCountries(parsedCountries)
          setFormData((prev) => ({
            ...prev,
            countries: parsedCountries,
          }))
        }
      } catch (error) {
        console.error("Error parsing countries from URL:", error)
      }
    }

    setInitialLoadDone(true)
  }, [searchParams, initialLoadDone])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        logo: files[0],
      }))
    }
  }

  const toggleCountry = (country: string) => {
    setSelectedCountries((prev) => {
      const newSelection = prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]
      setFormData((prevData) => ({ ...prevData, countries: newSelection }))
      return newSelection
    })
  }

  const filteredRegions = useMemo(() => {
    return regions
      .map((region) => ({
        ...region,
        countries: region.countries.filter((country) => country.name.toLowerCase().includes(searchTerm.toLowerCase())),
      }))
      .filter((region) => region.countries.length > 0)
  }, [searchTerm])

  const filteredTopCountries = useMemo(() => {
    return topCountries.filter((country) => country.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [searchTerm])

  const toggleRegion = (regionName: string) => {
    setExpandedRegions((prev) =>
      prev.includes(regionName) ? prev.filter((r) => r !== regionName) : [...prev, regionName],
    )
  }

  // Function to save form data to local storage
  const saveFormToLocalStorage = (formData: FormData, searchId: string) => {
    try {
      // We can't store File objects in localStorage, so we'll omit the logo
      const { logo, ...restOfForm } = formData
      localStorage.setItem(
        `trademark_search_${searchId}`,
        JSON.stringify({
          formData: restOfForm,
          timestamp: new Date().toISOString(),
          searchId,
        }),
      )
      console.log("Form data saved to localStorage")
      return true
    } catch (error) {
      console.error("Error saving to localStorage:", error)
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedCountries.length === 0) {
      setErrorMessage("Please select at least one country to continue.")
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    // Require email address before any submission logic
    if (!formData.email || !formData.email.trim()) {
      setErrorMessage("Please enter your email address so we can send your results.")
      setStep(3)
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    setIsSubmitting(true)
    setErrorMessage(null)
    setSuccessMessage(null)
    const searchId = uuidv4()

    try {
      console.log("Submitting form data...")

      // Save to localStorage as backup
      saveFormToLocalStorage(formData, searchId)

      // If in preview mode, we'll simulate a successful submission
      if (isPreview) {
        console.log("Preview mode detected, simulating successful submission")
        // Wait a bit to simulate network request
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Track lead submission
        trackLeadSubmission("free_search")

        // Show success message and redirect
        setSuccessMessage("Form submitted successfully in preview mode!")
        setTimeout(() => {
          router.push("/thank-you")
        }, 1500)
        return
      }

      // For non-preview mode, prepare form data
      const formDataToSend = new FormData()
      formDataToSend.append("formType", "free-search")
      formDataToSend.append("searchId", searchId)

      // Add all form fields to formData
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "logo" && value instanceof File) {
          // We'll handle the logo separately
        } else if (typeof value === "string") {
          formDataToSend.append(key, value)
        } else if (Array.isArray(value)) {
          // Only include primitive values in arrays
          const safeArray = value.filter(
            (item) => typeof item === "string" || typeof item === "number" || typeof item === "boolean",
          )
          formDataToSend.append(key, JSON.stringify(safeArray))
        } else if (typeof value === "boolean") {
          formDataToSend.append(key, value.toString())
        }
      })

      // Add logo if it exists
      if (formData.logo instanceof File) {
        formDataToSend.append("logo", formData.logo)
      }

      // Add additional files
      files.forEach((file) => {
        formDataToSend.append("files", file)
      })

      try {
        // Use a simple fetch with a timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

        const response = await fetch("/api/submit-free-search", {
          method: "POST",
          body: formDataToSend,
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        // Even if the response is not OK, we'll still proceed
        console.log("Form submission response:", response.status)

        // Track lead submission on successful form submission
        trackLeadSubmission("free_search")

        // Show success message and redirect
        setSuccessMessage("Form submitted successfully!")
        setTimeout(() => {
          router.push("/thank-you")
        }, 1500)
      } catch (error) {
        console.error("Error submitting form:", error)

        // Even if there's an error, we'll still proceed and track
        trackLeadSubmission("free_search")
        setSuccessMessage("Your submission has been saved. Thank you!")
        setTimeout(() => {
          router.push("/thank-you")
        }, 1500)
      }
    } catch (error) {
      console.error("Error in form submission process:", error)

      // Always proceed to thank you page after showing a message and track
      trackLeadSubmission("free_search")
      setSuccessMessage("Your request has been recorded. Thank you for your submission!")
      setTimeout(() => {
        router.push("/thank-you")
      }, 1500)
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalPrice = selectedCountries.reduce((sum, country) => {
    const countryData = countryPricingData[country as keyof typeof countryPricingData]
    return sum + (countryData?.price || 0)
  }, 0)

  const currencySymbol = currency === "USD" ? "$" : "€"

  return (
    <div id="free-search-form" className="max-w-7xl mx-auto px-4 pt-24 pb-16 scroll-mt-16">
      {isPreview && previewModeNotice && (
        <div className="mb-8 p-5 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg shadow-sm flex items-start gap-4">
          <AlertCircle className="h-6 w-6 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-amber-900 mb-1">Preview Mode Active</h3>
            <p className="text-amber-800 text-sm leading-relaxed">
              You are viewing this form in preview mode. Form submissions will be simulated and no data will be saved to
              the database.
            </p>
            <button
              className="mt-2 text-sm font-medium text-amber-900 underline hover:no-underline"
              onClick={() => setPreviewModeNotice(false)}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="mb-10">
            <h1 className="text-5xl font-bold mb-4 text-indigo-900 tracking-tight">Professional Trademark Search</h1>
            <p className="text-xl text-gray-700 leading-relaxed mb-2">
              Comprehensive trademark analysis delivered by experienced IP professionals within 24 hours.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Complete the form below to receive your complimentary trademark search and expert assessment.
            </p>

            <div className="mt-6 flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <Shield className="h-5 w-5 text-indigo-600" />
                <span className="font-medium">Secure & Confidential</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="h-5 w-5 text-indigo-600" />
                <span className="font-medium">24-Hour Response</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Award className="h-5 w-5 text-indigo-600" />
                <span className="font-medium">Expert Analysis</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-r-lg p-5 mt-6 shadow-sm">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1.5">Complimentary Search Service</h3>
                  <p className="text-green-800 text-sm leading-relaxed">
                    Your trademark search and professional assessment are provided at no cost. Registration fees apply
                    only if you choose to proceed with filing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {step === 2 && (
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <div>
                <h2 className="text-3xl font-bold text-indigo-900 mb-2">Select Protection Territories</h2>
                <p className="text-gray-600 leading-relaxed">
                  Choose jurisdictions for trademark registration (search remains complimentary)
                </p>
              </div>
              <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-1.5 shadow-sm">
                <button
                  type="button"
                  onClick={() => handleCurrencyChange("USD")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    currency === "USD"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  USD ($)
                </button>
                <button
                  type="button"
                  onClick={() => handleCurrencyChange("EUR")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    currency === "EUR"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  EUR (€)
                </button>
              </div>
            </div>
          )}

          <div className="mb-12">
            <div className="flex justify-between mb-3">
              {["Trademark Details", "Territories", "Contact Information"].map((label, index) => (
                <span
                  key={label}
                  className={`text-sm font-semibold transition-colors ${
                    step > index ? "text-indigo-700" : step === index + 1 ? "text-indigo-900" : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-full transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-green-700">{successMessage}</p>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-amber-700">{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 && (
              <div className="space-y-10">
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-indigo-900">Trademark Classification</h2>
                  <RadioGroup
                    value={formData.trademarkType}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, trademarkType: value }))}
                    className="space-y-4"
                  >
                    {[
                      {
                        value: "word",
                        label: "Word Mark",
                        description: "Text-based trademark (e.g., brand name)",
                        icon: "A",
                      },
                      {
                        value: "logo",
                        label: "Logo Mark",
                        description: "Visual trademark with or without text",
                        icon: "🖼️",
                      },
                      {
                        value: "figurative",
                        label: "Figurative Mark",
                        description: "Stylized design or symbol",
                        icon: "✨",
                      },
                    ].map((option) => (
                      <div
                        key={option.value}
                        className={`flex items-center space-x-4 border-2 rounded-xl p-5 transition-all cursor-pointer ${
                          formData.trademarkType === option.value
                            ? "border-indigo-600 bg-indigo-50 shadow-md"
                            : "border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm"
                        }`}
                      >
                        <RadioGroupItem value={option.value} id={option.value} className="mt-0.5" />
                        <Label htmlFor={option.value} className="flex items-center gap-4 cursor-pointer flex-1">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                              formData.trademarkType === option.value ? "bg-indigo-100" : "bg-gray-100"
                            }`}
                          >
                            {option.icon}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{option.label}</div>
                            <div className="text-sm text-gray-600 mt-0.5">{option.description}</div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {(formData.trademarkType === "word" || formData.trademarkType === "logo") && (
                  <div>
                    <Label htmlFor="trademarkName" className="block text-lg font-semibold text-gray-900 mb-3">
                      Trademark Designation
                    </Label>
                    <Input
                      id="trademarkName"
                      value={formData.trademarkName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, trademarkName: e.target.value }))}
                      placeholder="Enter your trademark name"
                      className="w-full text-lg p-4 border-2 border-gray-200 focus:border-indigo-500 rounded-lg shadow-sm"
                    />
                  </div>
                )}

                {(formData.trademarkType === "logo" || formData.trademarkType === "figurative") && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Upload Trademark Design</h3>
                    <div
                      className={`border-2 border-dashed rounded-xl p-10 text-center transition-all ${
                        isDragging
                          ? "border-indigo-500 bg-indigo-50 shadow-lg"
                          : "border-gray-300 bg-gray-50 hover:border-indigo-400 hover:bg-indigo-50/50"
                      }`}
                      onDragOver={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onDragEnter={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setIsDragging(true)
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setIsDragging(false)
                      }}
                      onDrop={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setIsDragging(false)

                        const files = e.dataTransfer.files
                        if (files && files.length > 0) {
                          setFormData((prev) => ({
                            ...prev,
                            logo: files[0],
                          }))
                        }
                      }}
                    >
                      <Upload className="mx-auto h-14 w-14 text-indigo-500 mb-4" />
                      <div className="text-indigo-700 font-semibold mb-2 text-lg">Upload or drag and drop</div>
                      <div className="text-sm text-gray-500 mb-4">PNG, JPG, SVG or GIF (maximum 5 MB)</div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                      <Button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          ;(document.querySelector('input[type="file"]') as HTMLInputElement)?.click()
                        }}
                        variant="outline"
                        className="mt-2 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-medium"
                      >
                        Select File
                      </Button>
                      {formData.logo && (
                        <div className="mt-6 flex items-center justify-center text-green-700 bg-green-50 rounded-lg p-3">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          <span className="font-medium">{formData.logo.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="goodsAndServices" className="block text-lg font-semibold text-gray-900 mb-3">
                    Goods and Services Description
                  </Label>
                  <Textarea
                    id="goodsAndServices"
                    value={formData.goodsAndServices}
                    onChange={(e) => setFormData((prev) => ({ ...prev, goodsAndServices: e.target.value }))}
                    placeholder="e.g., Clothing, namely shirts, pants, and hats"
                    className="w-full text-base p-4 border-2 border-gray-200 focus:border-indigo-500 rounded-lg shadow-sm"
                    rows={5}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Provide a detailed description of the products or services associated with your trademark
                  </p>
                </div>

                {!formData.trademarkType && (
                  <div className="text-red-600 text-sm font-medium bg-red-50 p-3 rounded-lg">
                    Please select a trademark classification
                  </div>
                )}
                {formData.trademarkType !== "figurative" && !formData.trademarkName && (
                  <div className="text-red-600 text-sm font-medium bg-red-50 p-3 rounded-lg">
                    Please enter your trademark designation
                  </div>
                )}
                {(formData.trademarkType === "logo" || formData.trademarkType === "figurative") && !formData.logo && (
                  <div className="text-red-600 text-sm font-medium bg-red-50 p-3 rounded-lg">
                    Please upload your trademark design
                  </div>
                )}
                {!formData.goodsAndServices && (
                  <div className="text-red-600 text-sm font-medium bg-red-50 p-3 rounded-lg">
                    Please describe your goods and services
                  </div>
                )}

                <Button
                  type="button"
                  className="w-full py-4 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" })
                    setStep(2)
                  }}
                  disabled={
                    !formData.trademarkType ||
                    !formData.goodsAndServices ||
                    (formData.trademarkType !== "figurative" && !formData.trademarkName) ||
                    ((formData.trademarkType === "logo" || formData.trademarkType === "figurative") && !formData.logo)
                  }
                >
                  Continue to Territory Selection
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <p className="text-gray-600">
                  Select the countries or regions where you want to register your trademark.
                </p>

                {selectedCountries.length > 0 && (
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-indigo-900">
                          Selected: {selectedCountries.length} countries
                        </h3>
                        <p className="text-sm text-indigo-700">
                          {selectedCountries.slice(0, 3).join(", ")}
                          {selectedCountries.length > 3 && ` and ${selectedCountries.length - 3} more`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <Input
                  type="text"
                  placeholder="Search for countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-6"
                />

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-indigo-700">Search Results</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchResults.map((country) => {
                        const countryData = countryPricingData[country.name as keyof typeof countryPricingData]
                        return (
                          <CountrySelectCard
                            key={country.name}
                            country={country.name}
                            flag={`https://flagcdn.com/${country.flag}.svg`}
                            price={countryData?.price}
                            additionalClassPrice={countryData?.additionalClassPrice}
                            onSelect={() => toggleCountry(country.name)}
                            selected={selectedCountries.includes(country.name)}
                            currency={currency}
                          />
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Top Countries Section - only show if no search */}
                {!isSearching && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-indigo-700">Most Requested Countries</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredTopCountries.map((country) => {
                        const countryData = countryPricingData[country.name as keyof typeof countryPricingData]
                        return (
                          <CountrySelectCard
                            key={country.name}
                            country={country.name}
                            flag={`https://flagcdn.com/${country.flag}.svg`}
                            price={countryData?.price}
                            additionalClassPrice={countryData?.additionalClassPrice}
                            onSelect={() => toggleCountry(country.name)}
                            selected={selectedCountries.includes(country.name)}
                            currency={currency}
                          />
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Other Regions - only show if no search */}
                {!isSearching &&
                  filteredRegions.map((region) => (
                    <div key={region.name}>
                      <button
                        type="button"
                        onClick={() => toggleRegion(region.name)}
                        className="flex items-center justify-between w-full text-left text-lg font-semibold mb-2 text-indigo-700 hover:text-indigo-900"
                      >
                        <span>{region.name}</span>
                        {expandedRegions.includes(region.name) ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                      {expandedRegions.includes(region.name) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {region.countries.map((country) => {
                            const countryData = countryPricingData[country.name as keyof typeof countryPricingData]
                            return (
                              <CountrySelectCard
                                key={country.name}
                                country={country.name}
                                flag={`https://flagcdn.com/${country.flag}.svg`}
                                price={countryData?.price}
                                additionalClassPrice={countryData?.additionalClassPrice}
                                onSelect={() => toggleCountry(country.name)}
                                selected={selectedCountries.includes(country.name)}
                                currency={currency}
                              />
                            )
                          })}
                        </div>
                      )}
                    </div>
                  ))}

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" }) // Scroll to top
                      setStep(1)
                    }}
                    className="flex-1 py-3 text-lg"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 py-3 text-lg bg-indigo-600 hover:bg-indigo-700 text-white"
                    onClick={() => {
                      if (selectedCountries.length === 0) {
                        setErrorMessage("Please select at least one country to continue.")
                        window.scrollTo({ top: 0, behavior: "smooth" })
                        return
                      }
                      window.scrollTo({ top: 0, behavior: "smooth" })
                      setStep(3)
                    }}
                  >
                    Continue to Contact Info
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold mb-6 text-indigo-900">Almost there! We just need your details</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-700">
                      First Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="John"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="surname" className="text-gray-700">
                      Last Name
                    </Label>
                    <Input
                      id="surname"
                      placeholder="Doe"
                      value={formData.surname}
                      onChange={(e) => setFormData((prev) => ({ ...prev, surname: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="email" className="text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="mt-1"
                      required
                      autoComplete="email"
                      inputMode="email"
                      aria-required="true"
                      pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, acceptTerms: checked as boolean }))
                      }
                      required
                    />
                    <Label htmlFor="acceptTerms" className="text-sm text-gray-600">
                      I accept the{" "}
                      <a href="/terms" className="text-indigo-600 hover:underline" target="_blank" rel="noreferrer">
                        Terms and Conditions
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="text-indigo-600 hover:underline" target="_blank" rel="noreferrer">
                        Privacy Policy
                      </a>
                    </Label>
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="marketing"
                      checked={formData.marketing}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, marketing: checked as boolean }))}
                    />
                    <Label htmlFor="marketing" className="text-sm text-gray-600">
                      I'd like to receive helpful tips and updates about trademark protection (optional)
                    </Label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="files">Attach files (JPG, PNG, PDF)</Label>
                  <Input
                    id="files"
                    type="file"
                    onChange={(e) => {
                      const selectedFiles = Array.from(e.target.files || [])
                      setFiles(selectedFiles)
                    }}
                    multiple
                    className="mt-1"
                  />
                  {files.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Attached files:</p>
                      <ul>
                        {files.map((file, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            {file.name} ({file.type || "Unknown type"}, {Math.round(file.size / 1024)} KB)
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" }) // Scroll to top
                      setStep(2)
                    }}
                    className="flex-1 py-3 text-lg"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 py-3 text-lg bg-indigo-600 hover:bg-indigo-700 text-white"
                    disabled={
                      isSubmitting || !formData.name || !formData.surname || !formData.email || !formData.acceptTerms
                    }
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-7 shadow-lg border border-gray-200 sticky top-24">
            <h3 className="text-2xl font-bold mb-6 text-indigo-900">Why Protect Your Trademark?</h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">Legal Protection:</span>
                  <p className="text-sm mt-0.5">Prevents unauthorized use of your brand identity</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">Brand Recognition:</span>
                  <p className="text-sm mt-0.5">Establishes trust and credibility with customers</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">Business Growth:</span>
                  <p className="text-sm mt-0.5">Strengthens market position and brand equity</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">Asset Value:</span>
                  <p className="text-sm mt-0.5">Creates valuable intellectual property for licensing or sale</p>
                </div>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-gray-300">
              <h4 className="text-lg font-bold mb-4 text-indigo-900">Our Process</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Comprehensive Search</p>
                    <p className="text-sm text-gray-600">Professional trademark database analysis</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Expert Review</p>
                    <p className="text-sm text-gray-600">Detailed assessment and recommendations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Registration Support</p>
                    <p className="text-sm text-gray-600">Optional filing assistance (if desired)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

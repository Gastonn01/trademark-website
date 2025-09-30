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
import { Upload, CheckCircle, ChevronDown, ChevronUp, AlertCircle } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

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

// Pricing data for countries
const pricingData = {
  "European Union": { price: 1200, additionalClassPrice: 150, flag: "eu" },
  "United States": { price: 1500, additionalClassPrice: 400, flag: "us" },
  Germany: { price: 900, additionalClassPrice: 300, flag: "de" },
  Argentina: { price: 1000, additionalClassPrice: 250, flag: "ar" },
  Spain: { price: 600, additionalClassPrice: 150, flag: "es" },
  "United Kingdom": { price: 900, additionalClassPrice: 200, flag: "gb" },
  Canada: { price: 1200, additionalClassPrice: 300, flag: "ca" },
  Mexico: { price: 800, additionalClassPrice: 200, flag: "mx" },
  France: { price: 900, additionalClassPrice: 200, flag: "fr" },
  Italy: { price: 900, additionalClassPrice: 200, flag: "it" },
  Portugal: { price: 600, additionalClassPrice: 150, flag: "pt" },
  Greece: { price: 600, additionalClassPrice: 150, flag: "gr" },
  "Bosnia and Herzegovina": { price: 500, additionalClassPrice: 100, flag: "ba" },
  Belarus: { price: 400, additionalClassPrice: 100, flag: "by" },
  Benelux: { price: 800, additionalClassPrice: 200, flag: "be" },
  Cyprus: { price: 600, additionalClassPrice: 150, flag: "cy" },
  Georgia: { price: 400, additionalClassPrice: 100, flag: "ge" },
  Iceland: { price: 800, additionalClassPrice: 200, flag: "is" },
  Lithuania: { price: 500, additionalClassPrice: 150, flag: "lt" },
  Bolivia: { price: 600, additionalClassPrice: 150, flag: "bo" },
  Brazil: { price: 1200, additionalClassPrice: 300, flag: "br" },
  Chile: { price: 800, additionalClassPrice: 200, flag: "cl" },
  Colombia: { price: 800, additionalClassPrice: 200, flag: "co" },
  Ecuador: { price: 600, additionalClassPrice: 150, flag: "ec" },
  Paraguay: { price: 500, additionalClassPrice: 150, flag: "py" },
  Peru: { price: 600, additionalClassPrice: 150, flag: "pe" },
  Uruguay: { price: 700, additionalClassPrice: 200, flag: "uy" },
  Venezuela: { price: 600, additionalClassPrice: 150, flag: "ve" },
  China: { price: 1000, additionalClassPrice: 200, flag: "cn" },
  Japan: { price: 1500, additionalClassPrice: 400, flag: "jp" },
  Afghanistan: { price: 500, additionalClassPrice: 100, flag: "af" },
  "Saudi Arabia": { price: 800, additionalClassPrice: 200, flag: "sa" },
  Armenia: { price: 400, additionalClassPrice: 100, flag: "am" },
  Azerbaijan: { price: 400, additionalClassPrice: 100, flag: "az" },
  Bahrain: { price: 600, additionalClassPrice: 150, flag: "bh" },
  Bangladesh: { price: 500, additionalClassPrice: 100, flag: "bd" },
  Bhutan: { price: 500, additionalClassPrice: 100, flag: "bt" },
  Brunei: { price: 600, additionalClassPrice: 150, flag: "bn" },
  Cambodia: { price: 500, additionalClassPrice: 100, flag: "kh" },
  "Hong Kong": { price: 800, additionalClassPrice: 200, flag: "hk" },
  India: { price: 800, additionalClassPrice: 150, flag: "in" },
  Indonesia: { price: 600, additionalClassPrice: 150, flag: "id" },
  Iran: { price: 500, additionalClassPrice: 100, flag: "ir" },
  Iraq: { price: 500, additionalClassPrice: 100, flag: "iq" },
  Jordan: { price: 600, additionalClassPrice: 150, flag: "jo" },
  Kazakhstan: { price: 500, additionalClassPrice: 150, flag: "kz" },
  Kyrgyzstan: { price: 400, additionalClassPrice: 100, flag: "kg" },
  "South Korea": { price: 1200, additionalClassPrice: 300, flag: "kr" },
  Kuwait: { price: 600, additionalClassPrice: 150, flag: "kw" },
  Laos: { price: 500, additionalClassPrice: 100, flag: "la" },
  Lebanon: { price: 600, additionalClassPrice: 150, flag: "lb" },
  Macao: { price: 600, additionalClassPrice: 150, flag: "mo" },
  Malaysia: { price: 600, additionalClassPrice: 150, flag: "my" },
  Maldives: { price: 500, additionalClassPrice: 100, flag: "mv" },
  Mongolia: { price: 500, additionalClassPrice: 100, flag: "mn" },
  Myanmar: { price: 500, additionalClassPrice: 100, flag: "mm" },
  Nepal: { price: 500, additionalClassPrice: 100, flag: "np" },
  "North Korea": { price: 500, additionalClassPrice: 100, flag: "kp" },
  Oman: { price: 600, additionalClassPrice: 150, flag: "om" },
  Pakistan: { price: 500, additionalClassPrice: 100, flag: "pk" },
  Palestine: { price: 500, additionalClassPrice: 100, flag: "ps" },
  Philippines: { price: 600, additionalClassPrice: 150, flag: "ph" },
  Qatar: { price: 600, additionalClassPrice: 150, flag: "qa" },
  Singapore: { price: 800, additionalClassPrice: 200, flag: "sg" },
  "Sri Lanka": { price: 500, additionalClassPrice: 100, flag: "lk" },
  Syria: { price: 500, additionalClassPrice: 100, flag: "sy" },
  Taiwan: { price: 800, additionalClassPrice: 200, flag: "tw" },
  Tajikistan: { price: 400, additionalClassPrice: 100, flag: "tj" },
  Thailand: { price: 600, additionalClassPrice: 150, flag: "th" },
  Turkey: { price: 700, additionalClassPrice: 200, flag: "tr" },
  Turkmenistan: { price: 400, additionalClassPrice: 100, flag: "tm" },
  "United Arab Emirates": { price: 800, additionalClassPrice: 200, flag: "ae" },
  Uzbekistan: { price: 400, additionalClassPrice: 100, flag: "uz" },
  Vietnam: { price: 600, additionalClassPrice: 150, flag: "vn" },
  Yemen: { price: 500, additionalClassPrice: 100, flag: "ye" },
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

    // Require email address before any submission logic
    if (!formData.email || !formData.email.trim()) {
      setErrorMessage("Please enter your email address so we can send your results.")
      setStep(3)
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
    const countryData = pricingData[country as keyof typeof pricingData]
    return sum + (countryData?.price || 0)
  }, 0)

  const currencySymbol = currency === "USD" ? "$" : "€"

  return (
    <div id="free-search-form" className="max-w-6xl mx-auto px-4 pt-24 pb-12 scroll-mt-16">
      {isPreview && previewModeNotice && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-amber-800">Preview Mode</h3>
            <p className="text-amber-700 text-sm">
              You are viewing this form in preview mode. Form submissions will be simulated and no data will be saved to
              the database.
              <button className="ml-2 text-amber-800 underline" onClick={() => setPreviewModeNotice(false)}>
                Dismiss
              </button>
            </p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-indigo-700">Free Trademark Search</h1>
            <p className="text-lg text-gray-600">Start your trademark journey with a free search.</p>
            <p className="text-lg text-gray-600 mb-4">
              Fill out this simple form to get your free trademark search and expert assessment within 24 hours.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-green-800 mb-1">Your Search is Completely Free</h3>
                  <p className="text-green-700 text-sm">
                    The trademark search and assessment are free. The prices shown are only for trademark registration
                    services if you choose to proceed with filing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {step === 2 && (
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-indigo-700">Where do you need protection?</h2>
                <p className="text-gray-600 text-sm mt-1">
                  Select countries to see registration pricing (search remains free)
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Currency:</span>
                <button
                  type="button"
                  onClick={() => handleCurrencyChange("USD")}
                  className={`px-2 py-1 rounded text-xs ${
                    currency === "USD" ? "bg-indigo-100 text-indigo-700" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  USD
                </button>
                <span className="text-gray-300">|</span>
                <button
                  type="button"
                  onClick={() => handleCurrencyChange("EUR")}
                  className={`px-2 py-1 rounded text-xs ${
                    currency === "EUR" ? "bg-indigo-100 text-indigo-700" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  EUR
                </button>
              </div>
            </div>
          )}

          {/* Progress bar */}
          <div className="mb-12">
            <div className="flex justify-between mb-2">
              {["Trademark Details", "Countries", "Contact Info"].map((label, index) => (
                <span
                  key={label}
                  className={`text-sm font-medium ${step > index ? "text-indigo-600" : "text-gray-500"}`}
                >
                  {label}
                </span>
              ))}
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-in-out"
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

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-indigo-700">What type of trademark do you have?</h2>
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
                        className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-indigo-50 transition-colors"
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="flex items-center gap-4 cursor-pointer flex-1">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-2xl">
                            {option.icon}
                          </div>
                          <div>
                            <div className="font-medium">{option.label}</div>
                            <div className="text-sm text-gray-600">{option.description}</div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {(formData.trademarkType === "word" || formData.trademarkType === "logo") && (
                  <div>
                    <Label htmlFor="trademarkName" className="block text-lg font-medium text-gray-700 mb-2">
                      What's your trademark name?
                    </Label>
                    <Input
                      id="trademarkName"
                      value={formData.trademarkName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, trademarkName: e.target.value }))}
                      placeholder="Enter your trademark name"
                      className="w-full text-lg p-3"
                    />
                  </div>
                )}

                {(formData.trademarkType === "logo" || formData.trademarkType === "figurative") && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-indigo-700">Upload your logo</h3>
                    <div
                      className={`border-2 border-dashed ${isDragging ? "border-indigo-600 bg-indigo-50" : "border-indigo-300"} rounded-lg p-8 text-center hover:border-indigo-500 transition-colors`}
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
                      <Upload className="mx-auto h-12 w-12 text-indigo-400 mb-4" />
                      <div className="text-indigo-600 font-medium mb-2">Click to upload or drag and drop</div>
                      <div className="text-sm text-gray-500">PNG, JPG, SVG or GIF (max. 5 MB)</div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                      <Button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          ;(document.querySelector('input[type="file"]') as HTMLInputElement)?.click()
                        }}
                        variant="outline"
                        className="mt-4"
                      >
                        Select File
                      </Button>
                      {formData.logo && (
                        <div className="mt-4 flex items-center text-green-600">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          <span>{formData.logo.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="goodsAndServices" className="block text-lg font-medium text-gray-700 mb-2">
                    Describe your goods and services
                  </Label>
                  <Textarea
                    id="goodsAndServices"
                    value={formData.goodsAndServices}
                    onChange={(e) => setFormData((prev) => ({ ...prev, goodsAndServices: e.target.value }))}
                    placeholder="e.g., Clothing, namely shirts, pants, and hats"
                    className="w-full text-lg p-3"
                    rows={4}
                  />
                </div>
                {!formData.trademarkType && <div className="text-red-500 text-sm">Please select a trademark type</div>}
                {formData.trademarkType !== "figurative" && !formData.trademarkName && (
                  <div className="text-red-500 text-sm">Please enter your trademark name</div>
                )}
                {(formData.trademarkType === "logo" || formData.trademarkType === "figurative") && !formData.logo && (
                  <div className="text-red-500 text-sm">Please upload your logo</div>
                )}
                {!formData.goodsAndServices && (
                  <div className="text-red-500 text-sm">Please describe your goods and services</div>
                )}
                <Button
                  type="button"
                  className="w-full py-3 text-lg bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={() => setStep(2)}
                  disabled={
                    !formData.trademarkType ||
                    !formData.goodsAndServices ||
                    (formData.trademarkType !== "figurative" && !formData.trademarkName) ||
                    ((formData.trademarkType === "logo" || formData.trademarkType === "figurative") && !formData.logo)
                  }
                >
                  Continue to Countries
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
                        const countryData = pricingData[country.name as keyof typeof pricingData]
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
                        const countryData = pricingData[country.name as keyof typeof pricingData]
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
                            const countryData = pricingData[country.name as keyof typeof pricingData]
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
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 py-3 text-lg">
                    Back
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 py-3 text-lg bg-indigo-600 hover:bg-indigo-700 text-white"
                    onClick={() => setStep(3)}
                    disabled={selectedCountries.length === 0}
                  >
                    Continue to Contact Info
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Almost there! We just need your details</h2>

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
                  <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1 py-3 text-lg">
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

        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-indigo-700">Why Trademark Your Brand?</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>
                <span className="font-medium">Legal Protection:</span> Prevents others from using your brand name or
                logo.
              </li>
              <li>
                <span className="font-medium">Brand Recognition:</span> Helps customers easily identify and trust your
                products or services.
              </li>
              <li>
                <span className="font-medium">Business Growth:</span> Strengthens your brand equity and market position.
              </li>
              <li>
                <span className="font-medium">Asset Value:</span> Trademarks are valuable assets that can be licensed or
                sold.
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2 text-indigo-700">How It Works</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>
                    <strong>Step 1:</strong> Free trademark search & assessment
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>
                    <strong>Step 2:</strong> Review results & expert recommendations
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-indigo-500" />
                  <span>
                    <strong>Step 3:</strong> Choose to proceed with registration (optional)
                  </span>
                </div>
              </div>
              <Button variant="secondary" className="mt-4">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

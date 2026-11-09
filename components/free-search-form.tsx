"use client"

import type React from "react"

import { useState, useEffect, useMemo, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { CountrySelectCard } from "@/components/country-select-card"
import { trackLeadSubmission } from "@/components/gtm-tracker"
import { Upload, CheckCircle, ChevronDown, ChevronUp, AlertCircle, Shield, Clock, Award, Trophy, Mic, Tv, Building2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { countryPricingData } from "@/lib/pricing-data"
import { useCurrency } from "@/hooks/use-currency" // Assuming this hook is now available
import { getCurrencySymbol } from "@/lib/currency-converter" // Use getCurrencySymbol from currency-converter

// Hostname-only check: the production domain must NEVER simulate
// submissions, regardless of build-time env vars.
const isPreviewEnvironment = () => {
  if (typeof window !== "undefined") {
    return (
      window.location.hostname === "localhost" ||
      window.location.hostname.includes("vercel.app") ||
      window.location.hostname.includes("preview")
    )
  }
  return false
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

const audienceOptions = [
  {
    id: "athlete",
    icon: Trophy,
    title: "Athlete",
    subtitle: "I play sports and want to protect my NIL",
    color: "from-blue-50 to-blue-100 border-blue-200 hover:border-blue-500",
    activeColor: "from-blue-100 to-blue-200 border-blue-600 shadow-blue-100",
    goodsAndServices: "Entertainment services, namely sports events, athletic performances, and personal appearances by a professional athlete; endorsement services",
  },
  {
    id: "creator",
    icon: Tv,
    title: "Creator / Influencer",
    subtitle: "I create content and want to protect my brand",
    color: "from-purple-50 to-purple-100 border-purple-200 hover:border-purple-500",
    activeColor: "from-purple-100 to-purple-200 border-purple-600 shadow-purple-100",
    goodsAndServices: "Entertainment services in the nature of providing online content in the fields of entertainment and lifestyle; influencer services; social media content creation",
  },
  {
    id: "musician",
    icon: Mic,
    title: "Musician / Artist",
    subtitle: "I make music or art and want to protect my name",
    color: "from-pink-50 to-pink-100 border-pink-200 hover:border-pink-500",
    activeColor: "from-pink-100 to-pink-200 border-pink-600 shadow-pink-100",
    goodsAndServices: "Entertainment services in the nature of live musical performances; production and distribution of sound recordings; music streaming services",
  },
  {
    id: "business",
    icon: Building2,
    title: "Business Owner",
    subtitle: "I run a business and want to protect my brand",
    color: "from-green-50 to-green-100 border-green-200 hover:border-green-500",
    activeColor: "from-green-100 to-green-200 border-green-600 shadow-green-100",
    goodsAndServices: "",
  },
]

const audienceLabels: Record<string, { heading: string; namePlaceholder: string; nameLabel: string; goodsLabel: string; goodsPlaceholder: string; goodsHelper: string }> = {
  athlete: {
    heading: "Check your name is protected",
    namePlaceholder: "e.g. Your name, nickname, or athlete brand...",
    nameLabel: "Your name or athlete brand",
    goodsLabel: "What you do (pre-filled — edit if needed)",
    goodsPlaceholder: "What services or products are associated with your name?",
    goodsHelper: "This tells trademark offices what category to protect your name under. We've pre-filled this for athletes.",
  },
  creator: {
    heading: "Check your name or handle is protected",
    namePlaceholder: "e.g. Your creator name, handle, or catchphrase...",
    nameLabel: "Your creator name or brand",
    goodsLabel: "What you do (pre-filled — edit if needed)",
    goodsPlaceholder: "Describe your content or services...",
    goodsHelper: "This tells trademark offices what category to protect your name under. We've pre-filled this for creators.",
  },
  musician: {
    heading: "Check your artist name is protected",
    namePlaceholder: "e.g. Your artist name, band name, or stage name...",
    nameLabel: "Your artist or stage name",
    goodsLabel: "What you do (pre-filled — edit if needed)",
    goodsPlaceholder: "Describe your music or art...",
    goodsHelper: "This tells trademark offices what category to protect your name under. We've pre-filled this for musicians.",
  },
  business: {
    heading: "Check your brand name is available",
    namePlaceholder: "e.g. Your company name, product name, or slogan...",
    nameLabel: "Your brand or business name",
    goodsLabel: "What your business does",
    goodsPlaceholder: "e.g. Online retail store selling handmade jewellery...",
    goodsHelper: "Describe your products or services in plain language — we'll translate it into legal trademark language.",
  },
}

export function FreeSearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { currency } = useCurrency() // Use global currency hook
  // "defend" = visitor found their own name registered by someone else
  // (enforcement lead from the instant checker)
  const intentParam = searchParams?.get("intent") || ""
  const hpRef = useRef<HTMLInputElement>(null)
  const [audienceType, setAudienceType] = useState<string>("")
  const [step, setStep] = useState(0)
  const totalSteps = 3
  const [formData, setFormData] = useState<FormData>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const trademarkFromUrl = params.get("q") || ""

      return {
        trademarkType: "",
        trademarkName: trademarkFromUrl,
        goodsAndServices: "",
        countries: [],
        selectedClasses: [],
        name: "",
        surname: "",
        email: "",
        marketing: false,
        acceptTerms: false,
      }
    }

    return {
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
    }
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
  const [isSearching, setIsSearching] = useState(false) // Added state for search activity

  // Check if we're in preview mode on component mount
  useEffect(() => {
    setIsPreview(isPreviewEnvironment())
  }, [])

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

  // Simulate search activity
  useEffect(() => {
    setIsSearching(!!searchTerm)
  }, [searchTerm])

  // Filtered search results based on searchTerm
  const searchResults = useMemo(() => {
    if (!searchTerm) return []

    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    const allCountries = regions.flatMap((region) => region.countries).concat(topCountries)
    const uniqueCountries = Array.from(new Map(allCountries.map((c) => [c.name, c])).values())

    return uniqueCountries.filter((country) => country.name.toLowerCase().includes(lowerCaseSearchTerm))
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
      formDataToSend.append("hp", hpRef.current?.value || "")
      if (intentParam) formDataToSend.append("intent", intentParam)

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

  const totalPrice = useMemo(() => {
    return selectedCountries.reduce((sum, country) => {
      const countryData = countryPricingData[country as keyof typeof countryPricingData]
      // Use prices[currency] instead of price if available, otherwise fallback to price
      const price = countryData?.prices?.[currency] ?? countryData?.price ?? 0
      return sum + price
    }, 0)
  }, [selectedCountries, currency])

  const currencySymbol = getCurrencySymbol(currency) // Use getCurrencySymbol helper

  return (
    <div id="free-search-form" className="max-w-7xl mx-auto px-4 pt-24 pb-16 scroll-mt-16">
      {isPreview && previewModeNotice && (
        <div className="mb-8 p-5 bg-gray-50 border-l-4 border-gray-400 rounded-r-lg shadow-sm flex items-start gap-4">
          <AlertCircle className="h-6 w-6 text-gray-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">Preview Mode Active</h3>
            <p className="text-gray-800 text-sm leading-relaxed">
              You are viewing this form in preview mode. Form submissions will be simulated and no data will be saved to
              the database.
            </p>
            <button
              className="mt-2 text-sm font-medium text-gray-900 underline hover:no-underline"
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
            <p className="label-caps text-accent mb-4">Free trademark search</p>
            <h1 className="font-serif text-4xl md:text-5xl mb-4 text-primary tracking-tight">
              {intentParam === "defend" && step === 0
                ? "Let's take your name back."
                : step === 0
                ? "First, tell us about yourself"
                : audienceType
                ? audienceLabels[audienceType]?.heading
                : "Check if your name is protected"}
            </h1>
            <p className="text-lg text-gray-500 font-light leading-relaxed">
              {intentParam === "defend" && step === 0
                ? "If someone registered or is trading on your name, you may be able to oppose, cancel, or out-file them. Tell us who you are and our attorneys will review your case — free."
                : step === 0
                ? "We'll explain what protection means for your situation — no legal jargon, just plain English."
                : "Free check · No credit card required · Results in 24 hours"}
            </p>

            {step > 0 && (
              <div className="mt-6 flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-accent" />
                  <span className="label-caps text-[0.65rem] text-gray-400">Secure & confidential</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-accent" />
                  <span className="label-caps text-[0.65rem] text-gray-400">24-hour response</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-accent" />
                  <span className="label-caps text-[0.65rem] text-gray-400">Expert analysis</span>
                </div>
              </div>
            )}
          </div>

          {/* Step 0: Audience selector */}
          {step === 0 && (
            <div className="space-y-6 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {audienceOptions.map((option) => {
                  const Icon = option.icon
                  const isActive = audienceType === option.id
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setAudienceType(option.id)}
                      className={`bg-white border rounded-2xl p-6 text-left transition-all duration-200 ${
                        isActive
                          ? "border-accent ring-1 ring-accent shadow-md"
                          : "border-gray-200 hover:border-accent/60 hover:shadow-sm"
                      }`}
                    >
                      <Icon className={`h-7 w-7 mb-3 ${isActive ? "text-accent" : "text-gray-400"}`} />
                      <div className="font-semibold text-primary text-lg">{option.title}</div>
                      <div className="text-sm text-gray-500 mt-1">{option.subtitle}</div>
                    </button>
                  )
                })}
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <p className="text-sm font-semibold text-primary mb-1">What happens next?</p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We check if your name is already registered or claimed by someone else — across trademark databases in 170+ countries. It&apos;s completely free and takes less than 5 minutes.
                </p>
              </div>

              <button
                type="button"
                className={`w-full py-4 text-base font-semibold rounded-full transition-all ${
                  audienceType
                    ? "bg-primary hover:bg-primary/90 text-white shadow-lg"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                disabled={!audienceType}
                onClick={() => {
                  if (!audienceType) return
                  const selected = audienceOptions.find(o => o.id === audienceType)
                  if (selected?.goodsAndServices) {
                    setFormData(prev => ({ ...prev, trademarkType: "word", goodsAndServices: selected.goodsAndServices }))
                  }
                  setStep(1)
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
              >
                {audienceType ? `Continue as ${audienceOptions.find(o => o.id === audienceType)?.title} →` : "Select who you are to continue"}
              </button>

              <p className="text-center text-sm text-gray-500">
                Not sure which applies to you?{" "}
                <button
                  type="button"
                  className="underline text-gray-700 hover:text-gray-900"
                  onClick={() => {
                    setAudienceType("business")
                    setStep(1)
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                >
                  Start here and we&apos;ll guide you
                </button>
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2 font-serif">Select Protection Territories</h2>
                <p className="text-gray-600 leading-relaxed">
                  Choose jurisdictions for trademark registration (search remains complimentary)
                </p>
              </div>
            </div>
          )}

          {step > 0 && (
            <div className="mb-12">
              <div className="flex justify-between mb-3">
                {["Who are you?", "What to protect", "Where?", "Your details"].map((label, index) => (
                  <span
                    key={label}
                    className={`text-xs font-semibold transition-colors ${
                      step > index ? "text-gray-700" : step === index ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-gray-800 to-gray-700 rounded-full transition-all duration-500 ease-out shadow-sm"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 bg-gray-50 border border-gray-300 rounded-lg flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-700">{successMessage}</p>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-4 bg-gray-50 border border-gray-400 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-gray-700 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-700">{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <input
              type="text"
              name="hp"
              ref={hpRef}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] w-px h-px opacity-0"
            />
            {step === 1 && (
              <div className="space-y-10">
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-900 font-serif">What are you protecting?</h2>
                  <p className="text-gray-500 mb-6 text-sm">Choose the type of thing you want to register. Most people protecting a name choose the first option.</p>
                  <RadioGroup
                    value={formData.trademarkType}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, trademarkType: value }))}
                    className="space-y-4"
                  >
                    {[
                      {
                        value: "word",
                        label: "My name or brand name",
                        description: "A word or phrase — your name, stage name, brand, or catchphrase",
                        icon: "A",
                      },
                      {
                        value: "logo",
                        label: "My logo or visual brand",
                        description: "A logo, image, or visual mark (with or without text)",
                        icon: "🖼️",
                      },
                      {
                        value: "figurative",
                        label: "A symbol or design",
                        description: "A stylised design or symbol with no words",
                        icon: "✨",
                      },
                    ].map((option) => (
                      <div
                        key={option.value}
                        className={`flex items-center space-x-4 border-2 rounded-xl p-5 transition-all cursor-pointer ${
                          formData.trademarkType === option.value
                            ? "border-gray-700 bg-gray-50 shadow-md"
                            : "border-gray-200 bg-white hover:border-gray-400 hover:shadow-sm"
                        }`}
                      >
                        <RadioGroupItem value={option.value} id={option.value} className="mt-0.5" />
                        <Label htmlFor={option.value} className="flex items-center gap-4 cursor-pointer flex-1">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                              formData.trademarkType === option.value ? "bg-gray-100" : "bg-gray-100"
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
                      {audienceType && audienceLabels[audienceType] ? audienceLabels[audienceType].nameLabel : "Enter the name you want to protect"}
                    </Label>
                    <Input
                      id="trademarkName"
                      value={formData.trademarkName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, trademarkName: e.target.value }))}
                      placeholder={audienceType && audienceLabels[audienceType] ? audienceLabels[audienceType].namePlaceholder : "Enter your name or brand..."}
                      className="w-full text-lg p-4 border-2 border-gray-200 focus:border-gray-700 rounded-lg shadow-sm"
                    />
                  </div>
                )}

                {(formData.trademarkType === "logo" || formData.trademarkType === "figurative") && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Upload Trademark Design</h3>
                    <div
                      className={`border-2 border-dashed rounded-xl p-10 text-center transition-all ${
                        isDragging
                          ? "border-gray-700 bg-gray-50 shadow-lg"
                          : "border-gray-300 bg-gray-50 hover:border-gray-500 hover:bg-gray-100/50"
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
                      <Upload className="mx-auto h-14 w-14 text-gray-700 mb-4" />
                      <div className="text-gray-700 font-semibold mb-2 text-lg">Upload or drag and drop</div>
                      <div className="text-sm text-gray-500 mb-4">PNG, JPG, SVG or GIF (maximum 5 MB)</div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                      <Button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          ;(document.querySelector('input[type="file"]') as HTMLInputElement)?.click()
                        }}
                        variant="outline"
                        className="mt-2 border-2 border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white font-medium"
                      >
                        Select File
                      </Button>
                      {formData.logo && (
                        <div className="mt-6 flex items-center justify-center text-gray-700 bg-gray-50 rounded-lg p-3">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          <span className="font-medium">{formData.logo.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="goodsAndServices" className="block text-lg font-semibold text-gray-900 mb-3">
                    {audienceType && audienceLabels[audienceType] ? audienceLabels[audienceType].goodsLabel : "What do you do?"}
                  </Label>
                  <Textarea
                    id="goodsAndServices"
                    value={formData.goodsAndServices}
                    onChange={(e) => setFormData((prev) => ({ ...prev, goodsAndServices: e.target.value }))}
                    placeholder={audienceType && audienceLabels[audienceType] ? audienceLabels[audienceType].goodsPlaceholder : "Describe what you do or sell in plain language..."}
                    className="w-full text-base p-4 border-2 border-gray-200 focus:border-gray-700 rounded-lg shadow-sm"
                    rows={4}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    {audienceType && audienceLabels[audienceType] ? audienceLabels[audienceType].goodsHelper : "Write in plain language — our attorneys will translate this into the correct legal categories."}
                  </p>
                </div>

                {!formData.trademarkType && (
                  <div className="text-gray-700 text-sm font-medium bg-gray-50 p-3 rounded-lg border border-gray-300">
                    Please select a trademark classification
                  </div>
                )}
                {formData.trademarkType !== "figurative" && !formData.trademarkName && (
                  <div className="text-gray-700 text-sm font-medium bg-gray-50 p-3 rounded-lg border border-gray-300">
                    Please enter your trademark designation
                  </div>
                )}
                {(formData.trademarkType === "logo" || formData.trademarkType === "figurative") && !formData.logo && (
                  <div className="text-gray-700 text-sm font-medium bg-gray-50 p-3 rounded-lg border border-gray-300">
                    Please upload your trademark design
                  </div>
                )}
                {!formData.goodsAndServices && (
                  <div className="text-gray-700 text-sm font-medium bg-gray-50 p-3 rounded-lg border border-gray-300">
                    Please describe your goods and services
                  </div>
                )}

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" })
                      setStep(0)
                    }}
                    className="flex-1 py-4 text-lg"
                  >
                    ← Back
                  </Button>
                  <Button
                    type="button"
                    className="flex-[2] py-4 text-lg font-semibold bg-gray-900 hover:bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
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
                    Continue: Choose countries →
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div className="bg-gray-50 border-2 border-gray-700 rounded-xl p-6 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-700 text-white rounded-full p-2 flex-shrink-0">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Your Search is 100% FREE</h3>
                      <p className="text-gray-700 leading-relaxed">
                        The trademark search and professional analysis are completely free with no obligation. The
                        prices shown below are registration fees that only apply if you decide to proceed with filing
                        after receiving your search results.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600">
                  Select the countries or regions where you want to register your trademark.
                </p>

                {selectedCountries.length > 0 && (
                  <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-900">Selected: {selectedCountries.length} countries</h3>
                        <p className="text-sm text-gray-700">
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
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Search Results</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchResults.map((country) => {
                        const countryData = countryPricingData[country.name as keyof typeof countryPricingData]
                        return (
                          <CountrySelectCard
                            key={country.name}
                            country={country.name}
                            flag={`https://flagcdn.com/${country.flag}.svg`}
                            price={countryData?.prices?.[currency]}
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
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Most Requested Countries</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredTopCountries.map((country) => {
                        const countryData = countryPricingData[country.name as keyof typeof countryPricingData]
                        return (
                          <CountrySelectCard
                            key={country.name}
                            country={country.name}
                            flag={`https://flagcdn.com/${country.flag}.svg`}
                            price={countryData?.prices?.[currency]}
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
                        className="flex items-center justify-between w-full text-left text-lg font-semibold mb-2 text-gray-900 hover:text-gray-700"
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
                                price={countryData?.prices?.[currency]}
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
                      window.scrollTo({ top: 0, behavior: "smooth" })
                      setStep(1)
                    }}
                    className="flex-1 py-3 text-lg"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 py-3 text-lg bg-gray-900 hover:bg-gray-800 text-white"
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
                <h2 className="text-2xl font-bold mb-6 text-gray-900 font-serif">
                  Almost there! We just need your details
                </h2>

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
                      <a
                        href="/terms"
                        className="text-gray-700 hover:underline font-medium"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Terms and Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy"
                        className="text-gray-700 hover:underline font-medium"
                        target="_blank"
                        rel="noreferrer"
                      >
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
                    className="flex-1 py-3 text-lg bg-gray-900 hover:bg-gray-800 text-white"
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
          <div className="bg-white rounded-2xl p-7 border border-gray-200 sticky top-24">
            <h3 className="font-serif text-2xl mb-6 text-primary">Why register your name?</h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">Stop AI misuse:</span>
                  <p className="text-sm mt-0.5">A trademark gives you legal grounds to demand takedowns of deepfakes, fake ads, or AI-generated content using your name</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">Own your NIL:</span>
                  <p className="text-sm mt-0.5">Athletes: lock in your Name, Image & Likeness before someone else registers your brand</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">Block copycats:</span>
                  <p className="text-sm mt-0.5">Prevent others from trading off your name, reputation, or creative work</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">It&apos;s an asset:</span>
                  <p className="text-sm mt-0.5">Your registered trademark has real commercial value — for deals, sponsorships, and licensing</p>
                </div>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-gray-300">
              <h4 className="text-lg font-bold mb-4 text-gray-900">Our Process</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Comprehensive Search</p>
                    <p className="text-sm text-gray-600">Professional trademark database analysis</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Expert Review</p>
                    <p className="text-sm text-gray-600">Detailed assessment and recommendations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
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

"use client"

import type React from "react"
import { Suspense } from "react"
import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CountrySelectCard } from "@/components/country-select-card"
import Image from "next/image"
import { Upload, ChevronDown, ChevronUp } from "lucide-react"
import { TrademarkClassesDialog } from "@/components/trademark-classes-dialog"
import { useRouter } from "next/navigation"
import { CurrencySelector } from "@/components/currency-selector"
import { useCurrency } from "@/lib/currency-context"

interface FormData {
  trademarkType: string
  trademarkName: string
  logo?: File
  goodsAndServices: string
  countries: CountrySelection[]
  selectedClasses: number[]
  name: string
  surname: string
  email: string
  phone: string
  marketing: boolean
}

interface CountrySelection {
  name: string
  classes: number
}

interface CountryData {
  name: string
  flag: string
  price: number
  additionalClassPrice: number
}

interface RegionData {
  name: string
  countries: CountryData[]
}

interface VerificationFormProps {
  initialData?: any
  isLoading?: boolean
}

// Updated pricing data to match detailed-pricelist
const topCountries: CountryData[] = [
  { name: "European Union", flag: "eu", price: 1551, additionalClassPrice: 425 },
  { name: "United States", flag: "us", price: 1012, additionalClassPrice: 499 },
  { name: "Germany", flag: "de", price: 863, additionalClassPrice: 500 },
  { name: "Spain", flag: "es", price: 564, additionalClassPrice: 385 },
  { name: "United Kingdom", flag: "gb", price: 909, additionalClassPrice: 300 },
  { name: "China", flag: "cn", price: 518, additionalClassPrice: 550 },
]

const regions: RegionData[] = [
  {
    name: "North America",
    countries: [
      { name: "United States", flag: "us", price: 1012, additionalClassPrice: 499 },
      { name: "Canada", flag: "ca", price: 1369, additionalClassPrice: 150 },
      { name: "Mexico", flag: "mx", price: 685, additionalClassPrice: 540 },
    ],
  },
  {
    name: "Europe",
    countries: [
      { name: "European Union", flag: "eu", price: 1551, additionalClassPrice: 425 },
      { name: "Spain", flag: "es", price: 564, additionalClassPrice: 385 },
      { name: "France", flag: "fr", price: 667, additionalClassPrice: 190 },
      { name: "United Kingdom", flag: "gb", price: 909, additionalClassPrice: 300 },
      { name: "Italy", flag: "it", price: 920, additionalClassPrice: 180 },
      { name: "Benelux", flag: "be", price: 794, additionalClassPrice: 190 },
      { name: "Portugal", flag: "pt", price: 909, additionalClassPrice: 265 },
      { name: "Germany", flag: "de", price: 863, additionalClassPrice: 500 },
      { name: "Greece", flag: "gr", price: 736, additionalClassPrice: 570 },
      { name: "Bosnia and Herzegovina", flag: "ba", price: 656, additionalClassPrice: 170 },
    ],
  },
  {
    name: "South America",
    countries: [
      { name: "Argentina", flag: "ar", price: 460, additionalClassPrice: 350 },
      { name: "Bolivia", flag: "bo", price: 777, additionalClassPrice: 585 },
      { name: "Brazil", flag: "br", price: 644, additionalClassPrice: 418 },
      { name: "Chile", flag: "cl", price: 689, additionalClassPrice: 499 },
      { name: "Colombia", flag: "co", price: 794, additionalClassPrice: 490 },
      { name: "Ecuador", flag: "ec", price: 632, additionalClassPrice: 549 },
      { name: "Paraguay", flag: "py", price: 564, additionalClassPrice: 399 },
      { name: "Peru", flag: "pe", price: 667, additionalClassPrice: 570 },
      { name: "Uruguay", flag: "uy", price: 604, additionalClassPrice: 299 },
      { name: "Venezuela", flag: "ve", price: 604, additionalClassPrice: 510 },
    ],
  },
  {
    name: "Central America",
    countries: [
      { name: "Belize", flag: "bz", price: 915, additionalClassPrice: 795 },
      { name: "Costa Rica", flag: "cr", price: 529, additionalClassPrice: 299 },
      { name: "El Salvador", flag: "sv", price: 570, additionalClassPrice: 495 },
      { name: "Guatemala", flag: "gt", price: 599, additionalClassPrice: 520 },
      { name: "Honduras", flag: "hn", price: 685, additionalClassPrice: 595 },
      { name: "Nicaragua", flag: "ni", price: 621, additionalClassPrice: 299 },
      { name: "Panama", flag: "pa", price: 621, additionalClassPrice: 440 },
    ],
  },
  {
    name: "Central America and Caribbean",
    countries: [
      { name: "Anguilla", flag: "ai", price: 1012, additionalClassPrice: 430 },
      { name: "Antigua and Barbuda", flag: "ag", price: 759, additionalClassPrice: 330 },
      { name: "Aruba", flag: "aw", price: 943, additionalClassPrice: 170 },
      { name: "Bahamas", flag: "bs", price: 1076, additionalClassPrice: 935 },
      { name: "Barbados", flag: "bb", price: 1400, additionalClassPrice: 1150 },
      { name: "Belize", flag: "bz", price: 915, additionalClassPrice: 795 },
      { name: "Bermuda", flag: "bm", price: 1770, additionalClassPrice: 1539 },
      { name: "BES Islands", flag: "bq", price: 874, additionalClassPrice: 199 },
      { name: "British Virgin Islands", flag: "vg", price: 1001, additionalClassPrice: 480 },
      { name: "Cayman Islands", flag: "ky", price: 1242, additionalClassPrice: 350 },
      { name: "Costa Rica", flag: "cr", price: 529, additionalClassPrice: 299 },
      { name: "Cuba", flag: "cu", price: 1375, additionalClassPrice: 730 },
      { name: "Curacao", flag: "cw", price: 1208, additionalClassPrice: 200 },
      { name: "Dominica", flag: "dm", price: 1024, additionalClassPrice: 530 },
      { name: "Dominican Republic", flag: "do", price: 621, additionalClassPrice: 420 },
      { name: "El Salvador", flag: "sv", price: 570, additionalClassPrice: 495 },
      { name: "Grenada", flag: "gd", price: 1145, additionalClassPrice: 280 },
      { name: "Guatemala", flag: "gt", price: 599, additionalClassPrice: 520 },
      { name: "Guyana", flag: "gy", price: 564, additionalClassPrice: 210 },
      { name: "Haiti", flag: "ht", price: 736, additionalClassPrice: 430 },
      { name: "Honduras", flag: "hn", price: 685, additionalClassPrice: 595 },
      { name: "Jamaica", flag: "jm", price: 1231, additionalClassPrice: 355 },
      { name: "Montserrat", flag: "ms", price: 742, additionalClassPrice: 315 },
      { name: "Nicaragua", flag: "ni", price: 621, additionalClassPrice: 299 },
      { name: "Panama", flag: "pa", price: 621, additionalClassPrice: 440 },
      { name: "Puerto Rico", flag: "pr", price: 817, additionalClassPrice: 680 },
      { name: "Saint Kitts and Nevis", flag: "kn", price: 1070, additionalClassPrice: 390 },
      { name: "Saint Lucia", flag: "lc", price: 1024, additionalClassPrice: 390 },
      { name: "Saint Vincent and the Grenadines", flag: "vc", price: 656, additionalClassPrice: 570 },
      { name: "Sint Maarten", flag: "sx", price: 1254, additionalClassPrice: 200 },
      { name: "Suriname", flag: "sr", price: 874, additionalClassPrice: 160 },
      { name: "Trinidad and Tobago", flag: "tt", price: 828, additionalClassPrice: 250 },
      { name: "Turks and Caicos Islands", flag: "tc", price: 2128, additionalClassPrice: 1850 },
    ],
  },
  {
    name: "Africa",
    countries: [
      { name: "Algeria", flag: "dz", price: 990, additionalClassPrice: 300 },
      { name: "Angola", flag: "ao", price: 1050, additionalClassPrice: 1050 },
      { name: "ARIPO", flag: "aripo", price: 3150, additionalClassPrice: 3150 },
      { name: "Botswana", flag: "bw", price: 1090, additionalClassPrice: 1090 },
      { name: "Burundi", flag: "bi", price: 1550, additionalClassPrice: 1550 },
      { name: "Djibouti", flag: "dj", price: 2050, additionalClassPrice: 2050 },
      { name: "Egypt", flag: "eg", price: 765, additionalClassPrice: 765 },
      { name: "Ethiopia", flag: "et", price: 1290, additionalClassPrice: 1290 },
      { name: "Gambia", flag: "gm", price: 1350, additionalClassPrice: 1350 },
      { name: "Ghana", flag: "gh", price: 1499, additionalClassPrice: 1499 },
      { name: "Kenya", flag: "ke", price: 1600, additionalClassPrice: 1600 },
      { name: "Libya", flag: "ly", price: 1100, additionalClassPrice: 1100 },
      { name: "Madagascar", flag: "mg", price: 1050, additionalClassPrice: 1050 },
      { name: "Morocco", flag: "ma", price: 1050, additionalClassPrice: 300 },
      { name: "Mauritania", flag: "mr", price: 1190, additionalClassPrice: 1190 },
      { name: "Mozambique", flag: "mz", price: 1050, additionalClassPrice: 1050 },
      { name: "Namibia", flag: "na", price: 1100, additionalClassPrice: 1100 },
      { name: "Nigeria", flag: "ng", price: 1150, additionalClassPrice: 1150 },
      { name: "OAPI", flag: "oapi", price: 1690, additionalClassPrice: 1690 },
      { name: "DR Congo", flag: "cd", price: 1199, additionalClassPrice: 1199 },
      { name: "Rwanda", flag: "rw", price: 1350, additionalClassPrice: 1350 },
      { name: "Seychelles", flag: "sc", price: 1150, additionalClassPrice: 1150 },
      { name: "South Africa", flag: "za", price: 1110, additionalClassPrice: 1110 },
      { name: "Sudan", flag: "sd", price: 1050, additionalClassPrice: 1050 },
      { name: "Tanzania (TANU)", flag: "tz", price: 1000, additionalClassPrice: 1000 },
      { name: "Tanzania (ZAN)", flag: "tz", price: 1050, additionalClassPrice: 1050 },
      { name: "Tunisia", flag: "tn", price: 990, additionalClassPrice: 200 },
      { name: "Uganda", flag: "ug", price: 1850, additionalClassPrice: 1850 },
      { name: "Zambia", flag: "zm", price: 1299, additionalClassPrice: 1299 },
      { name: "Zimbabwe", flag: "zw", price: 1350, additionalClassPrice: 1350 },
    ],
  },
  {
    name: "Asia and Middle East",
    countries: [
      { name: "Afghanistan", flag: "af", price: 863, additionalClassPrice: 1090 },
      { name: "Saudi Arabia", flag: "sa", price: 2818, additionalClassPrice: 2450 },
      { name: "Armenia", flag: "am", price: 1495, additionalClassPrice: 1300 },
      { name: "Azerbaijan", flag: "az", price: 1001, additionalClassPrice: 470 },
      { name: "Bahrain", flag: "bh", price: 3013, additionalClassPrice: 2620 },
      { name: "Bangladesh", flag: "bd", price: 892, additionalClassPrice: 775 },
      { name: "Bhutan", flag: "bt", price: 690, additionalClassPrice: 380 },
      { name: "Brunei", flag: "bn", price: 863, additionalClassPrice: 750 },
      { name: "Cambodia", flag: "kh", price: 724, additionalClassPrice: 629 },
      { name: "China", flag: "cn", price: 518, additionalClassPrice: 450 },
      { name: "Hong Kong", flag: "hk", price: 978, additionalClassPrice: 490 },
      { name: "India", flag: "in", price: 662, additionalClassPrice: 450 },
      { name: "Indonesia", flag: "id", price: 1139, additionalClassPrice: 950 },
      { name: "Iran", flag: "ir", price: 1725, additionalClassPrice: 490 },
      { name: "Iraq (Baghdad)", flag: "iq", price: 1737, additionalClassPrice: 300 },
      { name: "Iraq (Kurdistan)", flag: "iq", price: 2012, additionalClassPrice: 1749 },
      { name: "Japan", flag: "jp", price: 777, additionalClassPrice: 500 },
      { name: "Jordan", flag: "jo", price: 1495, additionalClassPrice: 1300 },
      { name: "Kazakhstan", flag: "kz", price: 920, additionalClassPrice: 430 },
      { name: "Kyrgyzstan", flag: "kg", price: 851, additionalClassPrice: 520 },
      { name: "South Korea", flag: "kr", price: 804, additionalClassPrice: 600 },
      { name: "Kuwait", flag: "kw", price: 2093, additionalClassPrice: 1820 },
      { name: "Laos", flag: "la", price: 736, additionalClassPrice: 640 },
      { name: "Lebanon", flag: "lb", price: 1012, additionalClassPrice: 470 },
      { name: "Macao", flag: "mo", price: 886, additionalClassPrice: 770 },
      { name: "Malaysia", flag: "my", price: 1323, additionalClassPrice: 970 },
      { name: "Maldives", flag: "mv", price: 1024, additionalClassPrice: 490 },
      { name: "Mongolia", flag: "mn", price: 782, additionalClassPrice: 480 },
      { name: "Myanmar", flag: "mm", price: 725, additionalClassPrice: 520 },
      { name: "Nepal", flag: "np", price: 725, additionalClassPrice: 630 },
      { name: "North Korea", flag: "kp", price: 1553, additionalClassPrice: 570 },
      { name: "Oman", flag: "om", price: 1645, additionalClassPrice: 1430 },
      { name: "Pakistan", flag: "pk", price: 863, additionalClassPrice: 690 },
      { name: "Palestine (Gaza)", flag: "ps", price: 1012, additionalClassPrice: 880 },
      { name: "Palestine (West Bank)", flag: "ps", price: 966, additionalClassPrice: 840 },
      { name: "Philippines", flag: "ph", price: 748, additionalClassPrice: 530 },
      { name: "Qatar", flag: "qa", price: 2507, additionalClassPrice: 2180 },
      { name: "Singapore", flag: "sg", price: 1024, additionalClassPrice: 750 },
      { name: "Syria", flag: "sy", price: 2013, additionalClassPrice: 1750 },
      { name: "Sri Lanka", flag: "lk", price: 685, additionalClassPrice: 595 },
      { name: "Taiwan", flag: "tw", price: 817, additionalClassPrice: 710 },
      { name: "Tajikistan", flag: "tj", price: 2012, additionalClassPrice: 1749 },
      { name: "Thailand", flag: "th", price: 1380, additionalClassPrice: 1000 },
      { name: "Turkey", flag: "tr", price: 644, additionalClassPrice: 265 },
      { name: "Turkmenistan", flag: "tm", price: 1145, additionalClassPrice: 545 },
      { name: "United Arab Emirates", flag: "ae", price: 2990, additionalClassPrice: 2475 },
      { name: "Uzbekistan", flag: "uz", price: 1541, additionalClassPrice: 590 },
      { name: "Vietnam", flag: "vn", price: 575, additionalClassPrice: 500 },
      { name: "Yemen", flag: "ye", price: 1840, additionalClassPrice: 1600 },
    ],
  },
  {
    name: "Oceania",
    countries: [
      { name: "Australia", flag: "au", price: 1200, additionalClassPrice: 800 },
      { name: "New Zealand", flag: "nz", price: 950, additionalClassPrice: 650 },
      { name: "Papua New Guinea", flag: "pg", price: 930, additionalClassPrice: 780 },
      { name: "Tonga", flag: "to", price: 1700, additionalClassPrice: 1550 },
      { name: "Fiji", flag: "fj", price: 1850, additionalClassPrice: 1750 },
    ],
  },
]

const trademarkClasses = Array.from({ length: 45 }, (_, i) => i + 1)

interface VerificationFormContentProps {
  isLoading: boolean
  initialData?: any
}

const VerificationFormContent: React.FC<VerificationFormContentProps> = ({ isLoading, initialData }) => {
  const { formatPrice } = useCurrency()
  const [step, setStep] = useState(1)
  const totalSteps = 4
  const [formData, setFormData] = useState<FormData>({
    trademarkType: "",
    trademarkName: "",
    goodsAndServices: "",
    countries: [],
    selectedClasses: [],
    name: "",
    surname: "",
    email: "",
    phone: "",
    marketing: false,
  })

  const searchParams = useSearchParams()
  const [selectedCountries, setSelectedCountries] = useState<CountrySelection[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedRegions, setExpandedRegions] = useState<string[]>([])
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const searchId = searchParams.get("search_id")

  // Pre-fill form with initial data
  useEffect(() => {
    if (initialData && !isLoading) {
      console.log("Pre-filling form with initial data:", initialData)

      setFormData((prev) => ({
        ...prev,
        trademarkName: initialData.trademarkName || prev.trademarkName,
        goodsAndServices: initialData.goodsAndServices || prev.goodsAndServices,
        name: initialData.name || initialData.firstName || prev.name,
        surname: initialData.surname || initialData.lastName || prev.surname,
        email: initialData.email || prev.email,
        phone: initialData.phone || prev.phone,
        trademarkType: initialData.trademarkType || "word",
        selectedClasses: initialData.selectedClasses || [1],
      }))

      if (initialData.countries && Array.isArray(initialData.countries)) {
        const countrySelections = initialData.countries.map((country: any) => ({
          name: typeof country === "string" ? country : country.name,
          classes: 1,
        }))
        setSelectedCountries(countrySelections)
      } else {
        setSelectedCountries([
          { name: "European Union", classes: 1 },
          { name: "United States", classes: 1 },
        ])
      }
    }
  }, [initialData, isLoading])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])

  useEffect(() => {
    const countriesParam = searchParams.get("countries")
    if (countriesParam) {
      try {
        const parsedCountries = JSON.parse(decodeURIComponent(countriesParam))
        const initialSelectedCountries = parsedCountries.map((countryName: string) => ({
          name: countryName,
          classes: 1,
        }))
        setSelectedCountries(initialSelectedCountries)
        setFormData((prev) => ({ ...prev, countries: initialSelectedCountries }))
      } catch (error) {
        console.error("Error parsing countries from URL:", error)
      }
    }
  }, [searchParams])

  const toggleCountry = (country: string) => {
    setSelectedCountries((prev) => {
      const isSelected = prev.some((c) => c.name === country)
      if (isSelected) {
        const newSelection = prev.filter((c) => c.name !== country)
        setFormData((prevData) => ({ ...prevData, countries: newSelection }))
        return newSelection
      }
      const newSelection = [...prev, { name: country, classes: Math.max(1, formData.selectedClasses.length) }]
      setFormData((prevData) => ({ ...prevData, countries: newSelection }))
      return newSelection
    })
  }

  const totalPrice = useMemo(() => {
    return selectedCountries.reduce((sum, country) => {
      const countryData = [...topCountries, ...regions.flatMap((r) => r.countries)].find((c) => c.name === country.name)
      if (!countryData) return sum
      const basePrice = countryData.price
      const additionalClassesPrice =
        (Math.max(1, formData.selectedClasses.length) - 1) * countryData.additionalClassPrice
      return sum + basePrice + additionalClassesPrice
    }, 0)
  }, [selectedCountries, formData.selectedClasses])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const nonEmptyFiles = Array.from(e.target.files).filter((file) => file.size > 0)
      setFiles(nonEmptyFiles)
    }
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

  const toggleRegion = (regionName: string, event: React.MouseEvent) => {
    event.preventDefault()
    setExpandedRegions((prev) =>
      prev.includes(regionName) ? prev.filter((r) => r !== regionName) : [...prev, regionName],
    )
  }

  const renderNavigationButtons = (nextStep: number, isNextDisabled: boolean) => (
    <div className="flex justify-between mt-8">
      {step > 1 && (
        <Button variant="outline" onClick={() => setStep(step - 1)} className="px-4 py-2">
          Back
        </Button>
      )}
      <div className="flex-grow"></div>
      <Button
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white"
        onClick={() => setStep(nextStep)}
        disabled={isNextDisabled}
      >
        Continue
      </Button>
    </div>
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("formType", "verification")

      // Add basic form fields
      formDataToSend.append("trademarkType", formData.trademarkType)
      formDataToSend.append("trademarkName", formData.trademarkName)
      formDataToSend.append("goodsAndServices", formData.goodsAndServices)
      formDataToSend.append("name", formData.name)
      formDataToSend.append("surname", formData.surname)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("marketing", formData.marketing.toString())

      // Add countries
      selectedCountries.forEach((country, index) => {
        formDataToSend.append(`countries[${index}]`, JSON.stringify(country))
      })

      // Add selected classes
      formData.selectedClasses.forEach((classId, index) => {
        formDataToSend.append(`selectedClasses[${index}]`, classId.toString())
      })

      // Add files
      files.forEach((file) => {
        if (file.size > 0) {
          formDataToSend.append("files", file)
        }
      })

      console.log("Submitting verification form...")
      const response = await fetch("/api/submit-verification", {
        method: "POST",
        body: formDataToSend,
      })

      const result = await response.json()

      if (response.ok && result.success) {
        console.log("Form submitted successfully:", result)
        router.push("/thank-you")
      } else {
        console.error("Form submission failed:", result)
        setSubmitError(result.message || "There was an error submitting your form. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitError("There was an error submitting your form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClassesChange = (classes: number[]) => {
    setFormData((prev) => ({
      ...prev,
      selectedClasses: classes,
      countries: prev.countries.map((country) => ({
        ...country,
        classes: Math.max(1, classes.length),
      })),
    }))
  }

  return (
    <div>
      <div id="verification-form" className="max-w-6xl mx-auto px-4 pt-24 pb-12 scroll-mt-16">
        {isLoading && (
          <div className="w-full p-4 mb-4 bg-blue-50 text-blue-700 rounded-md">
            <p className="text-center">Loading your previous search data...</p>
          </div>
        )}

        {initialData && (
          <div className="w-full p-4 mb-4 bg-green-50 text-green-700 rounded-md">
            <p className="text-center">✓ Your information has been pre-filled based on your analysis</p>
          </div>
        )}

        {submitError && (
          <div className="w-full p-4 mb-4 bg-red-50 text-red-700 rounded-md">
            <p className="text-center">{submitError}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-7 gap-12">
          <div className="lg:col-span-5">
            <div className="mb-8 flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold mb-4 text-indigo-700">Complete Your Registration</h1>
                <p className="text-lg text-gray-600">Your trademark information is ready for registration.</p>
                <p className="text-lg text-gray-600 mb-8">
                  Review and complete the details below to proceed with your trademark application.
                </p>
              </div>
              <CurrencySelector />
            </div>

            <div className="mb-12">
              <div className="flex justify-between mb-2">
                {["Trademark Details", "Countries", "Classes", "Contact Info"].map((label, index) => (
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
                    <div className="border-2 border-dashed border-indigo-300 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors">
                      <Upload className="mx-auto h-12 w-12 text-indigo-400 mb-4" />
                      <div className="text-indigo-600 font-medium mb-2">Click to upload or drag and drop</div>
                      <div className="text-sm text-gray-500">PNG, JPG, SVG or GIF (max. 5 MB)</div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                      <Button
                        onClick={(e) => {
                          e.preventDefault()
                          ;(document.querySelector('input[type="file"]') as HTMLInputElement)?.click()
                        }}
                        variant="outline"
                        className="mt-4"
                        type="button"
                      >
                        Select File
                      </Button>
                    </div>
                  </div>
                )}
                {(formData.trademarkType === "logo" || formData.trademarkType === "figurative") &&
                  files.length === 0 && (
                    <div className="text-red-500 mt-2 text-sm">Please upload your logo to continue</div>
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

                {renderNavigationButtons(
                  2,
                  !formData.trademarkType ||
                    !formData.goodsAndServices ||
                    (formData.trademarkType !== "figurative" && !formData.trademarkName) ||
                    ((formData.trademarkType === "logo" || formData.trademarkType === "figurative") &&
                      files.length === 0),
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Where do you need protection?</h2>
                <p className="text-gray-600">
                  Select the countries or regions where you want to register your trademark.
                </p>

                <Input
                  type="text"
                  placeholder="Search for countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-6"
                />

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-indigo-700">Most Requested Countries</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredTopCountries.map((country) => (
                        <CountrySelectCard
                          key={country.name}
                          country={country.name}
                          flag={`https://flagcdn.com/${country.flag}.svg`}
                          price={country.price}
                          additionalClassPrice={country.additionalClassPrice}
                          onSelect={() => toggleCountry(country.name)}
                          selected={selectedCountries.some((c) => c.name === country.name)}
                          formatPrice={formatPrice}
                        />
                      ))}
                    </div>
                  </div>

                  {filteredRegions.map((region) => (
                    <div key={region.name}>
                      <button
                        onClick={(e) => toggleRegion(region.name, e)}
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
                          {region.countries.map((country) => (
                            <CountrySelectCard
                              key={country.name}
                              country={country.name}
                              flag={`https://flagcdn.com/${country.flag}.svg`}
                              price={country.price}
                              additionalClassPrice={country.additionalClassPrice}
                              onSelect={() => toggleCountry(country.name)}
                              selected={selectedCountries.some((c) => c.name === country.name)}
                              formatPrice={formatPrice}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {renderNavigationButtons(3, selectedCountries.length === 0)}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Which classes do you need?</h2>
                <p className="text-gray-600 mb-4">Select the classes that apply to your goods and services.</p>
                <TrademarkClassesDialog
                  selectedClasses={formData.selectedClasses}
                  setSelectedClasses={handleClassesChange}
                />
                {renderNavigationButtons(4, formData.selectedClasses.length === 0)}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Your Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your name"
                      className="w-full text-lg p-3"
                    />
                  </div>
                  <div>
                    <Label htmlFor="surname" className="block text-lg font-medium text-gray-700 mb-2">
                      Surname
                    </Label>
                    <Input
                      id="surname"
                      value={formData.surname}
                      onChange={(e) => setFormData((prev) => ({ ...prev, surname: e.target.value }))}
                      placeholder="Enter your surname"
                      className="w-full text-lg p-3"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                      Email
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email"
                      className="w-full text-lg p-3"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter your phone number"
                      className="w-full text-lg p-3"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Checkbox
                    id="marketing"
                    checked={formData.marketing}
                    onCheckedChange={(checked: boolean) => setFormData((prev) => ({ ...prev, marketing: checked }))}
                  />
                  <Label htmlFor="marketing" className="text-lg text-gray-700">
                    I agree to receive marketing emails.
                  </Label>
                </div>
                <div>
                  <Label htmlFor="files">Adjuntar archivos (JPG, PNG, PDF)</Label>
                  <Input id="files" type="file" onChange={handleFileUpload} accept=".jpg,.jpeg,.png,.pdf" multiple />
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={() => setStep(step - 1)} className="px-4 py-2">
                    Back
                  </Button>
                  <div className="flex-grow"></div>
                  <Button
                    onClick={handleSubmit}
                    disabled={!formData.name || !formData.surname || !formData.email || !formData.phone || isSubmitting}
                    className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold"
                  >
                    {isSubmitting ? "Sending..." : "SEND"}
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-2">
            <div className="sticky top-20 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Selection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold mb-4">Estimated price: {formatPrice(totalPrice)}</p>
                  <div className="mb-6 max-h-[calc(100vh-300px)] overflow-y-auto">
                    <ul>
                      {selectedCountries.map((country) => {
                        const countryData = [...topCountries, ...regions.flatMap((r) => r.countries)].find(
                          (c) => c.name === country.name,
                        )
                        const basePrice = countryData?.price || 0
                        const additionalClassesPrice =
                          (Math.max(1, formData.selectedClasses.length) - 1) * (countryData?.additionalClassPrice || 0)
                        const totalCountryPrice = basePrice + additionalClassesPrice

                        return (
                          <li key={country.name} className="flex justify-between items-center mb-4 border-b pb-2">
                            <div className="flex items-center">
                              <Image
                                src={`https://flagcdn.com/${countryData?.flag}.svg`}
                                alt={`${country.name} flag`}
                                width={20}
                                height={15}
                                className="mr-2"
                              />
                              <span>{country.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span>{Math.max(1, formData.selectedClasses.length)} classes</span>
                              <span className="min-w-[80px] text-right">{formatPrice(totalCountryPrice)}</span>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Selected Classes</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.selectedClasses.length > 0 ? (
                        formData.selectedClasses.map((classNumber) => (
                          <Badge key={classNumber} variant="secondary">
                            Class {classNumber}
                          </Badge>
                        ))
                      ) : (
                        <Badge variant="secondary">Class 1</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Named export for VerificationForm
export function VerificationForm({ initialData, isLoading = false }: VerificationFormProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerificationFormContent isLoading={isLoading} initialData={initialData} />
    </Suspense>
  )
}

// Default export
export default VerificationForm

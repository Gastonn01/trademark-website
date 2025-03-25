"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CountrySelectCard } from "@/components/country-select-card"
import Image from "next/image"
import { Upload, CheckCircle, ChevronDown, ChevronUp } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

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
  phone: string
  marketing: boolean
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
  {
    name: "Caribbean",
    countries: [
      { name: "Anguilla", flag: "ai" },
      { name: "Antigua and Barbuda", flag: "ag" },
      { name: "Aruba", flag: "aw" },
      { name: "Bahamas", flag: "bs" },
      { name: "Barbados", flag: "bb" },
      { name: "Bermuda", flag: "bm" },
      { name: "British Virgin Islands", flag: "vg" },
      { name: "Cayman Islands", flag: "ky" },
      { name: "Cuba", flag: "cu" },
      { name: "Curacao", flag: "cw" },
      { name: "Dominica", flag: "dm" },
      { name: "Dominican Republic", flag: "do" },
      { name: "Grenada", flag: "gd" },
      { name: "Haiti", flag: "ht" },
      { name: "Jamaica", flag: "jm" },
      { name: "Puerto Rico", flag: "pr" },
      { name: "Saint Kitts and Nevis", flag: "kn" },
      { name: "Saint Lucia", flag: "lc" },
      { name: "Saint Vincent and the Grenadines", flag: "vc" },
      { name: "Trinidad and Tobago", flag: "tt" },
      { name: "Turks and Caicos Islands", flag: "tc" },
    ],
  },
]

export function FreeSearchForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const totalSteps = 3
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

  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedRegions, setExpandedRegions] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)
    const searchId = uuidv4()
    const formDataToSend = new FormData()
    formDataToSend.append("formType", "free-search")
    formDataToSend.append("searchId", searchId)

    // Añadir todos los campos del formulario a formData
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === "string" || value instanceof Blob) {
        formDataToSend.append(key, value)
      } else if (Array.isArray(value)) {
        formDataToSend.append(key, JSON.stringify(value))
      } else if (typeof value === "object" && value !== null) {
        formDataToSend.append(key, JSON.stringify(value))
      }
    })

    // Añadir archivos
    files.forEach((file) => {
      formDataToSend.append("files", file)
    })

    try {
      const response = await fetch("/api/submit-free-search", {
        method: "POST",
        body: formDataToSend,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }

      const contentType = response.headers.get("content-type")
      let result
      if (contentType && contentType.indexOf("application/json") !== -1) {
        result = await response.json()
      } else {
        result = await response.text()
      }

      console.log("Form submitted successfully:", result)
      router.push("/thank-you")
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrorMessage(error instanceof Error ? error.message : "An unknown error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div id="free-search-form" className="max-w-6xl mx-auto px-4 pt-24 pb-12 scroll-mt-16">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-indigo-700">Free Trademark Search</h1>
            <p className="text-lg text-gray-600">Start your trademark journey with a free search.</p>
            <p className="text-lg text-gray-600 mb-8">
              Fill out this simple form to get your free trademark search and expert assessment within 24 hours.
            </p>
          </div>

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
                  {/* Top Countries Section */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-indigo-700">Most Requested Countries</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredTopCountries.map((country) => (
                        <CountrySelectCard
                          key={country.name}
                          country={country.name}
                          flag={`https://flagcdn.com/${country.flag}.svg`}
                          onSelect={() => toggleCountry(country.name)}
                          selected={selectedCountries.includes(country.name)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Other Regions */}
                  {filteredRegions.map((region) => (
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
                          {region.countries.map((country) => (
                            <CountrySelectCard
                              key={country.name}
                              country={country.name}
                              flag={`https://flagcdn.com/${country.flag}.svg`}
                              onSelect={() => toggleCountry(country.name)}
                              selected={selectedCountries.includes(country.name)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

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
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="phone" className="text-gray-700">
                      Phone Number (optional)
                    </Label>
                    <div className="flex gap-2 mt-1">
                      <Select defaultValue="+1">
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+1">🇺🇸 +1</SelectItem>
                          <SelectItem value="+44">🇬🇧 +44</SelectItem>
                          <SelectItem value="+33">🇫🇷 +33</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 555-5555"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="flex-1"
                      />
                    </div>
                  </div>
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
                <div>
                  <Label htmlFor="files">Adjuntar archivos (JPG, PNG, PDF)</Label>
                  <Input
                    id="files"
                    type="file"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFiles(Array.from(e.target.files))
                      }
                    }}
                    accept=".jpg,.jpeg,.png,.pdf"
                    multiple
                  />
                </div>
                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1 py-3 text-lg">
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 py-3 text-lg bg-indigo-600 hover:bg-indigo-700 text-white"
                    disabled={!formData.name || !formData.surname || !formData.email || isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Free Search Request"}
                  </Button>
                </div>
              </div>
            )}
          </form>

          {errorMessage && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">{errorMessage}</div>
          )}

          <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">What happens next?</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>We'll review your application within 24 hours</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>You'll receive a detailed report on your trademark's registrability</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Our experts will guide you through the next steps</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-20 pt-4">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-indigo-700">Your Application Summary</h3>

              <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
                {selectedCountries.length > 0 ? (
                  <>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Selected Countries</div>
                      <ul className="mt-2 space-y-2">
                        {selectedCountries.map((country) => (
                          <li key={country} className="flex items-center">
                            <Image
                              src={`https://flagcdn.com/${[...topCountries, ...regions.flatMap((r) => r.countries)].find((c) => c.name === country)?.flag}.svg`}
                              alt={`${country} flag`}
                              width={20}
                              height={15}
                              className="mr-2"
                            />
                            <span>{country}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-gray-500">No countries selected</div>
                )}

                {formData.trademarkType && (
                  <div>
                    <div className="text-sm font-medium text-gray-500">Trademark Type</div>
                    <div className="font-medium">
                      {formData.trademarkType.charAt(0).toUpperCase() + formData.trademarkType.slice(1)} Mark
                    </div>
                  </div>
                )}

                {formData.trademarkName && (
                  <div>
                    <div className="text-sm font-medium text-gray-500">Trademark Name</div>
                    <div className="font-medium">{formData.trademarkName}</div>
                  </div>
                )}

                {formData.goodsAndServices && (
                  <div>
                    <div className="text-sm font-medium text-gray-500">Goods and Services</div>
                    <div className="font-medium">{formData.goodsAndServices}</div>
                  </div>
                )}

                <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div className="text-sm font-medium text-green-700">Free Initial Check</div>
                  </div>
                  <div className="text-sm text-green-600">
                    Our trademark experts will review your application for free within 24 hours.
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


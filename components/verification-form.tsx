"use client"

import type React from "react"
import { Suspense } from "react"
import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ChevronDown, ChevronUp, Info, X, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { countryPricingData, getTopCountries, getCountriesByRegion } from "@/lib/pricing-data"

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

const topCountries = getTopCountries()
const regionData = getCountriesByRegion()

const regions = Object.entries(regionData).map(([name, countries]) => ({
  name,
  countries,
}))

const trademarkClasses = [
  {
    class: 1,
    description:
      "Chemicals for use in industry, science and photography, as well as in agriculture, horticulture and forestry",
  },
  {
    class: 2,
    description:
      "Paints, varnishes, lacquers; preservatives against rust and against deterioration of wood; colorants, dyes",
  },
  {
    class: 3,
    description:
      "Non-medicated cosmetics and toiletry preparations; non-medicated dentifrices; perfumery, essential oils",
  },
  {
    class: 4,
    description: "Industrial oils and greases, wax; lubricants; dust absorbing, wetting and binding compositions",
  },
  {
    class: 5,
    description: "Pharmaceuticals, medical and veterinary preparations; sanitary preparations for medical purposes",
  },
  {
    class: 6,
    description: "Common metals and their alloys, ores; metal materials for building and construction",
  },
  {
    class: 7,
    description: "Machines, machine tools, power-operated tools; motors and engines (except for land vehicles)",
  },
  {
    class: 8,
    description: "Hand tools and implements, hand-operated; cutlery; side arms, except firearms; razors",
  },
  {
    class: 9,
    description:
      "Scientific, research, navigation, surveying, photographic, cinematographic, audiovisual, optical, weighing, measuring, signalling, detecting, testing, inspecting, life-saving and teaching apparatus and instruments",
  },
  {
    class: 10,
    description: "Surgical, medical, dental and veterinary apparatus and instruments; artificial limbs, eyes and teeth",
  },
  {
    class: 11,
    description:
      "Apparatus and installations for lighting, heating, cooling, steam generating, cooking, drying, ventilating, water supply and sanitary purposes",
  },
  {
    class: 12,
    description: "Vehicles; apparatus for locomotion by land, air or water",
  },
  {
    class: 13,
    description: "Firearms; ammunition and projectiles; explosives; fireworks",
  },
  {
    class: 14,
    description:
      "Precious metals and their alloys; jewellery, precious and semi-precious stones; horological and chronometric instruments",
  },
  {
    class: 15,
    description: "Musical instruments; music stands and stands for musical instruments; conductors' batons",
  },
  {
    class: 16,
    description:
      "Paper and cardboard; printed matter; bookbinding material; photographs; stationery and office requisites, except furniture",
  },
  {
    class: 17,
    description:
      "Unprocessed and semi-processed rubber, gutta-percha, gum, asbestos, mica and substitutes for all these materials",
  },
  {
    class: 18,
    description:
      "Leather and imitations of leather; animal skins and hides; luggage and carrying bags; umbrellas and parasols; walking sticks",
  },
  {
    class: 19,
    description: "Materials, not of metal, for building and construction; rigid pipes, not of metal, for building",
  },
  {
    class: 20,
    description: "Furniture, mirrors, picture frames; containers, not of metal, for storage or transport",
  },
  {
    class: 21,
    description:
      "Household or kitchen utensils and containers; cookware and tableware, except forks, knives and spoons; combs and sponges",
  },
  {
    class: 22,
    description: "Ropes and string; nets; tents and tarpaulins; awnings of textile or synthetic materials; sails",
  },
  {
    class: 23,
    description: "Yarns and threads for textile use",
  },
  {
    class: 24,
    description: "Textiles and substitutes for textiles; household linen; curtains of textile or plastic",
  },
  {
    class: 25,
    description: "Clothing, footwear, headwear",
  },
  {
    class: 26,
    description:
      "Lace, braid and embroidery, and haberdashery ribbons and bows; buttons, hooks and eyes, pins and needles",
  },
  {
    class: 27,
    description:
      "Carpets, rugs, mats and matting, linoleum and other materials for covering existing floors; wall hangings, not of textile",
  },
  {
    class: 28,
    description: "Games, toys and playthings; video game apparatus; gymnastic and sporting articles",
  },
  {
    class: 29,
    description:
      "Meat, fish, poultry and game; meat extracts; preserved, frozen, dried and cooked fruits and vegetables",
  },
  {
    class: 30,
    description:
      "Coffee, tea, cocoa and substitutes therefor; rice, pasta and noodles; tapioca and sago; flour and preparations made from cereals",
  },
  {
    class: 31,
    description:
      "Raw and unprocessed agricultural, aquacultural, horticultural and forestry products; raw and unprocessed grains and seeds",
  },
  {
    class: 32,
    description: "Beers; non-alcoholic beverages; mineral and aerated waters; fruit beverages and fruit juices",
  },
  {
    class: 33,
    description: "Alcoholic beverages, except beers; alcoholic preparations for making beverages",
  },
  {
    class: 34,
    description:
      "Tobacco and tobacco substitutes; cigarettes and cigars; electronic cigarettes and oral vaporizers for smokers",
  },
  {
    class: 35,
    description: "Advertising; business management, organization and administration; office functions",
  },
  {
    class: 36,
    description: "Financial, monetary and banking services; insurance services; real estate affairs",
  },
  {
    class: 37,
    description: "Construction services; installation and repair services; mining extraction, oil and gas drilling",
  },
  {
    class: 38,
    description: "Telecommunications services",
  },
  {
    class: 39,
    description: "Transport; packaging and storage of goods; travel arrangement",
  },
  {
    class: 40,
    description: "Treatment of materials; recycling of waste and trash; air purification and treatment of water",
  },
  {
    class: 41,
    description: "Education; providing of training; entertainment; sporting and cultural activities",
  },
  {
    class: 42,
    description:
      "Scientific and technological services and research and design relating thereto; industrial analysis, industrial research and industrial design services; quality control and authentication services; design and development of computer hardware and software",
  },
  {
    class: 43,
    description: "Services for providing food and drink; temporary accommodation",
  },
  {
    class: 44,
    description:
      "Medical services; veterinary services; hygienic and beauty care for human beings or animals; agriculture, aquaculture, horticulture and forestry services",
  },
  {
    class: 45,
    description:
      "Legal services; security services for the physical protection of tangible property and individuals; personal and social services rendered by others to meet the needs of individuals",
  },
]

interface VerificationFormContentProps {
  isLoading: boolean
  initialData?: any
}

const VerificationFormContent: React.FC<VerificationFormContentProps> = ({ isLoading, initialData }) => {
  const [step, setStep] = useState(1)
  const totalSteps = 4
  const [currency, setCurrency] = useState<"USD" | "EUR">("USD")
  const [formData, setFormData] = useState<FormData>({
    trademarkType: "",
    trademarkName: "",
    goodsAndServices: "",
    countries: [],
    selectedClasses: [], // No default class selection
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
  const [classSearchTerm, setClassSearchTerm] = useState("")
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Pre-fill form with initial data
  useEffect(() => {
    if (initialData && !isLoading) {
      setFormData((prev) => ({
        ...prev,
        trademarkName: initialData.trademarkName || prev.trademarkName,
        goodsAndServices: initialData.goodsAndServices || prev.goodsAndServices,
        name: initialData.name || initialData.firstName || prev.name,
        surname: initialData.surname || initialData.lastName || prev.surname,
        email: initialData.email || prev.email,
        phone: initialData.phone || prev.phone,
        trademarkType: initialData.trademarkType || "word",
        selectedClasses: initialData.selectedClasses || [],
      }))

      if (initialData.countries && Array.isArray(initialData.countries)) {
        const countrySelections = initialData.countries.map((country: any) => ({
          name: typeof country === "string" ? country : country.name,
          classes: 1,
        }))
        setSelectedCountries(countrySelections)
      }
    }
  }, [initialData, isLoading])

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
      const countryData = countryPricingData[country.name]
      if (!countryData) return sum
      const basePrice = countryData.price
      const additionalClassesPrice =
        (Math.max(1, formData.selectedClasses.length) - 1) * countryData.additionalClassPrice
      const totalCountryPrice = basePrice + additionalClassesPrice
      return sum + (currency === "USD" ? totalCountryPrice * 1.09 : totalCountryPrice)
    }, 0)
  }, [selectedCountries, formData.selectedClasses, currency])

  const formatPrice = (price: number) => {
    const symbol = currency === "EUR" ? "€" : "$"
    const currencyCode = currency
    return `${symbol}${Math.floor(price)} ${currencyCode}`
  }

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

  const filteredClasses = useMemo(() => {
    return trademarkClasses.filter(
      (c) =>
        c.description.toLowerCase().includes(classSearchTerm.toLowerCase()) ||
        c.class.toString().includes(classSearchTerm),
    )
  }, [classSearchTerm])

  const toggleRegion = (regionName: string, event: React.MouseEvent) => {
    event.preventDefault()
    setExpandedRegions((prev) =>
      prev.includes(regionName) ? prev.filter((r) => r !== regionName) : [...prev, regionName],
    )
  }

  const toggleClass = (classNumber: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedClasses: prev.selectedClasses.includes(classNumber)
        ? prev.selectedClasses.filter((c) => c !== classNumber)
        : [...prev.selectedClasses, classNumber],
    }))
  }

  const removeClass = (classNumber: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedClasses: prev.selectedClasses.filter((c) => c !== classNumber),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("formType", "verification")
      formDataToSend.append("trademarkType", formData.trademarkType)
      formDataToSend.append("trademarkName", formData.trademarkName)
      formDataToSend.append("goodsAndServices", formData.goodsAndServices)
      formDataToSend.append("name", formData.name)
      formDataToSend.append("surname", formData.surname)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("marketing", formData.marketing.toString())

      selectedCountries.forEach((country, index) => {
        formDataToSend.append(`countries[${index}]`, JSON.stringify(country))
      })

      formData.selectedClasses.forEach((classId, index) => {
        formDataToSend.append(`selectedClasses[${index}]`, classId.toString())
      })

      files.forEach((file) => {
        if (file.size > 0) {
          formDataToSend.append("files", file)
        }
      })

      const response = await fetch("/api/submit-verification", {
        method: "POST",
        body: formDataToSend,
      })

      const result = await response.json()

      if (response.ok && result.success) {
        router.push("/thank-you-verification")
      } else {
        setSubmitError(result.message || "There was an error submitting your form. Please try again.")
      }
    } catch (error) {
      setSubmitError("There was an error submitting your form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const stepTitles = ["Trademark Details", "Countries", "Classes", "Contact Info"]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-indigo-600 mb-4">Complete Your Registration</h1>
          <p className="text-gray-600 mb-2">Your trademark information is ready for registration.</p>
          <p className="text-gray-600">
            Review and complete the details below to proceed with your trademark application.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* Step Navigation */}
            <div className="mb-8">
              <div className="flex justify-between mb-4">
                {stepTitles.map((title, index) => (
                  <div key={title} className="flex flex-col items-center">
                    <button
                      onClick={() => setStep(index + 1)}
                      className={`text-sm font-medium ${
                        step === index + 1 ? "text-indigo-600" : step > index + 1 ? "text-indigo-600" : "text-gray-400"
                      }`}
                    >
                      {title}
                    </button>
                    {index < stepTitles.length - 1 && (
                      <div className={`h-0.5 w-full mt-2 ${step > index + 1 ? "bg-indigo-600" : "bg-gray-200"}`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="h-1 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Content */}
            <Card className="p-8">
              {step === 1 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-semibold text-indigo-600 mb-6">What type of trademark do you have?</h2>

                  <RadioGroup
                    value={formData.trademarkType}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, trademarkType: value }))}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="word" id="word" />
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-xl font-bold">A</span>
                        </div>
                        <div>
                          <Label htmlFor="word" className="text-lg font-medium cursor-pointer">
                            Word Mark
                          </Label>
                          <p className="text-gray-600">Text-based trademark (e.g., brand name)</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="logo" id="logo" />
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-xl">🖼️</span>
                        </div>
                        <div>
                          <Label htmlFor="logo" className="text-lg font-medium cursor-pointer">
                            Logo Mark
                          </Label>
                          <p className="text-gray-600">Visual trademark with or without text</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="figurative" id="figurative" />
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-xl">✨</span>
                        </div>
                        <div>
                          <Label htmlFor="figurative" className="text-lg font-medium cursor-pointer">
                            Figurative Mark
                          </Label>
                          <p className="text-gray-600">Stylized design or symbol</p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>

                  <div className="space-y-4">
                    <Label className="text-lg font-medium">Describe your goods and services</Label>
                    <Textarea
                      value={formData.goodsAndServices}
                      onChange={(e) => setFormData((prev) => ({ ...prev, goodsAndServices: e.target.value }))}
                      placeholder="e.g., Clothing, namely shirts, pants, and hats"
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" })
                        setStep(2)
                      }}
                      disabled={!formData.trademarkType || !formData.goodsAndServices}
                      className="bg-indigo-600 hover:bg-indigo-700 px-8"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Where do you need protection?</h2>
                    <p className="text-gray-600">
                      Select the countries or regions where you want to register your trademark.
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">Select Currency:</span>
                    <div className="flex space-x-2">
                      <Button
                        variant={currency === "USD" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrency("USD")}
                        className={currency === "USD" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
                      >
                        USD ($)
                      </Button>
                      <Button
                        variant={currency === "EUR" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrency("EUR")}
                        className={currency === "EUR" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
                      >
                        EUR (€)
                      </Button>
                    </div>
                  </div>

                  <Input
                    type="text"
                    placeholder="Search for countries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-md"
                  />

                  <div>
                    <h3 className="text-xl font-semibold text-indigo-600 mb-4">Most Requested Countries</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredTopCountries.map((country) => (
                        <div
                          key={country.name}
                          onClick={() => toggleCountry(country.name)}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedCountries.some((c) => c.name === country.name)
                              ? "border-indigo-500 bg-indigo-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Image
                                src={`https://flagcdn.com/${country.flag}.svg`}
                                alt={`${country.name} flag`}
                                width={32}
                                height={24}
                                className="rounded"
                              />
                              <span className="font-medium">{country.name}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">{formatPrice(country.price)}</div>
                              <div className="text-xs text-gray-500 flex items-center">
                                <Info className="w-3 h-3 mr-1" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {filteredRegions.map((region) => (
                    <div key={region.name}>
                      <button
                        onClick={(e) => toggleRegion(region.name, e)}
                        className="flex items-center justify-between w-full text-left text-lg font-semibold text-indigo-600 hover:text-indigo-800 mb-4"
                      >
                        <span>{region.name}</span>
                        {expandedRegions.includes(region.name) ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                      {expandedRegions.includes(region.name) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                          {region.countries.map((country) => (
                            <div
                              key={country.name}
                              onClick={() => toggleCountry(country.name)}
                              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                                selectedCountries.some((c) => c.name === country.name)
                                  ? "border-indigo-500 bg-indigo-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <Image
                                    src={`https://flagcdn.com/${country.flag}.svg`}
                                    alt={`${country.name} flag`}
                                    width={32}
                                    height={24}
                                    className="rounded"
                                  />
                                  <span className="font-medium">{country.name}</span>
                                </div>
                                <div className="text-right">
                                  <div className="font-semibold">{formatPrice(country.price)}</div>
                                  <div className="text-xs text-gray-500 flex items-center">
                                    <Info className="w-3 h-3 mr-1" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" })
                        setStep(1)
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" })
                        setStep(3)
                      }}
                      disabled={selectedCountries.length === 0}
                      className="bg-indigo-600 hover:bg-indigo-700 px-8"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Which classes do you need?</h2>
                    <p className="text-gray-600">Select the classes that apply to your goods and services.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search classes by number or description..."
                        value={classSearchTerm}
                        onChange={(e) => setClassSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    <div className="border rounded-lg max-h-[500px] overflow-y-auto">
                      <div className="p-4 space-y-4">
                        <div>
                          <h4 className="font-semibold text-sm text-gray-700 mb-3">Goods (Classes 1-34)</h4>
                          <div className="space-y-2">
                            {filteredClasses
                              .filter((c) => c.class <= 34)
                              .map((classItem) => (
                                <div
                                  key={classItem.class}
                                  className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                                  onClick={() => toggleClass(classItem.class)}
                                >
                                  <Checkbox
                                    checked={formData.selectedClasses.includes(classItem.class)}
                                    className="mt-1"
                                  />
                                  <div className="flex-1">
                                    <div className="font-medium text-sm">Class {classItem.class}</div>
                                    <div className="text-sm text-gray-600">{classItem.description}</div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <h4 className="font-semibold text-sm text-gray-700 mb-3">Services (Classes 35-45)</h4>
                          <div className="space-y-2">
                            {filteredClasses
                              .filter((c) => c.class >= 35)
                              .map((classItem) => (
                                <div
                                  key={classItem.class}
                                  className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                                  onClick={() => toggleClass(classItem.class)}
                                >
                                  <Checkbox
                                    checked={formData.selectedClasses.includes(classItem.class)}
                                    className="mt-1"
                                  />
                                  <div className="flex-1">
                                    <div className="font-medium text-sm">Class {classItem.class}</div>
                                    <div className="text-sm text-gray-600">{classItem.description}</div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {formData.selectedClasses.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium text-gray-700">
                            Selected Classes ({formData.selectedClasses.length})
                          </Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setFormData((prev) => ({ ...prev, selectedClasses: [] }))}
                            className="text-sm text-gray-600 hover:text-gray-900"
                          >
                            Clear All
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {formData.selectedClasses
                            .sort((a, b) => a - b)
                            .map((classNumber) => {
                              const classInfo = trademarkClasses.find((c) => c.class === classNumber)
                              return (
                                <Popover key={classNumber}>
                                  <PopoverTrigger asChild>
                                    <Badge
                                      variant="secondary"
                                      className="cursor-pointer hover:bg-indigo-100 px-3 py-1.5 text-sm"
                                    >
                                      Class {classNumber}
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          removeClass(classNumber)
                                        }}
                                        className="ml-2 hover:text-red-600"
                                      >
                                        <X className="h-3 w-3" />
                                      </button>
                                    </Badge>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-80">
                                    <div className="space-y-2">
                                      <h4 className="font-semibold">Class {classNumber}</h4>
                                      <p className="text-sm text-gray-600">{classInfo?.description}</p>
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              )
                            })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" })
                        setStep(2)
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" })
                        setStep(4)
                      }}
                      disabled={formData.selectedClasses.length === 0}
                      className="bg-indigo-600 hover:bg-indigo-700 px-8"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-semibold text-indigo-600">Your Contact Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-base font-medium">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="surname" className="text-base font-medium">
                        Surname
                      </Label>
                      <Input
                        id="surname"
                        value={formData.surname}
                        onChange={(e) => setFormData((prev) => ({ ...prev, surname: e.target.value }))}
                        placeholder="Enter your surname"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-base font-medium">
                        Email
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-base font-medium">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter your phone number"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="marketing"
                      checked={formData.marketing}
                      onCheckedChange={(checked: boolean) => setFormData((prev) => ({ ...prev, marketing: checked }))}
                    />
                    <Label htmlFor="marketing" className="text-base">
                      I agree to receive marketing emails.
                    </Label>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Adjuntar archivos (JPG, PNG, PDF)</Label>
                    <Input
                      type="file"
                      onChange={handleFileUpload}
                      accept=".jpg,.jpeg,.png,.pdf"
                      multiple
                      className="mt-1"
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" })
                        setStep(3)
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={
                        !formData.name || !formData.surname || !formData.email || !formData.phone || isSubmitting
                      }
                      className="bg-green-600 hover:bg-green-700 px-8"
                    >
                      {isSubmitting ? "Sending..." : "SEND"}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Your Selection</h3>

                <div className="mb-4">
                  <div className="flex space-x-2">
                    <Button
                      variant={currency === "USD" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrency("USD")}
                      className={`flex-1 ${currency === "USD" ? "bg-indigo-600 hover:bg-indigo-700" : ""}`}
                    >
                      USD ($)
                    </Button>
                    <Button
                      variant={currency === "EUR" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrency("EUR")}
                      className={`flex-1 ${currency === "EUR" ? "bg-indigo-600 hover:bg-indigo-700" : ""}`}
                    >
                      EUR (€)
                    </Button>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-lg font-medium mb-2">Estimated price:</div>
                  <div className="text-3xl font-bold">{formatPrice(totalPrice)}</div>
                </div>

                {selectedCountries.length > 0 && (
                  <div className="mb-6">
                    {selectedCountries.map((country) => {
                      const countryData = countryPricingData[country.name]
                      if (!countryData) {
                        console.error(`Country data not found for: ${country.name}`)
                        return null
                      }
                      return (
                        <div key={country.name} className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Image
                              src={`https://flagcdn.com/${countryData.flag}.svg`}
                              alt={`${country.name} flag`}
                              width={20}
                              height={15}
                              className="rounded"
                            />
                            <span className="text-sm">{country.name} classes</span>
                          </div>
                          <span className="font-semibold">{formatPrice(countryData.price)}</span>
                        </div>
                      )
                    })}
                  </div>
                )}

                <div>
                  <h4 className="font-semibold mb-3">Selected Classes</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.selectedClasses.length > 0 ? (
                      formData.selectedClasses.map((classNumber) => (
                        <Badge key={classNumber} variant="secondary">
                          Class {classNumber}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No classes selected</p>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function VerificationForm({ initialData, isLoading = false }: VerificationFormProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerificationFormContent isLoading={isLoading} initialData={initialData} />
    </Suspense>
  )
}

export default VerificationForm

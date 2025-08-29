"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CountrySelectCard } from "./country-select-card"
import { CurrencySelector } from "./currency-selector"
import { ChevronDown, ChevronUp } from "lucide-react"

// Same pricing data as detailed pricelist
const pricingData = {
  "European Union": { price: 1200, additionalClassPrice: 150, flag: "eu" },
  "United States": { price: 1500, additionalClassPrice: 400, flag: "us" },
  Germany: { price: 900, additionalClassPrice: 300, flag: "de" },
  Spain: { price: 600, additionalClassPrice: 150, flag: "es" },
  "United Kingdom": { price: 900, additionalClassPrice: 200, flag: "gb" },
  France: { price: 900, additionalClassPrice: 200, flag: "fr" },
  Italy: { price: 900, additionalClassPrice: 200, flag: "it" },
  Portugal: { price: 600, additionalClassPrice: 150, flag: "pt" },
  Greece: { price: 600, additionalClassPrice: 150, flag: "gr" },
  Canada: { price: 1200, additionalClassPrice: 300, flag: "ca" },
  Mexico: { price: 800, additionalClassPrice: 200, flag: "mx" },
  Argentina: { price: 1000, additionalClassPrice: 250, flag: "ar" },
  Brazil: { price: 1200, additionalClassPrice: 300, flag: "br" },
  Chile: { price: 800, additionalClassPrice: 200, flag: "cl" },
  Colombia: { price: 800, additionalClassPrice: 200, flag: "co" },
  China: { price: 1000, additionalClassPrice: 200, flag: "cn" },
  Japan: { price: 1500, additionalClassPrice: 400, flag: "jp" },
  India: { price: 800, additionalClassPrice: 150, flag: "in" },
  Australia: { price: 1200, additionalClassPrice: 300, flag: "au" },
  "New Zealand": { price: 1000, additionalClassPrice: 250, flag: "nz" },
}

const topCountries = [
  { name: "European Union", flag: "eu" },
  { name: "United States", flag: "us" },
  { name: "Germany", flag: "de" },
  { name: "Argentina", flag: "ar" },
  { name: "Spain", flag: "es" },
  { name: "United Kingdom", flag: "gb" },
]

const regions = [
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
    ],
  },
  {
    name: "South America",
    countries: [
      { name: "Argentina", flag: "ar" },
      { name: "Brazil", flag: "br" },
      { name: "Chile", flag: "cl" },
      { name: "Colombia", flag: "co" },
    ],
  },
  {
    name: "Asia Pacific",
    countries: [
      { name: "China", flag: "cn" },
      { name: "Japan", flag: "jp" },
      { name: "India", flag: "in" },
      { name: "Australia", flag: "au" },
      { name: "New Zealand", flag: "nz" },
    ],
  },
]

export function VerificationForm() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [expandedRegions, setExpandedRegions] = useState<string[]>([])
  const [currency, setCurrency] = useState<"USD" | "EUR">("USD")
  const [formData, setFormData] = useState({
    trademarkName: "",
    description: "",
    applicantName: "",
    email: "",
    phone: "",
    address: "",
  })

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

  const toggleCountry = (country: string) => {
    setSelectedCountries((prev) => (prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]))
  }

  const toggleRegion = (regionName: string) => {
    setExpandedRegions((prev) =>
      prev.includes(regionName) ? prev.filter((r) => r !== regionName) : [...prev, regionName],
    )
  }

  const totalPrice = selectedCountries.reduce((sum, country) => {
    const countryData = pricingData[country as keyof typeof pricingData]
    return sum + (countryData?.price || 0)
  }, 0)

  const currencySymbol = currency === "USD" ? "$" : "€"

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Trademark Verification</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Complete your trademark application details and select your countries for protection.
        </p>
      </div>

      <CurrencySelector selectedCurrency={currency} onCurrencyChange={handleCurrencyChange} />

      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Application Details</h2>
          <div className="space-y-6">
            <div>
              <Label htmlFor="trademarkName">Trademark Name</Label>
              <Input
                id="trademarkName"
                value={formData.trademarkName}
                onChange={(e) => setFormData((prev) => ({ ...prev, trademarkName: e.target.value }))}
                placeholder="Enter your trademark name"
              />
            </div>

            <div>
              <Label htmlFor="description">Description of Goods/Services</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what your trademark will be used for"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="applicantName">Applicant Name</Label>
              <Input
                id="applicantName"
                value={formData.applicantName}
                onChange={(e) => setFormData((prev) => ({ ...prev, applicantName: e.target.value }))}
                placeholder="Full name or company name"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                placeholder="Full address including country"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Select Countries</h2>

          {selectedCountries.length > 0 && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-indigo-900">Selected: {selectedCountries.length} countries</h3>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-indigo-900">
                    {currencySymbol}
                    {totalPrice.toLocaleString()}
                  </div>
                  <p className="text-xs text-indigo-700">Total for first class</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-indigo-700">Most Popular</h3>
              <div className="grid gap-3">
                {topCountries.map((country) => {
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

            {regions.map((region) => (
              <div key={region.name}>
                <button
                  type="button"
                  onClick={() => toggleRegion(region.name)}
                  className="flex items-center justify-between w-full text-left text-lg font-semibold mb-3 text-indigo-700 hover:text-indigo-900"
                >
                  <span>{region.name}</span>
                  {expandedRegions.includes(region.name) ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {expandedRegions.includes(region.name) && (
                  <div className="grid gap-3 mb-4">
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
          </div>

          <Button className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700">
            Proceed to Payment ({currencySymbol}
            {totalPrice.toLocaleString()})
          </Button>
        </div>
      </div>
    </div>
  )
}

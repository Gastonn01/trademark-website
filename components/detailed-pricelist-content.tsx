"use client"

import { useState, useEffect } from "react"
import { CountrySelectCard } from "./country-select-card"
import { CurrencySelector } from "./currency-selector"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

// Import the pricing data
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

const regions = [
  {
    name: "Most Popular",
    countries: ["European Union", "United States", "Germany", "Spain", "United Kingdom", "Argentina"],
  },
  {
    name: "Europe",
    countries: ["European Union", "Germany", "Spain", "United Kingdom", "France", "Italy", "Portugal", "Greece"],
  },
  {
    name: "Americas",
    countries: ["United States", "Canada", "Mexico", "Argentina", "Brazil", "Chile", "Colombia"],
  },
  {
    name: "Asia Pacific",
    countries: ["China", "Japan", "India", "Australia", "New Zealand"],
  },
]

export function DetailedPricelistContent() {
  const router = useRouter()
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [currency, setCurrency] = useState<"USD" | "EUR">("USD")

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

  const handleGetFreeSearch = () => {
    if (selectedCountries.length > 0) {
      const countriesParam = encodeURIComponent(JSON.stringify(selectedCountries))
      router.push(`/free-search?countries=${countriesParam}`)
    } else {
      router.push("/free-search")
    }
  }

  const totalPrice = selectedCountries.reduce((sum, country) => {
    const countryData = pricingData[country as keyof typeof pricingData]
    return sum + (countryData?.price || 0)
  }, 0)

  const currencySymbol = currency === "USD" ? "$" : "€"

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Detailed Pricing List</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transparent pricing for trademark registration in countries worldwide. Select your countries to see the total
          cost.
        </p>
      </div>

      <CurrencySelector selectedCurrency={currency} onCurrencyChange={handleCurrencyChange} />

      {selectedCountries.length > 0 && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-indigo-900">Selected Countries: {selectedCountries.length}</h3>
              <p className="text-indigo-700">{selectedCountries.join(", ")}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-900">
                {currencySymbol}
                {totalPrice.toLocaleString()}
              </div>
              <p className="text-sm text-indigo-700">Total for first class</p>
            </div>
          </div>
          <Button onClick={handleGetFreeSearch} className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700">
            Get Free Search for Selected Countries
          </Button>
        </div>
      )}

      <div className="space-y-12">
        {regions.map((region) => (
          <div key={region.name}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{region.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {region.countries.map((country) => {
                const countryData = pricingData[country as keyof typeof pricingData]
                return (
                  <CountrySelectCard
                    key={country}
                    country={country}
                    flag={`https://flagcdn.com/${countryData?.flag}.svg`}
                    price={countryData?.price}
                    additionalClassPrice={countryData?.additionalClassPrice}
                    onSelect={() => toggleCountry(country)}
                    selected={selectedCountries.includes(country)}
                    currency={currency}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button onClick={handleGetFreeSearch} size="lg" className="bg-indigo-600 hover:bg-indigo-700">
          Get Free Search
        </Button>
      </div>
    </div>
  )
}

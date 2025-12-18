"use client"

import { useState } from "react"
import { CountrySelectCard } from "./country-select-card"
import { useCurrency } from "@/hooks/use-currency"
import { getCurrencySymbol } from "@/lib/currency-converter"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { countryPricingData } from "@/lib/pricing-data"

const regions = [
  {
    name: "Most Popular",
    countries: ["European Union", "United States", "Germany", "Spain", "United Kingdom", "China"],
  },
  {
    name: "Europe",
    countries: [
      "European Union",
      "Germany",
      "Spain",
      "United Kingdom",
      "France",
      "Italy",
      "Benelux",
      "Portugal",
      "Greece",
      "Bosnia and Herzegovina",
    ],
  },
  {
    name: "North America",
    countries: ["United States", "Canada", "Mexico"],
  },
  {
    name: "South America",
    countries: [
      "Argentina",
      "Bolivia",
      "Brazil",
      "Chile",
      "Colombia",
      "Ecuador",
      "Paraguay",
      "Peru",
      "Uruguay",
      "Venezuela",
    ],
  },
  {
    name: "Central America",
    countries: ["Belize", "Costa Rica", "El Salvador", "Guatemala", "Honduras", "Nicaragua", "Panama"],
  },
  {
    name: "Caribbean",
    countries: [
      "Anguilla",
      "Antigua and Barbuda",
      "Aruba",
      "Bahamas",
      "Barbados",
      "Bermuda",
      "BES Islands",
      "British Virgin Islands",
      "Cayman Islands",
      "Cuba",
      "Curacao",
      "Dominica",
      "Dominican Republic",
      "Grenada",
      "Guyana",
      "Haiti",
      "Jamaica",
      "Montserrat",
      "Puerto Rico",
      "Saint Kitts and Nevis",
      "Saint Lucia",
      "Saint Vincent and the Grenadines",
      "Sint Maarten",
      "Suriname",
      "Trinidad and Tobago",
      "Turks and Caicos Islands",
    ],
  },
  {
    name: "Africa",
    countries: [
      "Algeria",
      "Angola",
      "ARIPO",
      "Botswana",
      "Burundi",
      "Djibouti",
      "Egypt",
      "Ethiopia",
      "Gambia",
      "Ghana",
      "Kenya",
      "Libya",
      "Madagascar",
      "Morocco",
      "Mauritania",
      "Mozambique",
      "Namibia",
      "Nigeria",
      "OAPI",
      "DR Congo",
      "Rwanda",
      "Seychelles",
      "South Africa",
      "Sudan",
      "Tanzania (TANU)",
      "Tanzania (ZAN)",
      "Tunisia",
      "Uganda",
      "Zambia",
      "Zimbabwe",
    ],
  },
  {
    name: "Asia and Middle East",
    countries: [
      "Afghanistan",
      "Saudi Arabia",
      "Armenia",
      "Azerbaijan",
      "Bahrain",
      "Bangladesh",
      "Bhutan",
      "Brunei",
      "Cambodia",
      "Hong Kong",
      "India",
      "Indonesia",
      "Iran",
      "Iraq (Baghdad)",
      "Iraq (Kurdistan)",
      "Japan",
      "Jordan",
      "Kazakhstan",
      "Kyrgyzstan",
      "South Korea",
      "Kuwait",
      "Laos",
      "Lebanon",
      "Macao",
      "Malaysia",
      "Maldives",
      "Mongolia",
      "Myanmar",
      "Nepal",
      "North Korea",
      "Oman",
      "Pakistan",
      "Palestine (Gaza)",
      "Palestine (West Bank)",
      "Philippines",
      "Qatar",
      "Singapore",
      "Syria",
      "Sri Lanka",
      "Taiwan",
      "Tajikistan",
      "Thailand",
      "Turkey",
      "Turkmenistan",
      "United Arab Emirates",
      "Uzbekistan",
      "Vietnam",
      "Yemen",
      "China",
      "Israel",
    ],
  },
]

export function DetailedPricelistContent() {
  const router = useRouter()
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const { currency } = useCurrency()

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
    const countryData = countryPricingData[country]
    const price = countryData?.prices?.[currency] || 0
    return sum + price
  }, 0)

  const currencySymbol = getCurrencySymbol(currency)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-700 mb-4">Detailed Pricing List</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transparent pricing for trademark registration in countries worldwide. Select your countries to see the total
          cost.
        </p>
      </div>

      {selectedCountries.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Selected Countries: {selectedCountries.length}</h3>
              <p className="text-gray-700">{selectedCountries.join(", ")}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-700">
                {currencySymbol}
                {Math.floor(totalPrice).toLocaleString()}
              </div>
              <p className="text-sm text-gray-700">Total for first class</p>
            </div>
          </div>
          <Button onClick={handleGetFreeSearch} className="w-full mt-4 bg-accent hover:bg-accent/90 text-white">
            Get Free Search for Selected Countries
          </Button>
        </div>
      )}

      <div className="space-y-12">
        {regions.map((region) => (
          <div key={region.name}>
            <h2 className="text-2xl font-bold text-gray-700 mb-6">{region.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {region.countries.map((country) => {
                const countryData = countryPricingData[country]
                if (!countryData) return null
                const priceForCurrency = countryData.prices?.[currency] || 0
                return (
                  <CountrySelectCard
                    key={country}
                    country={country}
                    flag={`https://flagcdn.com/${countryData.flag}.svg`}
                    price={priceForCurrency}
                    additionalClassPrice={countryData.additionalClassPrice}
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
        <Button onClick={handleGetFreeSearch} size="lg" className="bg-accent hover:bg-accent/90 text-white">
          Get Free Search
        </Button>
      </div>
    </div>
  )
}

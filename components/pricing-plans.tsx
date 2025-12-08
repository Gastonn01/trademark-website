"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { countryPricingData, type CountryPricing } from "@/lib/pricing-data"
import { useCurrency } from "@/hooks/use-currency"
import { formatPrice } from "@/lib/currency-converter"

interface Country {
  name: string
  flag: string
  price: number
  additionalClassPrice?: number
}

const PricingPlans = () => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const { currency } = useCurrency()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  console.log("[v0] Current currency:", currency)
  console.log("[v0] Mounted:", mounted)
  console.log("[v0] Sample country data:", countryPricingData["European Union"])

  const allCountries = Object.values(countryPricingData)

  const toggleCountry = (countryName: string) => {
    setSelectedCountries((prev) =>
      prev.includes(countryName) ? prev.filter((name) => name !== countryName) : [...prev, countryName],
    )
  }

  const filteredCountries = allCountries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const activeCurrency = mounted ? currency : "USD"
  const totalPrice = selectedCountries.reduce((sum, countryName) => {
    const countryData = countryPricingData[countryName]
    return sum + (countryData ? countryData.prices[activeCurrency] : 0)
  }, 0)

  const CountryCard = ({ country }: { country: CountryPricing }) => {
    const price = country.prices[activeCurrency]
    console.log(
      "[v0] Country:",
      country.name,
      "Active Currency:",
      activeCurrency,
      "Price:",
      price,
      "Prices object:",
      country.prices,
    )
    const additionalPrice = country.additionalClassPrice

    return (
      <div
        className={`flex items-center justify-between p-4 rounded-lg cursor-pointer ${
          selectedCountries.includes(country.name) ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-50"
        }`}
        onClick={() => toggleCountry(country.name)}
      >
        <div className="flex items-center gap-3">
          <Image
            src={country.flag || "/placeholder.svg"}
            alt={`${country.name} flag`}
            width={40}
            height={30}
            className="rounded"
          />
          <span className="text-sm font-medium">{country.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">{formatPrice(price, activeCurrency)}</span>
          {additionalPrice && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Additional class: {formatPrice(additionalPrice, activeCurrency)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Select Your Trademark Coverage</h1>
      <p className="text-center text-gray-600 mb-8">
        Add additional trademark classes for comprehensive protection. Each additional class costs{" "}
        {formatPrice(200, activeCurrency)}.
      </p>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Input
            type="text"
            placeholder="Search for countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-6"
          />

          {searchTerm ? (
            <div className="grid gap-4">
              {filteredCountries.map((country) => (
                <CountryCard key={country.name} country={country} />
              ))}
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4">Most Requested Countries</h2>
              <div className="grid gap-4 mb-8">
                {allCountries
                  .filter((country) => country.mostRequested)
                  .map((country) => (
                    <CountryCard key={country.name} country={country} />
                  ))}
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="north-america">
                  <AccordionTrigger className="text-xl font-semibold">North America</AccordionTrigger>
                  <AccordionContent className="grid gap-4 pt-4">
                    {allCountries
                      .filter((country) => country.region === "North America")
                      .map((country) => (
                        <CountryCard key={country.name} country={country} />
                      ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="europe">
                  <AccordionTrigger className="text-xl font-semibold">Europe</AccordionTrigger>
                  <AccordionContent className="grid gap-4 pt-4">
                    {allCountries
                      .filter((country) => country.region === "Europe")
                      .map((country) => (
                        <CountryCard key={country.name} country={country} />
                      ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="south-america">
                  <AccordionTrigger className="text-xl font-semibold">South America</AccordionTrigger>
                  <AccordionContent className="grid gap-4 pt-4">
                    {allCountries
                      .filter((country) => country.region === "South America")
                      .map((country) => (
                        <CountryCard key={country.name} country={country} />
                      ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="central-america">
                  <AccordionTrigger className="text-xl font-semibold">Central America</AccordionTrigger>
                  <AccordionContent className="grid gap-4 pt-4">
                    {allCountries
                      .filter((country) => country.region === "Central America")
                      .map((country) => (
                        <CountryCard key={country.name} country={country} />
                      ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="caribbean">
                  <AccordionTrigger className="text-xl font-semibold">Caribbean</AccordionTrigger>
                  <AccordionContent className="grid gap-4 pt-4">
                    {allCountries
                      .filter((country) => country.region === "Caribbean")
                      .map((country) => (
                        <CountryCard key={country.name} country={country} />
                      ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-4">Your Selection</h2>
            {selectedCountries.length > 0 ? (
              <div className="space-y-2 mb-6">
                {selectedCountries.map((countryName) => {
                  const countryData = countryPricingData[countryName]
                  if (!countryData) return null
                  const price = countryData.prices[activeCurrency]
                  return (
                    <div key={countryData.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image
                          src={countryData.flag || "/placeholder.svg"}
                          alt={`${countryData.name} flag`}
                          width={24}
                          height={18}
                          className="rounded"
                        />
                        <span>{countryData.name}</span>
                      </div>
                      <span>{formatPrice(price, activeCurrency)}</span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-gray-500 mb-6">No countries selected yet</p>
            )}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-blue-600">{formatPrice(totalPrice, activeCurrency)}</span>
              </div>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/free-search">Start Free Search</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PricingPlans

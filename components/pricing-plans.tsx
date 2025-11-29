"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { countryPricingData } from "@/lib/pricing-data"

interface Country {
  name: string
  flag: string
  price: number
  additionalClassPrice?: number
}

const convertToUSD = (eurPrice: number) => Math.round(eurPrice * 1.09)

const mostRequestedCountries: Country[] = [
  {
    name: "European Union",
    flag: "https://flagcdn.com/w40/eu.png",
    price: convertToUSD(countryPricingData["European Union"].price),
    additionalClassPrice: convertToUSD(countryPricingData["European Union"].additionalClassPrice),
  },
  {
    name: "United States",
    flag: "https://flagcdn.com/w40/us.png",
    price: convertToUSD(countryPricingData["United States"].price),
    additionalClassPrice: convertToUSD(countryPricingData["United States"].additionalClassPrice),
  },
  {
    name: "Germany",
    flag: "https://flagcdn.com/w40/de.png",
    price: convertToUSD(countryPricingData["Germany"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Germany"].additionalClassPrice),
  },
  {
    name: "Spain",
    flag: "https://flagcdn.com/w40/es.png",
    price: convertToUSD(countryPricingData["Spain"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Spain"].additionalClassPrice),
  },
  {
    name: "United Kingdom",
    flag: "https://flagcdn.com/w40/gb.png",
    price: convertToUSD(countryPricingData["United Kingdom"].price),
    additionalClassPrice: convertToUSD(countryPricingData["United Kingdom"].additionalClassPrice),
  },
  {
    name: "China",
    flag: "https://flagcdn.com/w40/cn.png",
    price: convertToUSD(countryPricingData["China"].price),
    additionalClassPrice: convertToUSD(countryPricingData["China"].additionalClassPrice),
  },
]

const northAmericaCountries: Country[] = [
  {
    name: "Canada",
    flag: "https://flagcdn.com/w40/ca.png",
    price: convertToUSD(countryPricingData["Canada"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Canada"].additionalClassPrice),
  },
  {
    name: "Mexico",
    flag: "https://flagcdn.com/w40/mx.png",
    price: convertToUSD(countryPricingData["Mexico"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Mexico"].additionalClassPrice),
  },
]

const centralAmericaCountries: Country[] = [
  {
    name: "Costa Rica",
    flag: "https://flagcdn.com/w40/cr.png",
    price: convertToUSD(countryPricingData["Costa Rica"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Costa Rica"].additionalClassPrice),
  },
  {
    name: "El Salvador",
    flag: "https://flagcdn.com/w40/sv.png",
    price: convertToUSD(countryPricingData["El Salvador"].price),
    additionalClassPrice: convertToUSD(countryPricingData["El Salvador"].additionalClassPrice),
  },
  {
    name: "Guatemala",
    flag: "https://flagcdn.com/w40/gt.png",
    price: convertToUSD(countryPricingData["Guatemala"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Guatemala"].additionalClassPrice),
  },
  {
    name: "Nicaragua",
    flag: "https://flagcdn.com/w40/ni.png",
    price: convertToUSD(countryPricingData["Nicaragua"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Nicaragua"].additionalClassPrice),
  },
  {
    name: "Panama",
    flag: "https://flagcdn.com/w40/pa.png",
    price: convertToUSD(countryPricingData["Panama"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Panama"].additionalClassPrice),
  },
  {
    name: "Honduras",
    flag: "https://flagcdn.com/w40/hn.png",
    price: convertToUSD(countryPricingData["Honduras"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Honduras"].additionalClassPrice),
  },
  {
    name: "Belize",
    flag: "https://flagcdn.com/w40/bz.png",
    price: convertToUSD(countryPricingData["Belize"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Belize"].additionalClassPrice),
  },
]

const southAmericaCountries: Country[] = [
  {
    name: "Argentina",
    flag: "https://flagcdn.com/w40/ar.png",
    price: convertToUSD(countryPricingData["Argentina"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Argentina"].additionalClassPrice),
  },
  {
    name: "Paraguay",
    flag: "https://flagcdn.com/w40/py.png",
    price: convertToUSD(countryPricingData["Paraguay"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Paraguay"].additionalClassPrice),
  },
  {
    name: "Venezuela",
    flag: "https://flagcdn.com/w40/ve.png",
    price: convertToUSD(countryPricingData["Venezuela"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Venezuela"].additionalClassPrice),
  },
  {
    name: "Uruguay",
    flag: "https://flagcdn.com/w40/uy.png",
    price: convertToUSD(countryPricingData["Uruguay"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Uruguay"].additionalClassPrice),
  },
  {
    name: "Ecuador",
    flag: "https://flagcdn.com/w40/ec.png",
    price: convertToUSD(countryPricingData["Ecuador"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Ecuador"].additionalClassPrice),
  },
  {
    name: "Brazil",
    flag: "https://flagcdn.com/w40/br.png",
    price: convertToUSD(countryPricingData["Brazil"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Brazil"].additionalClassPrice),
  },
  {
    name: "Peru",
    flag: "https://flagcdn.com/w40/pe.png",
    price: convertToUSD(countryPricingData["Peru"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Peru"].additionalClassPrice),
  },
  {
    name: "Chile",
    flag: "https://flagcdn.com/w40/cl.png",
    price: convertToUSD(countryPricingData["Chile"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Chile"].additionalClassPrice),
  },
  {
    name: "Bolivia",
    flag: "https://flagcdn.com/w40/bo.png",
    price: convertToUSD(countryPricingData["Bolivia"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Bolivia"].additionalClassPrice),
  },
  {
    name: "Colombia",
    flag: "https://flagcdn.com/w40/co.png",
    price: convertToUSD(countryPricingData["Colombia"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Colombia"].additionalClassPrice),
  },
]

const caribbeanCountries: Country[] = [
  {
    name: "Anguilla",
    flag: "https://flagcdn.com/w40/ai.png",
    price: convertToUSD(countryPricingData["Anguilla"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Anguilla"].additionalClassPrice),
  },
  {
    name: "Antigua and Barbuda",
    flag: "https://flagcdn.com/w40/ag.png",
    price: convertToUSD(countryPricingData["Antigua and Barbuda"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Antigua and Barbuda"].additionalClassPrice),
  },
  {
    name: "Aruba",
    flag: "https://flagcdn.com/w40/aw.png",
    price: convertToUSD(countryPricingData["Aruba"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Aruba"].additionalClassPrice),
  },
  {
    name: "Bahamas",
    flag: "https://flagcdn.com/w40/bs.png",
    price: convertToUSD(countryPricingData["Bahamas"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Bahamas"].additionalClassPrice),
  },
  {
    name: "Barbados",
    flag: "https://flagcdn.com/w40/bb.png",
    price: convertToUSD(countryPricingData["Barbados"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Barbados"].additionalClassPrice),
  },
  {
    name: "Bermuda",
    flag: "https://flagcdn.com/w40/bm.png",
    price: convertToUSD(countryPricingData["Bermuda"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Bermuda"].additionalClassPrice),
  },
  {
    name: "British Virgin Islands",
    flag: "https://flagcdn.com/w40/vg.png",
    price: convertToUSD(countryPricingData["British Virgin Islands"].price),
    additionalClassPrice: convertToUSD(countryPricingData["British Virgin Islands"].additionalClassPrice),
  },
  {
    name: "Cayman Islands",
    flag: "https://flagcdn.com/w40/ky.png",
    price: convertToUSD(countryPricingData["Cayman Islands"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Cayman Islands"].additionalClassPrice),
  },
  {
    name: "Cuba",
    flag: "https://flagcdn.com/w40/cu.png",
    price: convertToUSD(countryPricingData["Cuba"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Cuba"].additionalClassPrice),
  },
  {
    name: "Curacao",
    flag: "https://flagcdn.com/w40/cw.png",
    price: convertToUSD(countryPricingData["Curacao"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Curacao"].additionalClassPrice),
  },
  {
    name: "Dominica",
    flag: "https://flagcdn.com/w40/dm.png",
    price: convertToUSD(countryPricingData["Dominica"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Dominica"].additionalClassPrice),
  },
  {
    name: "Grenada",
    flag: "https://flagcdn.com/w40/gd.png",
    price: convertToUSD(countryPricingData["Grenada"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Grenada"].additionalClassPrice),
  },
  {
    name: "Guyana",
    flag: "https://flagcdn.com/w40/gy.png",
    price: convertToUSD(countryPricingData["Guyana"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Guyana"].additionalClassPrice),
  },
  {
    name: "Haiti",
    flag: "https://flagcdn.com/w40/ht.png",
    price: convertToUSD(countryPricingData["Haiti"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Haiti"].additionalClassPrice),
  },
  {
    name: "Jamaica",
    flag: "https://flagcdn.com/w40/jm.png",
    price: convertToUSD(countryPricingData["Jamaica"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Jamaica"].additionalClassPrice),
  },
  {
    name: "Montserrat",
    flag: "https://flagcdn.com/w40/ms.png",
    price: convertToUSD(countryPricingData["Montserrat"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Montserrat"].additionalClassPrice),
  },
  {
    name: "Puerto Rico",
    flag: "https://flagcdn.com/w40/pr.png",
    price: convertToUSD(countryPricingData["Puerto Rico"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Puerto Rico"].additionalClassPrice),
  },
  {
    name: "Dominican Republic",
    flag: "https://flagcdn.com/w40/do.png",
    price: convertToUSD(countryPricingData["Dominican Republic"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Dominican Republic"].additionalClassPrice),
  },
  {
    name: "Saint Kitts and Nevis",
    flag: "https://flagcdn.com/w40/kn.png",
    price: convertToUSD(countryPricingData["Saint Kitts and Nevis"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Saint Kitts and Nevis"].additionalClassPrice),
  },
  {
    name: "Saint Lucia",
    flag: "https://flagcdn.com/w40/lc.png",
    price: convertToUSD(countryPricingData["Saint Lucia"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Saint Lucia"].additionalClassPrice),
  },
  {
    name: "Saint Vincent and the Grenadines",
    flag: "https://flagcdn.com/w40/vc.png",
    price: convertToUSD(countryPricingData["Saint Vincent and the Grenadines"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Saint Vincent and the Grenadines"].additionalClassPrice),
  },
  {
    name: "Sint Maarten",
    flag: "https://flagcdn.com/w40/sx.png",
    price: convertToUSD(countryPricingData["Sint Maarten"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Sint Maarten"].additionalClassPrice),
  },
  {
    name: "Suriname",
    flag: "https://flagcdn.com/w40/sr.png",
    price: convertToUSD(countryPricingData["Suriname"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Suriname"].additionalClassPrice),
  },
  {
    name: "Trinidad and Tobago",
    flag: "https://flagcdn.com/w40/tt.png",
    price: convertToUSD(countryPricingData["Trinidad and Tobago"].price),
    additionalClassPrice: convertToUSD(countryPricingData["Trinidad and Tobago"].additionalClassPrice),
  },
]

export function PricingPlans() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const allCountries = [
    ...mostRequestedCountries,
    ...northAmericaCountries,
    ...centralAmericaCountries,
    ...southAmericaCountries,
    ...caribbeanCountries,
  ]

  const toggleCountry = (countryName: string) => {
    setSelectedCountries((prev) =>
      prev.includes(countryName) ? prev.filter((name) => name !== countryName) : [...prev, countryName],
    )
  }

  const filteredCountries = allCountries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPrice = selectedCountries.reduce((sum, countryName) => {
    const country = allCountries.find((c) => c.name === countryName)
    return sum + (country?.price || 0)
  }, 0)

  const CountryCard = ({ country }: { country: Country }) => (
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
        <span className="font-semibold">${country.price}</span>
        {country.additionalClassPrice && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-6 w-6 p-0 ${
                    selectedCountries.includes(country.name)
                      ? "text-white hover:text-white/90"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Additional class price: ${country.additionalClassPrice}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Select Your Trademark Coverage</h1>
      <p className="text-center text-gray-600 mb-8">
        Add additional trademark classes for comprehensive protection. Each additional class costs $200.
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
                {mostRequestedCountries.map((country) => (
                  <CountryCard key={country.name} country={country} />
                ))}
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="north-america">
                  <AccordionTrigger className="text-xl font-semibold">North America</AccordionTrigger>
                  <AccordionContent className="grid gap-4 pt-4">
                    {northAmericaCountries.map((country) => (
                      <CountryCard key={country.name} country={country} />
                    ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="europe">
                  <AccordionTrigger className="text-xl font-semibold">Europe</AccordionTrigger>
                  <AccordionContent className="grid gap-4 pt-4">
                    {mostRequestedCountries
                      .filter(
                        (country) =>
                          country.name !== "European Union" &&
                          country.name !== "United States" &&
                          country.name !== "Germany" &&
                          country.name !== "Spain" &&
                          country.name !== "United Kingdom" &&
                          country.name !== "China",
                      )
                      .map((country) => (
                        <CountryCard key={country.name} country={country} />
                      ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="south-america">
                  <AccordionTrigger className="text-xl font-semibold">South America</AccordionTrigger>
                  <AccordionContent className="grid gap-4 pt-4">
                    {southAmericaCountries.map((country) => (
                      <CountryCard key={country.name} country={country} />
                    ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="central-america">
                  <AccordionTrigger className="text-xl font-semibold">Central America</AccordionTrigger>
                  <AccordionContent className="grid gap-4 pt-4">
                    {centralAmericaCountries.map((country) => (
                      <CountryCard key={country.name} country={country} />
                    ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="caribbean">
                  <AccordionTrigger className="text-xl font-semibold">Caribbean</AccordionTrigger>
                  <AccordionContent className="grid gap-4 pt-4">
                    {caribbeanCountries.map((country) => (
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
              <div className="space-y-4 mb-6">
                {selectedCountries.map((countryName) => {
                  const country = allCountries.find((c) => c.name === countryName)
                  if (!country) return null
                  return (
                    <div key={country.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image
                          src={country.flag || "/placeholder.svg"}
                          alt={`${country.name} flag`}
                          width={24}
                          height={18}
                          className="rounded"
                        />
                        <span>{country.name}</span>
                      </div>
                      <span className="font-semibold">${country.price}</span>
                    </div>
                  )
                })}
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold">
                    <span>Estimated price:</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 mb-6">Select countries to see the estimated price</p>
            )}
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              asChild
              disabled={selectedCountries.length === 0}
            >
              <Link href="/free-search">Start Registration Process</Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

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

interface Country {
  name: string
  flag: string
  price: number
  additionalClassPrice?: number
}

const mostRequestedCountries: Country[] = [
  { name: "European Union", flag: "https://flagcdn.com/w40/eu.png", price: 1900 },
  { name: "United States", flag: "https://flagcdn.com/w40/us.png", price: 1050 },
  { name: "Germany", flag: "https://flagcdn.com/w40/de.png", price: 750 },
  { name: "Spain", flag: "https://flagcdn.com/w40/es.png", price: 490 },
  { name: "United Kingdom", flag: "https://flagcdn.com/w40/gb.png", price: 790 },
  { name: "China", flag: "https://flagcdn.com/w40/cn.png", price: 590 },
]

const northAmericaCountries: Country[] = [
  { name: "Canada", flag: "https://flagcdn.com/w40/ca.png", price: 1400 },
  { name: "Mexico", flag: "https://flagcdn.com/w40/mx.png", price: 750 },
]

const centralAmericaCountries: Country[] = [
  { name: "Costa Rica", flag: "https://flagcdn.com/w40/cr.png", price: 620 },
  { name: "El Salvador", flag: "https://flagcdn.com/w40/sv.png", price: 650 },
  { name: "Guatemala", flag: "https://flagcdn.com/w40/gt.png", price: 680 },
  { name: "Nicaragua", flag: "https://flagcdn.com/w40/ni.png", price: 700 },
  { name: "Panama", flag: "https://flagcdn.com/w40/pa.png", price: 700 },
  { name: "Honduras", flag: "https://flagcdn.com/w40/hn.png", price: 750 },
  { name: "Belize", flag: "https://flagcdn.com/w40/bz.png", price: 980 },
]

const southAmericaCountries: Country[] = [
  { name: "Argentina", flag: "https://flagcdn.com/w40/ar.png", price: 520 },
  { name: "Paraguay", flag: "https://flagcdn.com/w40/py.png", price: 580 },
  { name: "Venezuela", flag: "https://flagcdn.com/w40/ve.png", price: 680 },
  { name: "Uruguay", flag: "https://flagcdn.com/w40/uy.png", price: 680 },
  { name: "Ecuador", flag: "https://flagcdn.com/w40/ec.png", price: 700 },
  { name: "Brazil", flag: "https://flagcdn.com/w40/br.png", price: 720 },
  { name: "Peru", flag: "https://flagcdn.com/w40/pe.png", price: 750 },
  { name: "Chile", flag: "https://flagcdn.com/w40/cl.png", price: 780 },
  { name: "Bolivia", flag: "https://flagcdn.com/w40/bo.png", price: 850 },
  { name: "Colombia", flag: "https://flagcdn.com/w40/co.png", price: 880 },
]

const caribbeanCountries: Country[] = [
  { name: "Anguilla", flag: "https://flagcdn.com/w40/ai.png", price: 1100 },
  { name: "Antigua and Barbuda", flag: "https://flagcdn.com/w40/ag.png", price: 850 },
  { name: "Aruba", flag: "https://flagcdn.com/w40/aw.png", price: 1050 },
  { name: "Bahamas", flag: "https://flagcdn.com/w40/bs.png", price: 1150 },
  { name: "Barbados", flag: "https://flagcdn.com/w40/bb.png", price: 1400 },
  { name: "Bermuda", flag: "https://flagcdn.com/w40/bm.png", price: 1850 },
  { name: "British Virgin Islands", flag: "https://flagcdn.com/w40/vg.png", price: 1100 },
  { name: "Cayman Islands", flag: "https://flagcdn.com/w40/ky.png", price: 1350 },
  { name: "Cuba", flag: "https://flagcdn.com/w40/cu.png", price: 1450 },
  { name: "Curacao", flag: "https://flagcdn.com/w40/cw.png", price: 1300 },
  { name: "Dominica", flag: "https://flagcdn.com/w40/dm.png", price: 1150 },
  { name: "Grenada", flag: "https://flagcdn.com/w40/gd.png", price: 1250 },
  { name: "Guyana", flag: "https://flagcdn.com/w40/gy.png", price: 650 },
  { name: "Haiti", flag: "https://flagcdn.com/w40/ht.png", price: 800 },
  { name: "Jamaica", flag: "https://flagcdn.com/w40/jm.png", price: 1350 },
  { name: "Montserrat", flag: "https://flagcdn.com/w40/ms.png", price: 800 },
  { name: "Puerto Rico", flag: "https://flagcdn.com/w40/pr.png", price: 900 },
  { name: "Dominican Republic", flag: "https://flagcdn.com/w40/do.png", price: 700 },
  { name: "Saint Kitts and Nevis", flag: "https://flagcdn.com/w40/kn.png", price: 1200 },
  { name: "Saint Lucia", flag: "https://flagcdn.com/w40/lc.png", price: 1150 },
  { name: "Saint Vincent and the Grenadines", flag: "https://flagcdn.com/w40/vc.png", price: 750 },
  { name: "Sint Maarten", flag: "https://flagcdn.com/w40/sx.png", price: 1350 },
  { name: "Suriname", flag: "https://flagcdn.com/w40/sr.png", price: 950 },
  { name: "Trinidad and Tobago", flag: "https://flagcdn.com/w40/tt.png", price: 900 },
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
                    {/*europeCountries.map((country) => (
                      <CountryCard key={country.name} country={country} />
                    ))*/}
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

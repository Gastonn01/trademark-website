"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CountrySelectCard } from "@/components/country-select-card"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { countryPricingData } from "@/lib/pricing-data"

const primaryCountries = [
  { name: "United States", flag: "https://flagcdn.com/w40/us.png", price: countryPricingData["United States"].price },
  { name: "European Union", flag: "https://flagcdn.com/w40/eu.png", price: countryPricingData["European Union"].price },
  { name: "United Kingdom", flag: "https://flagcdn.com/w40/gb.png", price: countryPricingData["United Kingdom"].price },
  { name: "Canada", flag: "https://flagcdn.com/w40/ca.png", price: countryPricingData["Canada"].price },
  { name: "China", flag: "https://flagcdn.com/w40/cn.png", price: countryPricingData["China"].price },
  { name: "Japan", flag: "https://flagcdn.com/w40/jp.png", price: countryPricingData["Japan"].price },
]

const secondaryCountries = [
  ...primaryCountries,
  { name: "Argentina", flag: "https://flagcdn.com/w40/ar.png", price: countryPricingData["Argentina"].price },
  { name: "Bolivia", flag: "https://flagcdn.com/w40/bo.png", price: countryPricingData["Bolivia"].price },
  { name: "Brazil", flag: "https://flagcdn.com/w40/br.png", price: countryPricingData["Brazil"].price },
  { name: "Chile", flag: "https://flagcdn.com/w40/cl.png", price: countryPricingData["Chile"].price },
  { name: "Colombia", flag: "https://flagcdn.com/w40/co.png", price: countryPricingData["Colombia"].price },
  { name: "Ecuador", flag: "https://flagcdn.com/w40/ec.png", price: countryPricingData["Ecuador"].price },
  { name: "Paraguay", flag: "https://flagcdn.com/w40/py.png", price: countryPricingData["Paraguay"].price },
  { name: "Peru", flag: "https://flagcdn.com/w40/pe.png", price: countryPricingData["Peru"].price },
  { name: "Uruguay", flag: "https://flagcdn.com/w40/uy.png", price: countryPricingData["Uruguay"].price },
  { name: "Venezuela", flag: "https://flagcdn.com/w40/ve.png", price: countryPricingData["Venezuela"].price },
  { name: "Anguilla", flag: "https://flagcdn.com/w40/ai.png", price: countryPricingData["Anguilla"].price },
  {
    name: "Antigua and Barbuda",
    flag: "https://flagcdn.com/w40/ag.png",
    price: countryPricingData["Antigua and Barbuda"].price,
  },
  { name: "Aruba", flag: "https://flagcdn.com/w40/aw.png", price: countryPricingData["Aruba"].price },
  { name: "Bahamas", flag: "https://flagcdn.com/w40/bs.png", price: countryPricingData["Bahamas"].price },
  { name: "Barbados", flag: "https://flagcdn.com/w40/bb.png", price: countryPricingData["Barbados"].price },
  { name: "Bermuda", flag: "https://flagcdn.com/w40/bm.png", price: countryPricingData["Bermuda"].price },
  {
    name: "British Virgin Islands",
    flag: "https://flagcdn.com/w40/vg.png",
    price: countryPricingData["British Virgin Islands"].price,
  },
  { name: "Cayman Islands", flag: "https://flagcdn.com/w40/ky.png", price: countryPricingData["Cayman Islands"].price },
  { name: "Cuba", flag: "https://flagcdn.com/w40/cu.png", price: countryPricingData["Cuba"].price },
  { name: "Curacao", flag: "https://flagcdn.com/w40/cw.png", price: countryPricingData["Curacao"].price },
  { name: "Dominica", flag: "https://flagcdn.com/w40/dm.png", price: countryPricingData["Dominica"].price },
  { name: "Grenada", flag: "https://flagcdn.com/w40/gd.png", price: countryPricingData["Grenada"].price },
  { name: "Guyana", flag: "https://flagcdn.com/w40/gy.png", price: countryPricingData["Guyana"].price },
  { name: "Haiti", flag: "https://flagcdn.com/w40/ht.png", price: countryPricingData["Haiti"].price },
  { name: "Jamaica", flag: "https://flagcdn.com/w40/jm.png", price: countryPricingData["Jamaica"].price },
  { name: "Montserrat", flag: "https://flagcdn.com/w40/ms.png", price: countryPricingData["Montserrat"].price },
  { name: "Puerto Rico", flag: "https://flagcdn.com/w40/pr.png", price: countryPricingData["Puerto Rico"].price },
  {
    name: "Dominican Republic",
    flag: "https://flagcdn.com/w40/do.png",
    price: countryPricingData["Dominican Republic"].price,
  },
  {
    name: "Saint Kitts and Nevis",
    flag: "https://flagcdn.com/w40/kn.png",
    price: countryPricingData["Saint Kitts and Nevis"].price,
  },
  { name: "Saint Lucia", flag: "https://flagcdn.com/w40/lc.png", price: countryPricingData["Saint Lucia"].price },
  {
    name: "Saint Vincent and the Grenadines",
    flag: "https://flagcdn.com/w40/vc.png",
    price: countryPricingData["Saint Vincent and the Grenadines"].price,
  },
  { name: "Sint Maarten", flag: "https://flagcdn.com/w40/sx.png", price: countryPricingData["Sint Maarten"].price },
  { name: "Suriname", flag: "https://flagcdn.com/w40/sr.png", price: countryPricingData["Suriname"].price },
  {
    name: "Trinidad and Tobago",
    flag: "https://flagcdn.com/w40/tt.png",
    price: countryPricingData["Trinidad and Tobago"].price,
  },
  { name: "Mexico", flag: "https://flagcdn.com/w40/mx.png", price: countryPricingData["Mexico"].price },
  { name: "Spain", flag: "https://flagcdn.com/w40/es.png", price: countryPricingData["Spain"].price },
  { name: "France", flag: "https://flagcdn.com/w40/fr.png", price: countryPricingData["France"].price },
  { name: "Italy", flag: "https://flagcdn.com/w40/it.png", price: countryPricingData["Italy"].price },
  { name: "Benelux", flag: "https://flagcdn.com/w40/be.png", price: countryPricingData["Benelux"].price },
  { name: "Portugal", flag: "https://flagcdn.com/w40/pt.png", price: countryPricingData["Portugal"].price },
  { name: "Germany", flag: "https://flagcdn.com/w40/de.png", price: countryPricingData["Germany"].price },
  { name: "Greece", flag: "https://flagcdn.com/w40/gr.png", price: countryPricingData["Greece"].price },
  {
    name: "Bosnia and Herzegovina",
    flag: "https://flagcdn.com/w40/ba.png",
    price: countryPricingData["Bosnia and Herzegovina"].price,
  },
  { name: "Afghanistan", flag: "https://flagcdn.com/w40/af.png", price: countryPricingData["Afghanistan"].price },
  { name: "Saudi Arabia", flag: "https://flagcdn.com/w40/sa.png", price: countryPricingData["Saudi Arabia"].price },
  { name: "Armenia", flag: "https://flagcdn.com/w40/am.png", price: countryPricingData["Armenia"].price },
  { name: "Azerbaijan", flag: "https://flagcdn.com/w40/az.png", price: countryPricingData["Azerbaijan"].price },
  { name: "Bahrain", flag: "https://flagcdn.com/w40/bh.png", price: countryPricingData["Bahrain"].price },
  { name: "Bangladesh", flag: "https://flagcdn.com/w40/bd.png", price: countryPricingData["Bangladesh"].price },
  { name: "Bhutan", flag: "https://flagcdn.com/w40/bt.png", price: countryPricingData["Bhutan"].price },
  { name: "Brunei", flag: "https://flagcdn.com/w40/bn.png", price: countryPricingData["Brunei"].price },
  { name: "Cambodia", flag: "https://flagcdn.com/w40/kh.png", price: countryPricingData["Cambodia"].price },
  { name: "Hong Kong", flag: "https://flagcdn.com/w40/hk.png", price: countryPricingData["Hong Kong"].price },
  { name: "India", flag: "https://flagcdn.com/w40/in.png", price: countryPricingData["India"].price },
  { name: "Indonesia", flag: "https://flagcdn.com/w40/id.png", price: countryPricingData["Indonesia"].price },
  { name: "Iran", flag: "https://flagcdn.com/w40/ir.png", price: countryPricingData["Iran"].price },
  { name: "Iraq (Baghdad)", flag: "https://flagcdn.com/w40/iq.png", price: countryPricingData["Iraq (Baghdad)"].price },
  { name: "Jordan", flag: "https://flagcdn.com/w40/jo.png", price: countryPricingData["Jordan"].price },
  { name: "Kazakhstan", flag: "https://flagcdn.com/w40/kz.png", price: countryPricingData["Kazakhstan"].price },
  { name: "Kyrgyzstan", flag: "https://flagcdn.com/w40/kg.png", price: countryPricingData["Kyrgyzstan"].price },
  { name: "South Korea", flag: "https://flagcdn.com/w40/kr.png", price: countryPricingData["South Korea"].price },
  { name: "Kuwait", flag: "https://flagcdn.com/w40/kw.png", price: countryPricingData["Kuwait"].price },
  { name: "Laos", flag: "https://flagcdn.com/w40/la.png", price: countryPricingData["Laos"].price },
  { name: "Lebanon", flag: "https://flagcdn.com/w40/lb.png", price: countryPricingData["Lebanon"].price },
  { name: "Macao", flag: "https://flagcdn.com/w40/mo.png", price: countryPricingData["Macao"].price },
  { name: "Malaysia", flag: "https://flagcdn.com/w40/my.png", price: countryPricingData["Malaysia"].price },
  { name: "Maldives", flag: "https://flagcdn.com/w40/mv.png", price: countryPricingData["Maldives"].price },
  { name: "Mongolia", flag: "https://flagcdn.com/w40/mn.png", price: countryPricingData["Mongolia"].price },
  { name: "Myanmar", flag: "https://flagcdn.com/w40/mm.png", price: countryPricingData["Myanmar"].price },
  { name: "Nepal", flag: "https://flagcdn.com/w40/np.png", price: countryPricingData["Nepal"].price },
  { name: "North Korea", flag: "https://flagcdn.com/w40/kp.png", price: countryPricingData["North Korea"].price },
  { name: "Oman", flag: "https://flagcdn.com/w40/om.png", price: countryPricingData["Oman"].price },
  { name: "Pakistan", flag: "https://flagcdn.com/w40/pk.png", price: countryPricingData["Pakistan"].price },
  {
    name: "Palestine (Gaza)",
    flag: "https://flagcdn.com/w40/ps.png",
    price: countryPricingData["Palestine (Gaza)"].price,
  },
  { name: "Philippines", flag: "https://flagcdn.com/w40/ph.png", price: countryPricingData["Philippines"].price },
  { name: "Qatar", flag: "https://flagcdn.com/w40/qa.png", price: countryPricingData["Qatar"].price },
  { name: "Singapore", flag: "https://flagcdn.com/w40/sg.png", price: countryPricingData["Singapore"].price },
  { name: "Syria", flag: "https://flagcdn.com/w40/sy.png", price: countryPricingData["Syria"].price },
  { name: "Sri Lanka", flag: "https://flagcdn.com/w40/lk.png", price: countryPricingData["Sri Lanka"].price },
  { name: "Taiwan", flag: "https://flagcdn.com/w40/tw.png", price: countryPricingData["Taiwan"].price },
  { name: "Tajikistan", flag: "https://flagcdn.com/w40/tj.png", price: countryPricingData["Tajikistan"].price },
  { name: "Thailand", flag: "https://flagcdn.com/w40/th.png", price: countryPricingData["Thailand"].price },
  { name: "Turkey", flag: "https://flagcdn.com/w40/tr.png", price: countryPricingData["Turkey"].price },
  { name: "Turkmenistan", flag: "https://flagcdn.com/w40/tm.png", price: countryPricingData["Turkmenistan"].price },
  {
    name: "United Arab Emirates",
    flag: "https://flagcdn.com/w40/ae.png",
    price: countryPricingData["United Arab Emirates"].price,
  },
  { name: "Uzbekistan", flag: "https://flagcdn.com/w40/uz.png", price: countryPricingData["Uzbekistan"].price },
  { name: "Vietnam", flag: "https://flagcdn.com/w40/vn.png", price: countryPricingData["Vietnam"].price },
  { name: "Yemen", flag: "https://flagcdn.com/w40/ye.png", price: countryPricingData["Yemen"].price },
]

export function DetailedPricelist() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const toggleCountry = (country: string) => {
    setSelectedCountries((prev) => (prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]))
  }

  const totalPrice = selectedCountries.reduce((sum, country) => {
    const countryData = secondaryCountries.find((c) => c.name === country)
    return sum + Math.floor(countryData?.price || 0)
  }, 0)

  const filteredSecondaryCountries = secondaryCountries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Detailed Price List</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Most Requested</h2>
          <div className="grid gap-4">
            {primaryCountries.map(
              (country, index) =>
                index % 2 === 0 && (
                  <div key={country.name} className="grid md:grid-cols-2 gap-4">
                    <CountrySelectCard
                      country={country.name}
                      flag={country.flag}
                      price={country.price}
                      onSelect={() => toggleCountry(country.name)}
                      selected={selectedCountries.includes(country.name)}
                    />
                    {primaryCountries[index + 1] && (
                      <CountrySelectCard
                        country={primaryCountries[index + 1].name}
                        flag={primaryCountries[index + 1].flag}
                        price={primaryCountries[index + 1].price}
                        onSelect={() => toggleCountry(primaryCountries[index + 1].name)}
                        selected={selectedCountries.includes(primaryCountries[index + 1].name)}
                      />
                    )}
                  </div>
                ),
            )}
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">See all</h2>
          <Input
            type="text"
            placeholder="Search for more countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <div className="grid gap-4">
            {filteredSecondaryCountries.map(
              (country, index) =>
                index % 2 === 0 && (
                  <div key={country.name} className="grid md:grid-cols-2 gap-4">
                    <CountrySelectCard
                      country={country.name}
                      flag={country.flag}
                      price={country.price}
                      onSelect={() => toggleCountry(country.name)}
                      selected={selectedCountries.includes(country.name)}
                    />
                    {filteredSecondaryCountries[index + 1] && (
                      <CountrySelectCard
                        country={filteredSecondaryCountries[index + 1].name}
                        flag={filteredSecondaryCountries[index + 1].flag}
                        price={filteredSecondaryCountries[index + 1].price}
                        onSelect={() => toggleCountry(filteredSecondaryCountries[index + 1].name)}
                        selected={selectedCountries.includes(filteredSecondaryCountries[index + 1].name)}
                      />
                    )}
                  </div>
                ),
            )}
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mb-4">Total: ${totalPrice}</p>
            <ul className="mb-6 max-h-96 overflow-y-auto">
              {selectedCountries.map((country) => {
                const countryData = secondaryCountries.find((c) => c.name === country)
                return (
                  <li key={country} className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Image
                        src={countryData?.flag || "https://flagcdn.com/w40/xx.png"}
                        alt={`${country} flag`}
                        width={40}
                        height={30}
                        className="mr-2"
                      />
                      <span>{country}</span>
                    </div>
                    <span>${Math.floor(countryData?.price || 0)}</span>
                  </li>
                )
              })}
            </ul>
            <Button
              className="w-full bg-[#E57373] hover:bg-[#EF5350] text-white"
              onClick={() => {
                if (selectedCountries.length > 0) {
                  window.location.href = "/verification"
                }
              }}
              disabled={selectedCountries.length === 0}
            >
              Start with free lawyer's check
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

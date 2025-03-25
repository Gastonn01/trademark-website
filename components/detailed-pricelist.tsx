"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CountrySelectCard } from "@/components/country-select-card"
import { Input } from "@/components/ui/input"
import Image from "next/image"

const primaryCountries = [
  { name: "United States", flag: "https://flagcdn.com/w40/us.png", price: 499 },
  { name: "European Union", flag: "https://flagcdn.com/w40/eu.png", price: 299 },
  { name: "United Kingdom", flag: "https://flagcdn.com/w40/gb.png", price: 300 },
  { name: "Canada", flag: "https://flagcdn.com/w40/ca.png", price: 149 },
  { name: "China", flag: "https://flagcdn.com/w40/cn.png", price: 450 },
  { name: "Japan", flag: "https://flagcdn.com/w40/jp.png", price: 500 },
]

const secondaryCountries = [
  ...primaryCountries,
  { name: "Argentina", flag: "https://flagcdn.com/w40/ar.png", price: 350 },
  { name: "Bolivia", flag: "https://flagcdn.com/w40/bo.png", price: 585 },
  { name: "Brasil", flag: "https://flagcdn.com/w40/br.png", price: 418 },
  { name: "Chile", flag: "https://flagcdn.com/w40/cl.png", price: 499 },
  { name: "Colombia", flag: "https://flagcdn.com/w40/co.png", price: 490 },
  { name: "Ecuador", flag: "https://flagcdn.com/w40/ec.png", price: 549 },
  { name: "Paraguay", flag: "https://flagcdn.com/w40/py.png", price: 399 },
  { name: "Perú", flag: "https://flagcdn.com/w40/pe.png", price: 570 },
  { name: "Uruguay", flag: "https://flagcdn.com/w40/uy.png", price: 299 },
  { name: "Venezuela", flag: "https://flagcdn.com/w40/ve.png", price: 510 },
  { name: "Anguilla", flag: "https://flagcdn.com/w40/ai.png", price: 430 },
  { name: "Antigua y Barbuda", flag: "https://flagcdn.com/w40/ag.png", price: 330 },
  { name: "Aruba", flag: "https://flagcdn.com/w40/aw.png", price: 170 },
  { name: "Bahamas", flag: "https://flagcdn.com/w40/bs.png", price: 935 },
  { name: "Barbados", flag: "https://flagcdn.com/w40/bb.png", price: 1150 },
  { name: "Bermuda", flag: "https://flagcdn.com/w40/bm.png", price: 1539 },
  { name: "BES Island", flag: "https://flagcdn.com/w40/bq.png", price: 199 },
  { name: "British Virgin Islands", flag: "https://flagcdn.com/w40/vg.png", price: 480 },
  { name: "Cayman Island", flag: "https://flagcdn.com/w40/ky.png", price: 350 },
  { name: "Cuba", flag: "https://flagcdn.com/w40/cu.png", price: 730 },
  { name: "Curacao", flag: "https://flagcdn.com/w40/cw.png", price: 200 },
  { name: "Dominica", flag: "https://flagcdn.com/w40/dm.png", price: 530 },
  { name: "Grenada", flag: "https://flagcdn.com/w40/gd.png", price: 280 },
  { name: "Guyana", flag: "https://flagcdn.com/w40/gy.png", price: 210 },
  { name: "Haití", flag: "https://flagcdn.com/w40/ht.png", price: 430 },
  { name: "Islas Turcas y Caicos", flag: "https://flagcdn.com/w40/tc.png", price: 1850 },
  { name: "Jamaica", flag: "https://flagcdn.com/w40/jm.png", price: 355 },
  { name: "Montserrat", flag: "https://flagcdn.com/w40/ms.png", price: 315 },
  { name: "Puerto Rico", flag: "https://flagcdn.com/w40/pr.png", price: 680 },
  { name: "República Dominicana", flag: "https://flagcdn.com/w40/do.png", price: 420 },
  { name: "Saint Kitts And Nevis", flag: "https://flagcdn.com/w40/kn.png", price: 390 },
  { name: "Santa Lucía", flag: "https://flagcdn.com/w40/lc.png", price: 390 },
  { name: "San Vicente y las Granadinas", flag: "https://flagcdn.com/w40/vc.png", price: 570 },
  { name: "Sint Maarten", flag: "https://flagcdn.com/w40/sx.png", price: 200 },
  { name: "Suriname", flag: "https://flagcdn.com/w40/sr.png", price: 160 },
  { name: "Trinidad y Tobago", flag: "https://flagcdn.com/w40/tt.png", price: 250 },
  { name: "México", flag: "https://flagcdn.com/w40/mx.png", price: 540 },
  { name: "España", flag: "https://flagcdn.com/w40/es.png", price: 385 },
  { name: "Francia", flag: "https://flagcdn.com/w40/fr.png", price: 190 },
  { name: "Italia", flag: "https://flagcdn.com/w40/it.png", price: 180 },
  { name: "Benelux", flag: "https://flagcdn.com/w40/be.png", price: 190 },
  { name: "Portugal", flag: "https://flagcdn.com/w40/pt.png", price: 265 },
  { name: "Alemania", flag: "https://flagcdn.com/w40/de.png", price: 500 },
  { name: "Grecia", flag: "https://flagcdn.com/w40/gr.png", price: 570 },
  { name: "Malta", flag: "https://flagcdn.com/w40/mt.png", price: 500 },
  { name: "Bosnia and Herzegovina", flag: "https://flagcdn.com/w40/ba.png", price: 170 },
  { name: "Afganistan", flag: "https://flagcdn.com/w40/af.png", price: 1090 },
  { name: "Arabia Saudita", flag: "https://flagcdn.com/w40/sa.png", price: 2450 },
  { name: "Armenia", flag: "https://flagcdn.com/w40/am.png", price: 1300 },
  { name: "Azerbaiyan", flag: "https://flagcdn.com/w40/az.png", price: 470 },
  { name: "Bahrein", flag: "https://flagcdn.com/w40/bh.png", price: 2620 },
  { name: "Bangladesh", flag: "https://flagcdn.com/w40/bd.png", price: 775 },
  { name: "Buthan", flag: "https://flagcdn.com/w40/bt.png", price: 380 },
  { name: "Brunei", flag: "https://flagcdn.com/w40/bn.png", price: 750 },
  { name: "Cambodia", flag: "https://flagcdn.com/w40/kh.png", price: 629 },
  { name: "Hong Kong", flag: "https://flagcdn.com/w40/hk.png", price: 490 },
  { name: "India", flag: "https://flagcdn.com/w40/in.png", price: 450 },
  { name: "Indonesia", flag: "https://flagcdn.com/w40/id.png", price: 950 },
  { name: "Iran", flag: "https://flagcdn.com/w40/ir.png", price: 490 },
  { name: "Iraq (Baghdad)", flag: "https://flagcdn.com/w40/iq.png", price: 300 },
  { name: "Iraq (Kurdistán)", flag: "https://flagcdn.com/w40/iq.png", price: 1749 },
  { name: "Jordan", flag: "https://flagcdn.com/w40/jo.png", price: 1300 },
  { name: "Kazajstan", flag: "https://flagcdn.com/w40/kz.png", price: 430 },
  { name: "Kirguistan", flag: "https://flagcdn.com/w40/kg.png", price: 520 },
  { name: "Korea", flag: "https://flagcdn.com/w40/kr.png", price: 600 },
  { name: "Kuwait", flag: "https://flagcdn.com/w40/kw.png", price: 1820 },
  { name: "Laos", flag: "https://flagcdn.com/w40/la.png", price: 640 },
  { name: "Lebanon", flag: "https://flagcdn.com/w40/lb.png", price: 470 },
  { name: "Macao", flag: "https://flagcdn.com/w40/mo.png", price: 770 },
  { name: "Malaysia", flag: "https://flagcdn.com/w40/my.png", price: 970 },
  { name: "Maldives", flag: "https://flagcdn.com/w40/mv.png", price: 490 },
  { name: "Mongolia", flag: "https://flagcdn.com/w40/mn.png", price: 480 },
  { name: "Myanmar", flag: "https://flagcdn.com/w40/mm.png", price: 520 },
  { name: "Nepal", flag: "https://flagcdn.com/w40/np.png", price: 630 },
  { name: "North Korea", flag: "https://flagcdn.com/w40/kp.png", price: 570 },
  { name: "Oman", flag: "https://flagcdn.com/w40/om.png", price: 1430 },
  { name: "Pakistan", flag: "https://flagcdn.com/w40/pk.png", price: 690 },
  { name: "Palestine (GZ)", flag: "https://flagcdn.com/w40/ps.png", price: 880 },
  { name: "Palestine (WB)", flag: "https://flagcdn.com/w40/ps.png", price: 840 },
  { name: "Philippines", flag: "https://flagcdn.com/w40/ph.png", price: 530 },
  { name: "Qatar", flag: "https://flagcdn.com/w40/qa.png", price: 2180 },
  { name: "Singapore", flag: "https://flagcdn.com/w40/sg.png", price: 750 },
  { name: "Siria", flag: "https://flagcdn.com/w40/sy.png", price: 1750 },
  { name: "Sri Lanka", flag: "https://flagcdn.com/w40/lk.png", price: 595 },
  { name: "Taiwan", flag: "https://flagcdn.com/w40/tw.png", price: 710 },
  { name: "Tajikistan", flag: "https://flagcdn.com/w40/tj.png", price: 1749 },
  { name: "Thailand", flag: "https://flagcdn.com/w40/th.png", price: 1000 },
  { name: "Turkiye", flag: "https://flagcdn.com/w40/tr.png", price: 265 },
  { name: "Turkmenistan", flag: "https://flagcdn.com/w40/tm.png", price: 545 },
  { name: "UAE", flag: "https://flagcdn.com/w40/ae.png", price: 2475 },
  { name: "Uzbekistan", flag: "https://flagcdn.com/w40/uz.png", price: 590 },
  { name: "Vietnam", flag: "https://flagcdn.com/w40/vn.png", price: 500 },
  { name: "Yemen", flag: "https://flagcdn.com/w40/ye.png", price: 1600 },
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


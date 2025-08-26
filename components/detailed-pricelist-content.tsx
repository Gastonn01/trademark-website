"use client"

import { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { CountrySelectCard } from "@/components/country-select-card"
import { CurrencySelector } from "@/components/currency-selector"
import { ChevronDown, ChevronUp } from "lucide-react"

interface CountrySelection {
  name: string
  classes: number
  price: number
  flag: string
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

const topCountries: CountryData[] = [
  { name: "European Union", flag: "eu", price: 1551, additionalClassPrice: 425 },
  { name: "United States", flag: "us", price: 1012, additionalClassPrice: 499 },
  { name: "Germany", flag: "de", price: 863, additionalClassPrice: 500 },
  { name: "Spain", flag: "es", price: 564, additionalClassPrice: 385 },
  { name: "United Kingdom", flag: "gb", price: 909, additionalClassPrice: 300 },
  { name: "China", flag: "cn", price: 518, additionalClassPrice: 550 },
]

const regions: RegionData[] = [
  {
    name: "North America",
    countries: [
      { name: "United States", flag: "us", price: 1012, additionalClassPrice: 499 },
      { name: "Canada", flag: "ca", price: 1369, additionalClassPrice: 150 },
      { name: "Mexico", flag: "mx", price: 685, additionalClassPrice: 540 },
    ],
  },
  {
    name: "Europe",
    countries: [
      { name: "European Union", flag: "eu", price: 1551, additionalClassPrice: 425 },
      { name: "Spain", flag: "es", price: 564, additionalClassPrice: 385 },
      { name: "France", flag: "fr", price: 667, additionalClassPrice: 190 },
      { name: "United Kingdom", flag: "gb", price: 909, additionalClassPrice: 300 },
      { name: "Italy", flag: "it", price: 920, additionalClassPrice: 180 },
      { name: "Benelux", flag: "be", price: 794, additionalClassPrice: 190 },
      { name: "Portugal", flag: "pt", price: 909, additionalClassPrice: 265 },
      { name: "Germany", flag: "de", price: 863, additionalClassPrice: 500 },
      { name: "Greece", flag: "gr", price: 736, additionalClassPrice: 570 },
      { name: "Bosnia and Herzegovina", flag: "ba", price: 656, additionalClassPrice: 170 },
    ],
  },
  {
    name: "South America",
    countries: [
      { name: "Argentina", flag: "ar", price: 460, additionalClassPrice: 350 },
      { name: "Bolivia", flag: "bo", price: 777, additionalClassPrice: 585 },
      { name: "Brazil", flag: "br", price: 644, additionalClassPrice: 418 },
      { name: "Chile", flag: "cl", price: 689, additionalClassPrice: 499 },
      { name: "Colombia", flag: "co", price: 794, additionalClassPrice: 490 },
      { name: "Ecuador", flag: "ec", price: 632, additionalClassPrice: 549 },
      { name: "Paraguay", flag: "py", price: 564, additionalClassPrice: 399 },
      { name: "Peru", flag: "pe", price: 667, additionalClassPrice: 570 },
      { name: "Uruguay", flag: "uy", price: 604, additionalClassPrice: 299 },
      { name: "Venezuela", flag: "ve", price: 604, additionalClassPrice: 510 },
    ],
  },
  {
    name: "Central America",
    countries: [
      { name: "Belize", flag: "bz", price: 915, additionalClassPrice: 795 },
      { name: "Costa Rica", flag: "cr", price: 529, additionalClassPrice: 299 },
      { name: "El Salvador", flag: "sv", price: 570, additionalClassPrice: 495 },
      { name: "Guatemala", flag: "gt", price: 599, additionalClassPrice: 520 },
      { name: "Honduras", flag: "hn", price: 685, additionalClassPrice: 595 },
      { name: "Nicaragua", flag: "ni", price: 621, additionalClassPrice: 299 },
      { name: "Panama", flag: "pa", price: 621, additionalClassPrice: 440 },
    ],
  },
  {
    name: "Central America and Caribbean",
    countries: [
      { name: "Anguilla", flag: "ai", price: 1012, additionalClassPrice: 430 },
      { name: "Antigua and Barbuda", flag: "ag", price: 759, additionalClassPrice: 330 },
      { name: "Aruba", flag: "aw", price: 943, additionalClassPrice: 170 },
      { name: "Bahamas", flag: "bs", price: 1076, additionalClassPrice: 935 },
      { name: "Barbados", flag: "bb", price: 1400, additionalClassPrice: 1150 },
      { name: "Belize", flag: "bz", price: 915, additionalClassPrice: 795 },
      { name: "Bermuda", flag: "bm", price: 1770, additionalClassPrice: 1539 },
      { name: "BES Islands", flag: "bq", price: 874, additionalClassPrice: 199 },
      { name: "British Virgin Islands", flag: "vg", price: 1001, additionalClassPrice: 480 },
      { name: "Cayman Islands", flag: "ky", price: 1242, additionalClassPrice: 350 },
      { name: "Costa Rica", flag: "cr", price: 529, additionalClassPrice: 299 },
      { name: "Cuba", flag: "cu", price: 1375, additionalClassPrice: 730 },
      { name: "Curacao", flag: "cw", price: 1208, additionalClassPrice: 200 },
      { name: "Dominica", flag: "dm", price: 1024, additionalClassPrice: 530 },
      { name: "Dominican Republic", flag: "do", price: 621, additionalClassPrice: 420 },
      { name: "El Salvador", flag: "sv", price: 570, additionalClassPrice: 495 },
      { name: "Grenada", flag: "gd", price: 1145, additionalClassPrice: 280 },
      { name: "Guatemala", flag: "gt", price: 599, additionalClassPrice: 520 },
      { name: "Guyana", flag: "gy", price: 564, additionalClassPrice: 210 },
      { name: "Haiti", flag: "ht", price: 736, additionalClassPrice: 430 },
      { name: "Honduras", flag: "hn", price: 685, additionalClassPrice: 595 },
      { name: "Jamaica", flag: "jm", price: 1231, additionalClassPrice: 355 },
      { name: "Montserrat", flag: "ms", price: 742, additionalClassPrice: 315 },
      { name: "Nicaragua", flag: "ni", price: 621, additionalClassPrice: 299 },
      { name: "Panama", flag: "pa", price: 621, additionalClassPrice: 440 },
      { name: "Puerto Rico", flag: "pr", price: 817, additionalClassPrice: 680 },
      { name: "Saint Kitts and Nevis", flag: "kn", price: 1070, additionalClassPrice: 390 },
      { name: "Saint Lucia", flag: "lc", price: 1024, additionalClassPrice: 390 },
      { name: "Saint Vincent and the Grenadines", flag: "vc", price: 656, additionalClassPrice: 570 },
      { name: "Sint Maarten", flag: "sx", price: 1254, additionalClassPrice: 200 },
      { name: "Suriname", flag: "sr", price: 874, additionalClassPrice: 160 },
      { name: "Trinidad and Tobago", flag: "tt", price: 828, additionalClassPrice: 250 },
      { name: "Turks and Caicos Islands", flag: "tc", price: 2128, additionalClassPrice: 1850 },
    ],
  },
  {
    name: "Africa",
    countries: [
      { name: "Algeria", flag: "dz", price: 990, additionalClassPrice: 300 },
      { name: "Angola", flag: "ao", price: 1050, additionalClassPrice: 1050 },
      { name: "ARIPO", flag: "aripo", price: 3150, additionalClassPrice: 3150 },
      { name: "Botswana", flag: "bw", price: 1090, additionalClassPrice: 1090 },
      { name: "Burundi", flag: "bi", price: 1550, additionalClassPrice: 1550 },
      { name: "Djibouti", flag: "dj", price: 2050, additionalClassPrice: 2050 },
      { name: "Egypt", flag: "eg", price: 765, additionalClassPrice: 765 },
      { name: "Ethiopia", flag: "et", price: 1290, additionalClassPrice: 1290 },
      { name: "Gambia", flag: "gm", price: 1350, additionalClassPrice: 1350 },
      { name: "Ghana", flag: "gh", price: 1499, additionalClassPrice: 1499 },
      { name: "Kenya", flag: "ke", price: 1600, additionalClassPrice: 1600 },
      { name: "Libya", flag: "ly", price: 1100, additionalClassPrice: 1100 },
      { name: "Madagascar", flag: "mg", price: 1050, additionalClassPrice: 1050 },
      { name: "Morocco", flag: "ma", price: 1050, additionalClassPrice: 300 },
      { name: "Mauritania", flag: "mr", price: 1190, additionalClassPrice: 1190 },
      { name: "Mozambique", flag: "mz", price: 1050, additionalClassPrice: 1050 },
      { name: "Namibia", flag: "na", price: 1100, additionalClassPrice: 1100 },
      { name: "Nigeria", flag: "ng", price: 1150, additionalClassPrice: 1150 },
      { name: "OAPI", flag: "oapi", price: 1690, additionalClassPrice: 1690 },
      { name: "DR Congo", flag: "cd", price: 1199, additionalClassPrice: 1199 },
      { name: "Rwanda", flag: "rw", price: 1350, additionalClassPrice: 1350 },
      { name: "Seychelles", flag: "sc", price: 1150, additionalClassPrice: 1150 },
      { name: "South Africa", flag: "za", price: 1110, additionalClassPrice: 1110 },
      { name: "Sudan", flag: "sd", price: 1050, additionalClassPrice: 1050 },
      { name: "Tanzania (TANU)", flag: "tz", price: 1000, additionalClassPrice: 1000 },
      { name: "Tanzania (ZAN)", flag: "tz", price: 1050, additionalClassPrice: 1050 },
      { name: "Tunisia", flag: "tn", price: 990, additionalClassPrice: 200 },
      { name: "Uganda", flag: "ug", price: 1850, additionalClassPrice: 1850 },
      { name: "Zambia", flag: "zm", price: 1299, additionalClassPrice: 1299 },
      { name: "Zimbabwe", flag: "zw", price: 1350, additionalClassPrice: 1350 },
    ],
  },
  {
    name: "Asia and Middle East",
    countries: [
      { name: "Afghanistan", flag: "af", price: 863, additionalClassPrice: 1090 },
      { name: "Saudi Arabia", flag: "sa", price: 2818, additionalClassPrice: 2450 },
      { name: "Armenia", flag: "am", price: 1495, additionalClassPrice: 1300 },
      { name: "Azerbaijan", flag: "az", price: 1001, additionalClassPrice: 470 },
      { name: "Bahrain", flag: "bh", price: 3013, additionalClassPrice: 2620 },
      { name: "Bangladesh", flag: "bd", price: 892, additionalClassPrice: 775 },
      { name: "Bhutan", flag: "bt", price: 690, additionalClassPrice: 380 },
      { name: "Brunei", flag: "bn", price: 863, additionalClassPrice: 750 },
      { name: "Cambodia", flag: "kh", price: 724, additionalClassPrice: 629 },
      { name: "China", flag: "cn", price: 518, additionalClassPrice: 450 },
      { name: "Hong Kong", flag: "hk", price: 978, additionalClassPrice: 490 },
      { name: "India", flag: "in", price: 662, additionalClassPrice: 450 },
      { name: "Indonesia", flag: "id", price: 1139, additionalClassPrice: 950 },
      { name: "Iran", flag: "ir", price: 1725, additionalClassPrice: 490 },
      { name: "Iraq (Baghdad)", flag: "iq", price: 1737, additionalClassPrice: 300 },
      { name: "Iraq (Kurdistan)", flag: "iq", price: 2012, additionalClassPrice: 1749 },
      { name: "Japan", flag: "jp", price: 777, additionalClassPrice: 500 },
      { name: "Jordan", flag: "jo", price: 1495, additionalClassPrice: 1300 },
      { name: "Kazakhstan", flag: "kz", price: 920, additionalClassPrice: 430 },
      { name: "Kyrgyzstan", flag: "kg", price: 851, additionalClassPrice: 520 },
      { name: "South Korea", flag: "kr", price: 804, additionalClassPrice: 600 },
      { name: "Kuwait", flag: "kw", price: 2093, additionalClassPrice: 1820 },
      { name: "Laos", flag: "la", price: 736, additionalClassPrice: 640 },
      { name: "Lebanon", flag: "lb", price: 1012, additionalClassPrice: 470 },
      { name: "Macao", flag: "mo", price: 886, additionalClassPrice: 770 },
      { name: "Malaysia", flag: "my", price: 1323, additionalClassPrice: 970 },
      { name: "Maldives", flag: "mv", price: 1024, additionalClassPrice: 490 },
      { name: "Mongolia", flag: "mn", price: 782, additionalClassPrice: 480 },
      { name: "Myanmar", flag: "mm", price: 725, additionalClassPrice: 520 },
      { name: "Nepal", flag: "np", price: 725, additionalClassPrice: 630 },
      { name: "North Korea", flag: "kp", price: 1553, additionalClassPrice: 570 },
      { name: "Oman", flag: "om", price: 1645, additionalClassPrice: 1430 },
      { name: "Pakistan", flag: "pk", price: 863, additionalClassPrice: 690 },
      { name: "Palestine (Gaza)", flag: "ps", price: 1012, additionalClassPrice: 880 },
      { name: "Palestine (West Bank)", flag: "ps", price: 966, additionalClassPrice: 840 },
      { name: "Philippines", flag: "ph", price: 748, additionalClassPrice: 530 },
      { name: "Qatar", flag: "qa", price: 2507, additionalClassPrice: 2180 },
      { name: "Singapore", flag: "sg", price: 1024, additionalClassPrice: 750 },
      { name: "Syria", flag: "sy", price: 2013, additionalClassPrice: 1750 },
      { name: "Sri Lanka", flag: "lk", price: 685, additionalClassPrice: 595 },
      { name: "Taiwan", flag: "tw", price: 817, additionalClassPrice: 710 },
      { name: "Tajikistan", flag: "tj", price: 2012, additionalClassPrice: 1749 },
      { name: "Thailand", flag: "th", price: 1380, additionalClassPrice: 1000 },
      { name: "Turkey", flag: "tr", price: 644, additionalClassPrice: 265 },
      { name: "Turkmenistan", flag: "tm", price: 1145, additionalClassPrice: 545 },
      { name: "United Arab Emirates", flag: "ae", price: 2990, additionalClassPrice: 2475 },
      { name: "Uzbekistan", flag: "uz", price: 1541, additionalClassPrice: 590 },
      { name: "Vietnam", flag: "vn", price: 575, additionalClassPrice: 500 },
      { name: "Yemen", flag: "ye", price: 1840, additionalClassPrice: 1600 },
    ],
  },
  {
    name: "Oceania",
    countries: [
      { name: "Papua New Guinea", flag: "pg", price: 930, additionalClassPrice: 780 },
      { name: "Tonga", flag: "to", price: 1700, additionalClassPrice: 1550 },
      { name: "Fiji", flag: "fj", price: 1850, additionalClassPrice: 1750 },
    ],
  },
]

export function DetailedPricelistContent() {
  const [selectedCountries, setSelectedCountries] = useState<CountrySelection[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedRegions, setExpandedRegions] = useState<string[]>([])
  const [formData, setFormData] = useState({ selectedClasses: [] })
  const [searchResults, setSearchResults] = useState<CountryData[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState<"USD" | "EUR">("EUR")

  // Función para buscar países en todas las regiones
  const searchCountries = (term: string) => {
    if (!term.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const normalizedTerm = term.toLowerCase().trim()

    // Buscar en todas las regiones
    const results = regions
      .flatMap((region) => region.countries)
      .filter((country) => country.name.toLowerCase().includes(normalizedTerm))

    // Eliminar duplicados (por si un país aparece en múltiples regiones)
    const uniqueResults = Array.from(new Map(results.map((item) => [item.name, item])).values())

    setSearchResults(uniqueResults)
  }

  // Actualizar resultados de búsqueda cuando cambia el término de búsqueda
  useEffect(() => {
    searchCountries(searchTerm)

    // Expandir automáticamente todas las regiones que contienen países que coinciden con la búsqueda
    if (searchTerm.trim()) {
      const matchingRegions = regions
        .filter((region) =>
          region.countries.some((country) => country.name.toLowerCase().includes(searchTerm.toLowerCase())),
        )
        .map((region) => region.name)

      setExpandedRegions((prev) => {
        const newExpanded = [...prev]
        matchingRegions.forEach((region) => {
          if (!newExpanded.includes(region)) {
            newExpanded.push(region)
          }
        })
        return newExpanded
      })
    }
  }, [searchTerm])

  const toggleCountry = (country: string) => {
    setSelectedCountries((prev) => {
      const isSelected = prev.some((c) => c.name === country)
      if (isSelected) {
        return prev.filter((c) => c.name !== country)
      }
      const countryData = [...topCountries, ...regions.flatMap((r) => r.countries)].find((c) => c.name === country)
      const newSelection = [
        ...prev,
        {
          name: country,
          classes: Math.max(1, formData.selectedClasses.length),
          price: countryData?.price || 0,
          flag: countryData?.flag || "",
        },
      ]
      setFormData((prevData) => ({ ...prevData, countries: newSelection }))
      return newSelection
    })
  }

  const addClassForCountry = (countryName: string) => {
    setSelectedCountries((prev) =>
      prev.map((country) => {
        if (country.name === countryName) {
          const countryData = [...topCountries, ...regions.flatMap((r) => r.countries)].find(
            (c) => c.name === countryName,
          )
          const additionalClassPrice = countryData?.additionalClassPrice || 0
          return {
            ...country,
            classes: country.classes + 1,
            price: country.price + additionalClassPrice,
          }
        }
        return country
      }),
    )
  }

  const removeClassForCountry = (countryName: string) => {
    setSelectedCountries((prev) =>
      prev.map((country) => {
        if (country.name === countryName && country.classes > 1) {
          const countryData = [...topCountries, ...regions.flatMap((r) => r.countries)].find(
            (c) => c.name === countryName,
          )
          return {
            ...country,
            classes: country.classes - 1,
            price: country.price - (countryData?.additionalClassPrice || 0),
          }
        }
        return country
      }),
    )
  }

  const totalPrice = useMemo(() => {
    return selectedCountries.reduce((sum, country) => sum + country.price, 0)
  }, [selectedCountries])

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

  return (
    <div id="pricing-table" className="container mx-auto px-4 py-16 bg-blue-50">
      <CurrencySelector selectedCurrency={selectedCurrency} onCurrencyChange={setSelectedCurrency} />
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-2 text-center text-indigo-900">Select Your Trademark Coverage</h2>
        <p className="text-center text-gray-600 mb-8">Add additional trademark classes for comprehensive protection.</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Input
            type="text"
            placeholder="Search for countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-6"
          />

          <div className="space-y-6">
            {/* Resultados de búsqueda */}
            {searchResults.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-indigo-700">Search Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map((country) => (
                    <CountrySelectCard
                      key={country.name}
                      country={country.name}
                      flag={`https://flagcdn.com/${country.flag}.svg`}
                      price={country.price}
                      additionalClassPrice={country.additionalClassPrice}
                      onSelect={() => toggleCountry(country.name)}
                      selected={selectedCountries.some((c) => c.name === country.name)}
                      currency={selectedCurrency}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Top Countries Section - solo mostrar si no hay búsqueda */}
            {!isSearching && (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-indigo-700">Most Requested Countries</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTopCountries.map((country) => (
                    <CountrySelectCard
                      key={country.name}
                      country={country.name}
                      flag={`https://flagcdn.com/${country.flag}.svg`}
                      price={country.price}
                      additionalClassPrice={country.additionalClassPrice}
                      onSelect={() => toggleCountry(country.name)}
                      selected={selectedCountries.some((c) => c.name === country.name)}
                      currency={selectedCurrency}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Other Regions - solo mostrar si no hay búsqueda */}
            {!isSearching &&
              filteredRegions.map((region) => (
                <div key={region.name}>
                  <button
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
                          price={country.price}
                          additionalClassPrice={country.additionalClassPrice}
                          onSelect={() => toggleCountry(country.name)}
                          selected={selectedCountries.some((c) => c.name === country.name)}
                          currency={selectedCurrency}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-20 pt-4">
            <Card className="bg-white shadow-sm border rounded-lg">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6">Your Selection</h3>

                <p className="text-2xl font-bold mb-6">{`${selectedCurrency === "USD" ? "$" : "€"}${totalPrice}`}</p>

                <div className="space-y-4 mb-6">
                  {selectedCountries.map((country) => (
                    <div key={country.name} className="flex items-center justify-between py-3 border-b">
                      <div className="flex items-center">
                        <img
                          src={`https://flagcdn.com/${country.flag}.svg`}
                          alt={`${country.name} flag`}
                          className="w-6 h-4 mr-2"
                        />
                        <span className="font-medium">{country.name}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center mr-4">
                          <button
                            onClick={() => removeClassForCountry(country.name)}
                            className="w-8 h-8 flex items-center justify-center border rounded-l text-gray-500 hover:bg-gray-100"
                            disabled={country.classes <= 1}
                          >
                            -
                          </button>
                          <span className="w-8 h-8 flex items-center justify-center border-t border-b">
                            {country.classes}
                          </span>
                          <button
                            onClick={() => addClassForCountry(country.name)}
                            className="w-8 h-8 flex items-center justify-center border rounded-r text-gray-500 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-medium text-right w-16">{`${selectedCurrency === "USD" ? "$" : "€"}${country.price}`}</span>
                      </div>
                    </div>
                  ))}

                  {selectedCountries.length === 0 && (
                    <div className="text-gray-500 text-center py-4">No countries selected yet</div>
                  )}
                </div>

                <a
                  href={`/free-search?countries=${encodeURIComponent(JSON.stringify(selectedCountries.map((c) => c.name)))}&currency=${selectedCurrency}`}
                  className="block w-full py-3 text-center text-white font-semibold bg-[#1a4bff] hover:bg-[#0035e0] rounded-full transition-colors duration-200"
                >
                  Get Free Search
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

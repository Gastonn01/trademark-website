import { countryPricingData } from "@/lib/pricing-data"

// Slug for URL: "Iraq (Baghdad)" -> "iraq-baghdad"
export function countrySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/\s+/g, "-")
}

// Region grouping used for "related countries" internal links
const regionMap: Record<string, string[]> = {
  Europe: [
    "European Union", "Germany", "Spain", "United Kingdom", "France", "Italy",
    "Benelux", "Portugal", "Greece", "Bosnia and Herzegovina",
  ],
  "North America": ["United States", "Canada", "Mexico"],
  "South America": [
    "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador",
    "Paraguay", "Peru", "Uruguay", "Venezuela",
  ],
  "Central America": [
    "Belize", "Costa Rica", "El Salvador", "Guatemala", "Honduras", "Nicaragua", "Panama",
  ],
  Caribbean: [
    "Anguilla", "Antigua and Barbuda", "Aruba", "Bahamas", "Barbados", "Bermuda",
    "BES Islands", "British Virgin Islands", "Cayman Islands", "Cuba", "Curacao",
    "Dominica", "Dominican Republic", "Grenada", "Guyana", "Haiti", "Jamaica",
    "Montserrat", "Puerto Rico", "Saint Kitts and Nevis", "Saint Lucia",
    "Saint Vincent and the Grenadines", "Sint Maarten", "Suriname",
    "Trinidad and Tobago", "Turks and Caicos Islands",
  ],
  Africa: [
    "Algeria", "Angola", "ARIPO", "Botswana", "Burundi", "Djibouti", "Egypt",
    "Ethiopia", "Gambia", "Ghana", "Kenya", "Libya", "Madagascar", "Morocco",
    "Mauritania", "Mozambique", "Namibia", "Nigeria", "OAPI", "DR Congo",
    "Rwanda", "Seychelles", "South Africa", "Sudan", "Tanzania (TANU)",
    "Tanzania (ZAN)", "Tunisia", "Uganda", "Zambia", "Zimbabwe",
  ],
  "Asia & Middle East": [
    "Afghanistan", "Saudi Arabia", "Armenia", "Azerbaijan", "Bahrain",
    "Bangladesh", "Bhutan", "Brunei", "Cambodia", "Hong Kong", "India",
    "Indonesia", "Iran", "Iraq (Baghdad)", "Iraq (Kurdistan)", "Japan",
    "Jordan", "Kazakhstan", "Kyrgyzstan", "South Korea", "Kuwait", "Laos",
    "Lebanon", "Macao", "Malaysia", "Maldives", "Mongolia", "Myanmar",
    "Nepal", "North Korea", "Oman", "Pakistan", "Palestine (Gaza)",
    "Palestine (West Bank)", "Philippines", "Qatar", "Singapore", "Syria",
    "Sri Lanka", "Taiwan", "Tajikistan", "Thailand", "Turkey", "Turkmenistan",
    "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen", "China", "Israel",
  ],
  Oceania: ["Papua New Guinea", "Fiji", "Tonga"],
}

export function regionForCountry(name: string): string {
  for (const [region, countries] of Object.entries(regionMap)) {
    if (countries.includes(name)) return region
  }
  return "Worldwide"
}

export function relatedCountries(name: string, count = 6): string[] {
  const region = regionForCountry(name)
  const siblings = (regionMap[region] || []).filter(
    (c) => c !== name && countryPricingData[c],
  )
  return siblings.slice(0, count)
}

// Typical registration timelines for major offices; generic fallback for the rest
const timelineMap: Record<string, string> = {
  "United States": "8–12 months",
  "European Union": "4–6 months",
  "United Kingdom": "4–6 months",
  Germany: "6–9 months",
  France: "5–8 months",
  Spain: "6–9 months",
  Italy: "8–12 months",
  China: "9–14 months",
  Japan: "6–10 months",
  "South Korea": "10–14 months",
  India: "12–24 months",
  Canada: "18–30 months",
  Mexico: "6–10 months",
  Brazil: "12–24 months",
  Argentina: "12–18 months",
  Australia: "7–10 months",
  Singapore: "9–12 months",
  "Hong Kong": "6–9 months",
  Turkey: "8–12 months",
  "United Arab Emirates": "6–10 months",
  "Saudi Arabia": "6–10 months",
  "South Africa": "18–30 months",
  Israel: "12–18 months",
}

export function timelineForCountry(name: string): string {
  return timelineMap[name] || "12–18 months"
}

export function getAllCountryNames(): string[] {
  return Object.keys(countryPricingData)
}

export function getCountryBySlug(slug: string): string | undefined {
  return getAllCountryNames().find((name) => countrySlug(name) === slug)
}

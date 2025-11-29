// Updated pricing data based on your fee schedule with strategic markup

export const centralAmericaCaribbeanCountries = [
  // Lower cost countries - 25-30% markup for good profit margin
  { name: "Guyana", flag: "gy", price: 640, originalCost: 490, markup: "30%" },
  { name: "Dominican Republic", flag: "do", price: 680, originalCost: 540, markup: "26%" },
  { name: "Saint Vincent and the Grenadines", flag: "vc", price: 720, originalCost: 570, markup: "26%" },
  { name: "Haiti", flag: "ht", price: 820, originalCost: 640, markup: "28%" },
  { name: "Montserrat", flag: "ms", price: 820, originalCost: 645, markup: "27%" },
  { name: "Puerto Rico", flag: "pr", price: 890, originalCost: 710, markup: "25%" },
  { name: "Trinidad and Tobago", flag: "tt", price: 900, originalCost: 720, markup: "25%" },
  { name: "Suriname", flag: "sr", price: 950, originalCost: 760, markup: "25%" },

  // Medium cost countries - 15-20% markup
  { name: "Aruba", flag: "aw", price: 950, originalCost: 820, markup: "16%" },
  { name: "BES Islands", flag: "bq", price: 880, originalCost: 760, markup: "16%" },
  { name: "Antigua and Barbuda", flag: "ag", price: 780, originalCost: 660, markup: "18%" },
  { name: "British Virgin Islands", flag: "vg", price: 1020, originalCost: 870, markup: "17%" },
  { name: "Anguilla", flag: "ai", price: 1020, originalCost: 880, markup: "16%" },
  { name: "Dominica", flag: "dm", price: 1050, originalCost: 890, markup: "18%" },
  { name: "Saint Lucia", flag: "lc", price: 1050, originalCost: 890, markup: "18%" },
  { name: "Saint Kitts and Nevis", flag: "kn", price: 1100, originalCost: 930, markup: "18%" },
  { name: "Bahamas", flag: "bs", price: 1100, originalCost: 935, markup: "18%" },
  { name: "Grenada", flag: "gd", price: 1150, originalCost: 995, markup: "16%" },

  // High cost countries - 10-15% markup to stay competitive
  { name: "Curacao", flag: "cw", price: 1200, originalCost: 1050, markup: "14%" },
  { name: "Jamaica", flag: "jm", price: 1220, originalCost: 1070, markup: "14%" },
  { name: "Cayman Islands", flag: "ky", price: 1230, originalCost: 1080, markup: "14%" },
  { name: "Sint Maarten", flag: "sx", price: 1240, originalCost: 1090, markup: "14%" },
  { name: "Barbados", flag: "bb", price: 1320, originalCost: 1150, markup: "15%" },
  { name: "Cuba", flag: "cu", price: 1350, originalCost: 1195, markup: "13%" },

  // Very high cost countries - 5-10% markup to remain competitive
  { name: "Bermuda", flag: "bm", price: 1650, originalCost: 1539, markup: "7%" },
  { name: "Turks and Caicos Islands", flag: "tc", price: 1950, originalCost: 1850, markup: "5%" },
]

// Summary of pricing strategy:
export const pricingStrategy = {
  baseCurrency: "EUR",
  usdConversion: "EUR * 1.09",
  lowCost: "25-30% markup on countries under €700 base cost",
  mediumCost: "15-20% markup on countries €700-€1000 base cost",
  highCost: "10-15% markup on countries €1000-€1300 base cost",
  veryHighCost: "5-10% markup on countries over €1300 base cost",
  notes: [
    "All prices are in EUR as the base currency",
    "USD prices calculated as EUR * 1.09 (current exchange rate)",
    "Prices kept competitive while ensuring healthy profit margins",
    "Higher markup on lower cost countries for better overall profitability",
    "Conservative markup on expensive countries to remain market competitive",
    "All prices rounded to nearest €10 for clean presentation",
  ],
}

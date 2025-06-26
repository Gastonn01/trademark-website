// North America pricing data with strategic markup (all in USD)

export const northAmericaCountries = [
  // Mexico - good markup opportunity
  { name: "Mexico", flag: "mx", price: 750, originalCost: 595, markup: "26%", profit: 155 },

  // USA - moderate markup due to high competition
  { name: "United States", flag: "us", price: 1050, originalCost: 880, markup: "19%", profit: 170 },

  // Canada - conservative markup due to high base cost
  { name: "Canada", flag: "ca", price: 1400, originalCost: 1190, markup: "18%", profit: 210 },
]

export const northAmericaPricingStrategy = {
  averageMarkup: "21%",
  averageProfit: "$178 per application",
  notes: [
    "USA and Canada are premium markets with higher profit per transaction",
    "Mexico offers good volume opportunity with solid margins",
    "Focus on value-added services for North American clients",
  ],
}

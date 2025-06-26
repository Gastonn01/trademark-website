// South America pricing data with strategic markup (all in USD)

export const southAmericaCountries = [
  // Lower cost countries - 25-35% markup
  { name: "Argentina", flag: "ar", price: 520, originalCost: 400, markup: "30%", profit: 120 },
  { name: "Paraguay", flag: "py", price: 580, originalCost: 450, markup: "29%", profit: 130 },
  { name: "Venezuela", flag: "ve", price: 680, originalCost: 525, markup: "30%", profit: 155 },
  { name: "Uruguay", flag: "uy", price: 680, originalCost: 525, markup: "30%", profit: 155 },
  { name: "Ecuador", flag: "ec", price: 700, originalCost: 549, markup: "27%", profit: 151 },
  { name: "Brazil", flag: "br", price: 720, originalCost: 560, markup: "29%", profit: 160 },
  { name: "Peru", flag: "pe", price: 750, originalCost: 580, markup: "29%", profit: 170 },
  { name: "Chile", flag: "cl", price: 780, originalCost: 599, markup: "30%", profit: 181 },

  // Higher cost countries - moderate markup
  { name: "Bolivia", flag: "bo", price: 850, originalCost: 675, markup: "26%", profit: 175 },
  { name: "Colombia", flag: "co", price: 880, originalCost: 690, markup: "28%", profit: 190 },
]

export const southAmericaPricingStrategy = {
  averageMarkup: "28.8%",
  averageProfit: "$159 per application",
  notes: [
    "Argentina and Paraguay offer entry-level pricing for budget-conscious clients",
    "Colombia and Bolivia command premium pricing in the region",
    "Brazil represents largest market opportunity with good margins",
    "Consider regional packages for multiple South American filings",
  ],
}

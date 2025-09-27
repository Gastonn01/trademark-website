// Central America pricing data with strategic markup (all in USD)

export const centralAmericaCountries = [
  // Lower cost countries - 25-35% markup for good profit margin
  { name: "Costa Rica", flag: "cr", price: 620, originalCost: 460, markup: "35%", profit: 160 },
  { name: "El Salvador", flag: "sv", price: 650, originalCost: 495, markup: "31%", profit: 155 },
  { name: "Guatemala", flag: "gt", price: 680, originalCost: 520, markup: "31%", profit: 160 },
  { name: "Nicaragua", flag: "ni", price: 700, originalCost: 540, markup: "30%", profit: 160 },
  { name: "Panama", flag: "pa", price: 700, originalCost: 540, markup: "30%", profit: 160 },
  { name: "Honduras", flag: "hn", price: 750, originalCost: 595, markup: "26%", profit: 155 },

  // Higher cost country - moderate markup
  { name: "Belize", flag: "bz", price: 980, originalCost: 795, markup: "23%", profit: 185 },
]

export const centralAmericaPricingStrategy = {
  averageMarkup: "29.4%",
  averageProfit: "$162 per application",
  notes: [
    "Costa Rica offers best profit margin opportunity",
    "Belize commands premium pricing due to higher base costs",
    "All countries offer healthy profit margins above $150",
    "Consider package deals for multiple Central American countries",
  ],
}

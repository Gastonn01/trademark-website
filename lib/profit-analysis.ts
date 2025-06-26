// Profit analysis for the updated pricing

export const profitAnalysis = {
  totalCountries: 26,
  averageMarkup: "18.5%",
  profitBreakdown: {
    lowCostCountries: {
      count: 8,
      averageMarkup: "26.4%",
      averageProfit: "$156 per application",
    },
    mediumCostCountries: {
      count: 10,
      averageMarkup: "16.8%",
      averageProfit: "$148 per application",
    },
    highCostCountries: {
      count: 6,
      averageMarkup: "14.2%",
      averageProfit: "$162 per application",
    },
    veryHighCostCountries: {
      count: 2,
      averageMarkup: "6%",
      averageProfit: "$106 per application",
    },
  },
  recommendations: [
    "Focus marketing on medium-cost countries for best profit/volume balance",
    "Bundle services for high-cost countries to increase total transaction value",
    "Consider volume discounts for clients filing in multiple low-cost countries",
    "Monitor competitor pricing regularly, especially for high-cost jurisdictions",
  ],
}

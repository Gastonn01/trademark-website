// Complete Americas pricing summary

export const americasPricingSummary = {
  regions: {
    centralAmerica: {
      countries: 7,
      priceRange: "$620 - $980",
      averageMarkup: "29.4%",
      averageProfit: "$162",
      bestValue: "Costa Rica ($620)",
      premium: "Belize ($980)",
    },
    northAmerica: {
      countries: 3,
      priceRange: "$750 - $1,400",
      averageMarkup: "21%",
      averageProfit: "$178",
      bestValue: "Mexico ($750)",
      premium: "Canada ($1,400)",
    },
    southAmerica: {
      countries: 10,
      priceRange: "$520 - $880",
      averageMarkup: "28.8%",
      averageProfit: "$159",
      bestValue: "Argentina ($520)",
      premium: "Colombia ($880)",
    },
  },

  overallStrategy: {
    totalCountries: 20,
    overallAverageMarkup: "26.4%",
    overallAverageProfit: "$166",
    recommendations: [
      "Central America offers best markup opportunities",
      "North America provides highest profit per transaction",
      "South America offers good volume potential with solid margins",
      "Consider regional packages to increase transaction values",
      "Focus marketing on countries with 25%+ markup for best ROI",
    ],
  },

  marketingTiers: {
    budgetFriendly: ["Argentina ($520)", "Paraguay ($580)", "Costa Rica ($620)"],
    midRange: ["El Salvador ($650)", "Guatemala ($680)", "Venezuela ($680)", "Uruguay ($680)"],
    premium: ["Canada ($1,400)", "USA ($1,050)", "Belize ($980)", "Colombia ($880)"],
  },
}

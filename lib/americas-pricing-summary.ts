// All base values are in EUR and converted to USD

export const americasPricingSummary = {
  regions: {
    centralAmerica: {
      countries: 7,
      priceRange: "$577 - $998", // EUR 529-915 * 1.09
      averageMarkup: "29.4%",
      averageProfit: "$162",
      bestValue: "Costa Rica ($577)", // EUR 529 * 1.09
      premium: "Belize ($998)", // EUR 915 * 1.09
    },
    northAmerica: {
      countries: 3,
      priceRange: "$747 - $1,492", // EUR 685-1369 * 1.09
      averageMarkup: "21%",
      averageProfit: "$178",
      bestValue: "Mexico ($747)", // EUR 685 * 1.09
      premium: "Canada ($1,492)", // EUR 1369 * 1.09
    },
    southAmerica: {
      countries: 10,
      priceRange: "$501 - $866", // EUR 460-794 * 1.09
      averageMarkup: "28.8%",
      averageProfit: "$159",
      bestValue: "Argentina ($501)", // EUR 460 * 1.09
      premium: "Colombia ($866)", // EUR 794 * 1.09
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
    budgetFriendly: ["Argentina ($501)", "Paraguay ($615)", "Costa Rica ($577)"], // EUR 460, 564, 529 * 1.09
    midRange: ["El Salvador ($621)", "Guatemala ($653)", "Venezuela ($658)", "Uruguay ($658)"], // EUR 570, 599, 604, 604 * 1.09
    premium: ["Canada ($1,492)", "USA ($1,103)", "Belize ($998)", "Colombia ($866)"], // EUR 1369, 1012, 915, 794 * 1.09
  },
}

// Currency conversion rates (base: USD = 1.00)
// Exchange rates from exchange-rates.org and Wise (December 2025)
export const CURRENCY_RATES = {
  USD: 1.0,
  EUR: 1.16, // Updated to multiply USD by 1.16 to get EUR
  GBP: 0.7499,
} as const

export type Currency = "USD" | "EUR" | "GBP"

export const CURRENCY_SYMBOLS = {
  EUR: "€",
  USD: "$",
  GBP: "£",
} as const

export const CURRENCY_NAMES = {
  EUR: "Euro",
  USD: "US Dollar",
  GBP: "British Pound",
} as const

export const CURRENCY_FLAGS = {
  EUR: "🇪🇺",
  USD: "🇺🇸",
  GBP: "🇬🇧",
} as const

// Format price with currency symbol
export function formatPrice(price: number | undefined, currency: Currency): string {
  if (price === undefined || isNaN(price) || price === null) {
    console.error("[v0] formatPrice received invalid price:", price, "for currency:", currency)
    return `${CURRENCY_SYMBOLS[currency]}0`
  }
  const symbol = CURRENCY_SYMBOLS[currency]
  return `${symbol}${price.toLocaleString()}`
}

// Get currency symbol for a given currency
export function getCurrencySymbol(currency: Currency): string {
  return CURRENCY_SYMBOLS[currency]
}

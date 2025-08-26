"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Currency = "USD" | "EUR"

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  formatPrice: (price: number) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD")

  // Load currency from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem("preferred-currency") as Currency
    if (savedCurrency && (savedCurrency === "USD" || savedCurrency === "EUR")) {
      setCurrency(savedCurrency)
    }
  }, [])

  // Save currency to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("preferred-currency", currency)
  }, [currency])

  const formatPrice = (price: number) => {
    const symbol = currency === "USD" ? "$" : "€"
    return `${symbol}${price}`
  }

  return <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>{children}</CurrencyContext.Provider>
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}

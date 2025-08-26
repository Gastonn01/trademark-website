"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Currency = "USD" | "EUR"

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  formatPrice: (amount: number) => string
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
  const handleSetCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency)
    localStorage.setItem("preferred-currency", newCurrency)
  }

  const formatPrice = (amount: number) => {
    const symbol = currency === "USD" ? "$" : "€"
    return `${symbol}${amount}`
  }

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency: handleSetCurrency,
        formatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}

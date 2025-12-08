"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Currency } from "@/lib/currency-converter"

interface CurrencyStore {
  currency: Currency
  setCurrency: (currency: Currency) => void
}

export const useCurrency = create<CurrencyStore>()(
  persist(
    (set) => ({
      currency: "USD",
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: "currency-storage",
    },
  ),
)

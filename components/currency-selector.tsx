"use client"

import { useCurrency } from "@/lib/currency-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700">Currency:</span>
      <Select value={currency} onValueChange={(value: "USD" | "EUR") => setCurrency(value)}>
        <SelectTrigger className="w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="USD">USD</SelectItem>
          <SelectItem value="EUR">EUR</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

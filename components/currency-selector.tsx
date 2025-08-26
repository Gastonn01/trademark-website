"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CurrencySelectorProps {
  onCurrencyChange: (currency: "USD" | "EUR") => void
  selectedCurrency: "USD" | "EUR"
}

export function CurrencySelector({ onCurrencyChange, selectedCurrency }: CurrencySelectorProps) {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-center gap-4">
          <span className="text-sm font-medium text-gray-700">Select Currency:</span>
          <div className="flex gap-2">
            <Button
              variant={selectedCurrency === "USD" ? "default" : "outline"}
              size="sm"
              onClick={() => onCurrencyChange("USD")}
              className="min-w-[60px]"
            >
              USD ($)
            </Button>
            <Button
              variant={selectedCurrency === "EUR" ? "default" : "outline"}
              size="sm"
              onClick={() => onCurrencyChange("EUR")}
              className="min-w-[60px]"
            >
              EUR (€)
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

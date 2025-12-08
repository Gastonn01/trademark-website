"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCurrency } from "@/hooks/use-currency"
import { CURRENCY_SYMBOLS, CURRENCY_NAMES, CURRENCY_FLAGS, type Currency } from "@/lib/currency-converter"

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()
  const [open, setOpen] = useState(false)

  const currencies: Currency[] = ["EUR", "USD", "GBP"]

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-9 px-3 gap-2 border-gray-300 bg-transparent">
          <span className="text-base">{CURRENCY_FLAGS[currency]}</span>
          <span className="font-medium">{CURRENCY_SYMBOLS[currency]}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {currencies.map((curr) => (
          <DropdownMenuItem
            key={curr}
            onClick={() => {
              setCurrency(curr)
              setOpen(false)
            }}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{CURRENCY_FLAGS[curr]}</span>
              <div className="flex flex-col">
                <span className="font-medium text-sm">
                  {curr} - {CURRENCY_NAMES[curr]}
                </span>
              </div>
            </div>
            {currency === curr && <Check className="h-4 w-4 text-blue-600" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

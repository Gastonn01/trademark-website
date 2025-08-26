"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

interface CountrySelectCardProps {
  country: string
  flag: string
  price?: number
  additionalClassPrice?: number
  onSelect: () => void
  selected: boolean
  formatPrice?: (price: number) => string
}

export function CountrySelectCard({
  country,
  flag,
  price,
  additionalClassPrice,
  onSelect,
  selected,
  formatPrice,
}: CountrySelectCardProps) {
  const defaultFormatPrice = (amount: number) => `$${amount}`
  const priceFormatter = formatPrice || defaultFormatPrice

  return (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        selected ? "ring-2 ring-indigo-500 bg-indigo-50" : "hover:bg-gray-50"
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <img src={flag || "/placeholder.svg"} alt={`${country} flag`} className="w-8 h-6 object-cover rounded" />
            <span className="font-medium text-sm">{country}</span>
          </div>
          {selected && <Check className="h-5 w-5 text-indigo-600" />}
        </div>

        {price !== undefined && (
          <div className="space-y-1">
            <div className="text-lg font-bold text-indigo-600">{priceFormatter(price)}</div>
            {additionalClassPrice !== undefined && additionalClassPrice > 0 && (
              <div className="text-xs text-gray-500">+{priceFormatter(additionalClassPrice)} per additional class</div>
            )}
          </div>
        )}

        {price === undefined && <div className="text-sm text-gray-500">Price available on request</div>}
      </CardContent>
    </Card>
  )
}

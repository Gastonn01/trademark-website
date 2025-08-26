"use client"
import { Card, CardContent } from "@mui/material"
import Check from "@mui/icons-material/Check"

interface CountrySelectCardProps {
  country: string
  flag: string
  price: number
  additionalClassPrice: number
  onSelect: () => void
  selected: boolean
  currency?: "USD" | "EUR"
}

export function CountrySelectCard({
  country,
  flag,
  price,
  additionalClassPrice,
  onSelect,
  selected,
  currency = "EUR",
}: CountrySelectCardProps) {
  const currencySymbol = currency === "USD" ? "$" : "€"

  return (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        selected ? "ring-2 ring-indigo-500 bg-indigo-50" : "hover:bg-gray-50"
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img src={flag || "/placeholder.svg"} alt={`${country} flag`} className="w-6 h-4 mr-2" />
            <span className="font-medium text-sm">{country}</span>
          </div>
          {selected && <Check className="h-4 w-4 text-indigo-600" />}
        </div>
        <div className="text-lg font-bold text-indigo-600">
          {currencySymbol}
          {price}
        </div>
        <div className="text-xs text-gray-500">
          +{currencySymbol}
          {additionalClassPrice} per additional class
        </div>
      </CardContent>
    </Card>
  )
}

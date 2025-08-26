"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import Image from "next/image"

interface CountrySelectCardProps {
  country: string
  flag: string
  price: number
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
  formatPrice = (price: number) => `$${price}`,
}: CountrySelectCardProps) {
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
            <Image
              src={flag || "/placeholder.svg"}
              alt={`${country} flag`}
              width={32}
              height={24}
              className="rounded border"
            />
            <span className="font-medium text-sm">{country}</span>
          </div>
          {selected && <Check className="h-5 w-5 text-indigo-600" />}
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Base price:</span>
            <Badge variant="secondary" className="font-semibold">
              {formatPrice(price)}
            </Badge>
          </div>
          {additionalClassPrice && additionalClassPrice > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Additional class:</span>
              <span className="text-xs text-gray-600">{formatPrice(additionalClassPrice)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

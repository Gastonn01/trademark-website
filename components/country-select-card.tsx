"use client"

import Image from "next/image"

interface CountrySelectCardProps {
  country: string
  flag: string
  price: number
  additionalClassPrice?: number
  onSelect: () => void
  selected: boolean
  currency: "USD" | "EUR" | "GBP"
}

export function CountrySelectCard({
  country,
  flag,
  price,
  additionalClassPrice,
  onSelect,
  selected,
  currency,
}: CountrySelectCardProps) {
  const convertedPrice = Math.floor(price)
  const currencySymbol = currency === "USD" ? "$" : currency === "GBP" ? "£" : "€"
  const currencyCode = currency

  return (
    <div
      onClick={onSelect}
      className={`
        w-full flex items-center justify-between p-4 rounded-lg cursor-pointer
        ${selected ? "bg-[#1D4ED8] text-white" : "bg-white hover:bg-gray-50 border border-gray-200"}
      `}
    >
      <div className="flex items-center gap-3">
        <Image src={flag || "/placeholder.svg"} alt={`${country} flag`} width={40} height={30} className="rounded" />
        <span className="text-sm font-medium leading-none">{country === "Surinam" ? "Suriname" : country}</span>
      </div>
      <span className={`text-sm font-semibold ${selected ? "text-white" : "text-indigo-600"}`}>
        {currencySymbol}
        {convertedPrice} {currencyCode}
      </span>
    </div>
  )
}

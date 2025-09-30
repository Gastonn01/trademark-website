"use client"

import Image from "next/image"

interface CountrySelectCardProps {
  country: string
  flag: string
  onSelect: () => void
  selected: boolean
}

export function CountrySelectCard({ country, flag, onSelect, selected }: CountrySelectCardProps) {
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
    </div>
  )
}

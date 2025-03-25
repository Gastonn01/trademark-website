"use client"

import { Info } from "lucide-react"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

interface CountrySelectCardProps {
  country: string
  flag: string
  price?: number
  additionalClassPrice?: number
  onSelect: () => void
  selected: boolean
}

export function CountrySelectCard({
  country,
  flag,
  price,
  additionalClassPrice,
  onSelect,
  selected,
}: CountrySelectCardProps) {
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
      {price !== undefined && (
        <div className="flex items-center gap-2">
          <span className="font-semibold">${price}</span>
          {additionalClassPrice !== undefined && (
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-6 w-6 p-0 ${selected ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Additional class price information</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent sideOffset={5}>
                  <p>Additional class price: ${additionalClassPrice}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )}
    </div>
  )
}


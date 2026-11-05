"use client"

import { useState } from "react"
import { ArrowRight, Search } from "lucide-react"

export function HeroNameSearch() {
  const [searchTerm, setSearchTerm] = useState("")

  const submit = () => {
    window.dispatchEvent(new CustomEvent("jp:instant-check", { detail: searchTerm }))
  }

  return (
    <div className="max-w-xl mx-auto mb-6">
      <div className="bg-white rounded-full shadow-2xl p-1.5 flex flex-col sm:flex-row gap-1.5">
        <div className="flex-1 flex items-center px-5 py-3">
          <Search className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Your name or brand"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit()
            }}
            className="flex-1 bg-transparent border-none outline-none text-primary placeholder:text-gray-400 min-w-0"
          />
        </div>
        <button
          type="button"
          onClick={submit}
          className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold text-primary bg-accent hover:brightness-105 rounded-full transition-all duration-300 whitespace-nowrap"
        >
          Check your name
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
      <p className="text-white/40 text-xs mt-4 tracking-wide">
        Free search&ensp;&middot;&ensp;No credit card&ensp;&middot;&ensp;Results in seconds
      </p>
    </div>
  )
}

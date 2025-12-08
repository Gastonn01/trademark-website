import { CurrencySelector } from "@/components/currency-selector"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* ... existing logo and navigation ... */}

        <div className="flex items-center gap-4">
          <CurrencySelector />

          {/* ... existing buttons ... */}
        </div>
      </div>
    </header>
  )
}

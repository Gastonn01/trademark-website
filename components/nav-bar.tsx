"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { LogoMark } from "@/components/logo-mark"
import { CurrencySelector } from "@/components/currency-selector"

const navigation = [
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/detailed-pricelist", label: "Pricing" },
  { href: "/blog", label: "Resources" },
  { href: "/contact", label: "Contact" },
]

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  return (
    <header className="w-full bg-white sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsMenuOpen(false)}>
            <LogoMark badgeClassName="bg-primary" shieldColor="var(--accent)" notchColor="var(--primary)" />
            <span className="text-xl lg:text-2xl font-bold text-primary group-hover:text-accent transition-colors">Just Protected</span>
          </Link>
          <button className="xl:hidden p-2.5 text-primary rounded-lg focus-visible:ring-2 focus-visible:ring-accent" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMenuOpen} aria-controls="mobile-navigation">{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
          <nav aria-label="Main navigation" className="hidden xl:flex items-center gap-1">
            {navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className="px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-medium">{item.label}</Link>)}
            <CurrencySelector />
            <Link href="/free-search" className="ml-3 px-6 py-3 bg-accent text-primary rounded-full font-semibold hover:brightness-105">Check your brand</Link>
          </nav>
        </div>
        {isMenuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="xl:hidden border-t border-gray-200 flex flex-col py-4 gap-1 max-h-[calc(100dvh-5rem)] overflow-y-auto">
          {navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium">{item.label}</Link>)}
          <div className="px-4 py-3"><CurrencySelector /></div>
          <Link href="/free-search" onClick={() => setIsMenuOpen(false)} className="mx-4 mt-2 px-6 py-3 bg-accent text-primary rounded-full font-semibold text-center">Check your brand</Link>
        </nav>}
      </div>
    </header>
  )
}

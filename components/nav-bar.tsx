"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown, Trophy, Tv, Mic, Briefcase } from "lucide-react"
import { LogoMark } from "@/components/logo-mark"
import { CurrencySelector } from "@/components/currency-selector"

const whoWeHelpLinks = [
  {
    href: "/for-businesses",
    icon: Briefcase,
    label: "Businesses & Entrepreneurs",
    description: "Store clones & brand name protection",
  },
  {
    href: "/for-athletes",
    icon: Trophy,
    label: "Athletes",
    description: "NIL protection & sports identity",
  },
  {
    href: "/for-creators",
    icon: Tv,
    label: "Creators & Influencers",
    description: "Brand, handle & deepfake protection",
  },
  {
    href: "/for-musicians",
    icon: Mic,
    label: "Musicians & Artists",
    description: "Artist name & voice cloning defense",
  },
]

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header
      className={`w-full bg-white sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-lg" : "border-b border-gray-200"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <LogoMark
              badgeClassName="bg-primary transition-all duration-300"
              shieldColor="var(--accent)"
              notchColor="var(--primary)"
            />
            <span className="text-2xl font-bold text-primary group-hover:text-accent transition-all duration-300">
              Just Protected
            </span>
          </Link>

          <button
            className="md:hidden p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
          </button>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/how-it-works"
              className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-medium transition-all duration-200"
            >
              How it works
            </Link>

            {/* Who We Help dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-medium transition-all duration-200"
              >
                Who We Help
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {whoWeHelpLinks.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors mt-0.5">
                          <Icon className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{item.label}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            <Link
              href="/scan"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-medium transition-all duration-200"
            >
              Clone Scan
              <span className="text-[0.6rem] font-bold uppercase tracking-wider bg-accent/15 text-accent px-1.5 py-0.5 rounded">
                Free
              </span>
            </Link>
            <Link
              href="/detailed-pricelist"
              className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-medium transition-all duration-200"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-medium transition-all duration-200"
            >
              Blog
            </Link>
            <Link
              href="/book-a-call"
              className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-medium transition-all duration-200"
            >
              Book a Call
            </Link>
            <CurrencySelector />
            <Link
              href="/free-search"
              className="ml-3 px-6 py-2.5 bg-accent hover:bg-accent/90 text-primary rounded-lg font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Start Free Search
            </Link>
          </nav>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col py-4 space-y-1">
              <Link
                href="/how-it-works"
                className="px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-100 rounded-lg font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                How it works
              </Link>

              {/* Mobile: Who We Help section */}
              <div className="px-4 py-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Who We Help</p>
                {whoWeHelpLinks.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-2 py-2.5 text-gray-700 hover:text-primary hover:bg-gray-100 rounded-lg transition-all duration-200"
                    >
                      <Icon className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  )
                })}
              </div>

              <Link
                href="/scan"
                className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-100 rounded-lg font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Clone Scan
                <span className="text-[0.6rem] font-bold uppercase tracking-wider bg-accent/15 text-accent px-1.5 py-0.5 rounded">
                  Free
                </span>
              </Link>
              <Link
                href="/book-a-call"
                className="px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-100 rounded-lg font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Book a Call
              </Link>
              <Link
                href="/detailed-pricelist"
                className="px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-100 rounded-lg font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/blog"
                className="px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-100 rounded-lg font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <div className="px-4 py-3">
                <CurrencySelector />
              </div>
              <Link
                href="/free-search"
                className="mx-4 mt-2 px-6 py-3 bg-accent hover:bg-accent/90 text-primary rounded-lg font-bold text-center shadow-md hover:shadow-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Start Free Search
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

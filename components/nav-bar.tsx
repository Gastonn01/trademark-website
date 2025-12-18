"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Shield } from "lucide-react"
import { CurrencySelector } from "@/components/currency-selector"

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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
            <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-primary group-hover:bg-accent transition-all duration-300">
              <Shield className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
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
            <Link
              href="/about"
              className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-medium transition-all duration-200"
            >
              About
            </Link>
            <Link
              href="/detailed-pricelist"
              className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-medium transition-all duration-200"
            >
              Pricing
            </Link>
            <Link
              href="/legal-services"
              className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-medium transition-all duration-200"
            >
              Legal Services
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-medium transition-all duration-200"
            >
              Blog
            </Link>
            <CurrencySelector />
            <Link
              href="/free-search"
              className="ml-3 px-6 py-2.5 bg-accent hover:bg-accent/90 text-white rounded-lg font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Start Free Search
            </Link>
          </nav>
        </div>

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
              <Link
                href="/about"
                className="px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-100 rounded-lg font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/detailed-pricelist"
                className="px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-100 rounded-lg font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/legal-services"
                className="px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-100 rounded-lg font-medium transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Legal Services
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
                className="mx-4 mt-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-bold text-center shadow-md hover:shadow-lg transition-all duration-200"
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

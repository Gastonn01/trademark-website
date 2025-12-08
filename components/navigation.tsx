"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full bg-white shadow-sm py-6 relative z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
          Just Protected
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/how-it-works" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            How it works
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            About
          </Link>
          <Link href="/detailed-pricelist" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Pricing
          </Link>
          <Link href="/legal-services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Legal Services
          </Link>
          <Link href="/blog" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
            Blog
          </Link>
          <Link
            href="/free-search"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            Free Search
          </Link>
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-md z-50 md:hidden">
            <div className="flex flex-col p-4 space-y-4">
              <Link
                href="/how-it-works"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How it works
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/detailed-pricelist"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/legal-services"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Legal Services
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/free-search"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Free Search
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

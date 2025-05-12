"use client"

import { useState, useEffect } from "react"
import { VerificationForm } from "./verification-form"
import Link from "next/link"
import { Facebook, Linkedin, Instagram, Twitter } from "lucide-react"

interface VerificationContentProps {
  searchId?: string
  verificationToken?: string
}

export function VerificationContent({ searchId, verificationToken }: VerificationContentProps) {
  const [searchData, setSearchData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    // Only fetch if searchId is provided
    if (searchId) {
      const fetchSearchData = async () => {
        setIsLoading(true)
        try {
          const response = await fetch(`/api/submit-free-search?search_id=${searchId}`)
          if (response.ok) {
            const data = await response.json()
            setSearchData(data)
          } else {
            console.error("Failed to fetch search data")
          }
        } catch (error) {
          console.error("Error fetching search data:", error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchSearchData()
    }
  }, [searchId])

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <VerificationForm
          initialData={searchData}
          isLoading={isLoading}
          searchId={searchId}
          verificationToken={verificationToken}
        />
      </div>

      <footer className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Navigation Column */}
            <div>
              <h3 className="text-blue-400 font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="hover:text-blue-400">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="/detailed-pricelist" className="hover:text-blue-400">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-blue-400">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-blue-400">
                    Trademark Q&A
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-blue-400">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/monitoring" className="hover:text-blue-400">
                    Terms of Monitoring services
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <h3 className="text-blue-400 font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/services" className="hover:text-blue-400">
                    Trademark registration
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-blue-400">
                    IP Legal services
                  </Link>
                </li>
                <li>
                  <Link href="/portal" className="hover:text-blue-400">
                    Customer portal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Offices Column */}
            <div>
              <h3 className="text-blue-400 font-semibold mb-4">Offices</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">United Kingdom</h4>
                  <p className="text-sm text-gray-300">86-90 Paul Street</p>
                  <p className="text-sm text-gray-300">London EC2A 4NE</p>
                  <p className="text-sm text-gray-300">(+44) 74 8888 2146</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">European Union</h4>
                  <p className="text-sm text-gray-300">Bottova 2A</p>
                  <p className="text-sm text-gray-300">811 09 Bratislava</p>
                  <p className="text-sm text-gray-300">(+421) 2 3345 6574</p>
                </div>
              </div>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-blue-400 font-semibold mb-4">Contact</h3>
              <p className="text-sm mb-2">support@justprotected.com</p>
              <p className="text-sm mb-4">Mo - Fr: 9am - 5pm (CET)</p>

              <div className="flex space-x-4 mb-6">
                <Link href="https://linkedin.com" className="hover:text-blue-400">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="https://facebook.com" className="hover:text-blue-400">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="https://instagram.com" className="hover:text-blue-400">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="https://twitter.com" className="hover:text-blue-400">
                  <Twitter className="h-5 w-5" />
                </Link>
              </div>

              <h3 className="text-blue-400 font-semibold mb-4">Payment methods</h3>
              <div className="flex space-x-2">
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <img src="/visa.svg" alt="Visa" className="h-4" />
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <img src="/mastercard.svg" alt="Mastercard" className="h-4" />
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <img src="/revolut.svg" alt="Revolut" className="h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

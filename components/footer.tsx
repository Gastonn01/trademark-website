import Link from "next/link"
import { Shield, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-white py-16 border-t border-primary/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-accent">
                <Shield className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-bold text-white">Just Protected</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Global trademark registration services providing comprehensive intellectual property protection for
              businesses worldwide. Licensed attorneys with 15+ years of experience.
            </p>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent" />
                <a href="mailto:contact@justprotected.com" className="hover:text-accent transition-colors">
                  contact@justprotected.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent" />
                <span>Available 24/7</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/free-search" className="text-gray-300 hover:text-accent transition-colors">
                  Free Trademark Search
                </Link>
              </li>
              <li>
                <Link href="/verification" className="text-gray-300 hover:text-accent transition-colors">
                  Trademark Registration
                </Link>
              </li>
              <li>
                <Link href="/legal-services" className="text-gray-300 hover:text-accent transition-colors">
                  Legal Services
                </Link>
              </li>
              <li>
                <Link href="/detailed-pricelist" className="text-gray-300 hover:text-accent transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-accent transition-colors">
                  Blog & Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-accent transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Just Protected. All rights reserved. Licensed trademark attorneys.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>Member: International Trademark Association</span>
              <span>•</span>
              <span>Bar Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

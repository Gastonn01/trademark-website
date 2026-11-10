import Link from "next/link"
import { Mail, Phone } from "lucide-react"
import { LogoMark } from "@/components/logo-mark"
import { BlogContextualLinks } from "@/components/blog-contextual-links"

export function Footer() {
  return (
    <footer className="bg-primary text-white py-16 border-t border-primary/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <LogoMark badgeClassName="bg-accent" shieldColor="var(--primary)" notchColor="var(--accent)" />
              <span className="text-2xl font-bold text-white">Just Protected</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Global trademark registration services providing comprehensive intellectual property protection for
              businesses worldwide. Licensed attorneys with 15+ years of experience.
            </p>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent" />
                <a href="/contact" className="hover:text-accent transition-colors">Contact form</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent" />
                <span>Available 24/7</span>
              </div>
              <div className="flex items-center gap-4 pt-2 text-sm">
                <a
                  href="https://www.instagram.com/just_protected/"
                  className="hover:text-accent transition-colors"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Instagram
                </a>
                <a
                  href="https://www.tiktok.com/@just_protected"
                  className="hover:text-accent transition-colors"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Services</h4>
            <ul className="space-y-3">
              {[
                { href: "/free-search", label: "Check your brand" },
                { href: "/verification", label: "Register a trademark" },
                { href: "/legal-services", label: "Trademark support" },
                { href: "/services", label: "All services & who we help" },
                { href: "/detailed-pricelist", label: "Pricing" },
                { href: "/book-a-call", label: "Book a call" },
              ].map(item => <li key={item.href}><Link href={item.href} className="text-gray-300 hover:text-accent transition-colors">{item.label}</Link></li>)}
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

        <BlogContextualLinks />

        <div className="pt-8 border-t border-white/10 space-y-3">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Just Protected. All rights reserved. Licensed trademark attorneys.
          </p>
          <p className="text-gray-500 text-xs text-center md:text-left">General information, not legal advice.</p>
        </div>
      </div>
    </footer>
  )
}

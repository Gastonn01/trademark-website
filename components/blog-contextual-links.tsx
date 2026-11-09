"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

type InternalLink = { href: string; label: string }

const COUNTRY_LINKS: { test: (slug: string) => boolean; href: string; label: string }[] = [
  { test: (s) => s.includes("china"), href: "/trademark-registration/china", label: "Trademark registration in China" },
  {
    test: (s) => s.includes("united-kingdom") || s.includes("kingdom"),
    href: "/trademark-registration/united-kingdom",
    label: "Trademark registration in the United Kingdom",
  },
  { test: (s) => s.includes("germany"), href: "/trademark-registration/germany", label: "Trademark registration in Germany" },
  { test: (s) => s.includes("india"), href: "/trademark-registration/india", label: "Trademark registration in India" },
  {
    test: (s) => s.includes("european-union") || s.includes("union-europea") || s.endsWith("-eu") || s.includes("trademark-eu"),
    href: "/trademark-registration/european-union",
    label: "Trademark registration in the European Union",
  },
  { test: (s) => s.includes("france"), href: "/trademark-registration/france", label: "Trademark registration in France" },
  { test: (s) => s.includes("spain"), href: "/trademark-registration/spain", label: "Trademark registration in Spain" },
  {
    test: (s) => s.includes("usa") || s.includes("california") || s.includes("estados-unidos") || s.includes("uspto"),
    href: "/trademark-registration/united-states",
    label: "Trademark registration in the United States",
  },
  { test: (s) => s.includes("mexico"), href: "/trademark-registration/mexico", label: "Trademark registration in Mexico" },
  { test: (s) => s.includes("brazil"), href: "/trademark-registration/brazil", label: "Trademark registration in Brazil" },
  { test: (s) => s.includes("argentina"), href: "/trademark-registration/argentina", label: "Trademark registration in Argentina" },
  { test: (s) => s.includes("singapore"), href: "/trademark-registration/singapore", label: "Trademark registration in Singapore" },
  { test: (s) => s.includes("italy"), href: "/trademark-registration/italy", label: "Trademark registration in Italy" },
  { test: (s) => s.includes("canada"), href: "/trademark-registration/canada", label: "Trademark registration in Canada" },
]

const FREE_SEARCH: InternalLink = { href: "/free-search", label: "Free trademark name check" }

const AUDIENCES: { test: (slug: string) => boolean; href: string; label: string }[] = [
  { test: (s) => s.includes("amazon"), href: "/for-amazon-sellers", label: "Trademark help for Amazon sellers" },
  {
    test: (s) =>
      s.includes("athlete") ||
      s.includes("palmer") ||
      s.includes("sport") ||
      s.includes("nil") ||
      s.includes("lebron") ||
      s.includes("doncic"),
    href: "/for-athletes",
    label: "Trademark protection for athletes",
  },
  {
    test: (s) =>
      s.includes("music") ||
      s.includes("drake") ||
      s.includes("artist") ||
      s.includes("elvis") ||
      s.includes("suno") ||
      s.includes("eminem") ||
      s.includes("deepfake"),
    href: "/for-musicians",
    label: "Trademark protection for musicians",
  },
  {
    test: (s) =>
      s.includes("creator") ||
      s.includes("influencer") ||
      s.includes("tiktok") ||
      s.includes("logo") ||
      s.includes("voice") ||
      s.includes("disney") ||
      s.includes("ai") ||
      s.includes("username") ||
      s.includes("handle") ||
      s.includes("deepfake") ||
      s.includes("likeness"),
    href: "/for-creators",
    label: "Trademark protection for creators",
  },
  {
    test: (s) => s.includes("business") || s.includes("dupe") || s.includes("brand") || s.includes("knockoff"),
    href: "/for-businesses",
    label: "Trademark protection for businesses",
  },
]

const DEFAULT_AUDIENCES: InternalLink[] = [
  { href: "/for-creators", label: "Trademark protection for creators" },
  { href: "/for-businesses", label: "Trademark protection for businesses" },
  { href: "/for-amazon-sellers", label: "Trademark help for Amazon sellers" },
]

const MAJOR_COUNTRIES: InternalLink[] = [
  { href: "/trademark-registration/united-states", label: "Trademark registration in the United States" },
  { href: "/trademark-registration/european-union", label: "Trademark registration in the European Union" },
  { href: "/trademark-registration/united-kingdom", label: "Trademark registration in the United Kingdom" },
  { href: "/trademark-registration/china", label: "Trademark registration in China" },
]

function unique(links: InternalLink[], current: string) {
  const seen = new Set<string>()
  return links.filter((link) => {
    if (link.href === current || seen.has(link.href)) return false
    seen.add(link.href)
    return true
  })
}

export function linksForPath(pathname: string): InternalLink[] {
  const slug = pathname.replace(/\/$/, "")
  if (!slug.startsWith("/blog")) return []

  if (slug === "/blog") {
    return unique([FREE_SEARCH, ...DEFAULT_AUDIENCES, { href: "/for-athletes", label: "Trademark protection for athletes" }, { href: "/for-musicians", label: "Trademark protection for musicians" }, ...MAJOR_COUNTRIES], slug)
  }

  const post = slug.slice("/blog/".length)
  const countries = COUNTRY_LINKS.filter((item) => item.test(post)).map(({ href, label }) => ({ href, label }))
  const audiences = AUDIENCES.filter((item) => item.test(post)).map(({ href, label }) => ({ href, label }))
  const links = [
    FREE_SEARCH,
    ...countries,
    ...(audiences.length > 0 ? audiences : DEFAULT_AUDIENCES.slice(0, 2)),
    ...(countries.length === 0 ? MAJOR_COUNTRIES.slice(0, 2) : []),
    { href: "/blog", label: "All trademark guides" },
  ]
  return unique(links, slug)
}

export function BlogContextualLinks() {
  const pathname = usePathname() || ""
  const links = linksForPath(pathname)
  if (links.length === 0) return null

  return (
    <nav aria-label="Related trademark resources" className="mb-10 border-t border-white/10 pt-8">
      <h2 className="text-lg font-bold mb-4 text-white">Related resources</h2>
      <ul className="grid sm:grid-cols-2 gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-gray-300 hover:text-accent transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

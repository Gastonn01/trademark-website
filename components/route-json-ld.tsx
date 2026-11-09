"use client"

import { usePathname } from "next/navigation"
import { SITE_NAME, SITE_URL } from "@/lib/seo"

const SERVICE_PATHS = new Set([
  "/",
  "/services",
  "/scan",
  "/escaneo",
  "/free-search",
  "/for-creators",
  "/for-athletes",
  "/for-musicians",
  "/for-businesses",
  "/for-amazon-sellers",
  "/ai-brand-protection",
  "/legal-services",
  "/trademark-monitoring",
  "/verification",
])

function humanize(pathname: string) {
  const slug = pathname.split("/").filter(Boolean).pop() || "Just Protected"
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

export function RouteJsonLd() {
  const pathname = usePathname() || "/"
  const url = pathname === "/" ? `${SITE_URL}/` : `${SITE_URL}${pathname}`
  const isArticle = pathname.startsWith("/blog/") && pathname !== "/blog"
  const pageType = isArticle ? "BlogPosting" : pathname === "/blog" ? "Blog" : "WebPage"

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      description:
        "Trademark and name, image, and likeness protection for athletes, creators, and musicians. Licensed attorneys with 15+ years of experience.",
    },
    {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    {
      "@type": pageType,
      url,
      headline: isArticle ? humanize(pathname) : undefined,
      name: isArticle ? humanize(pathname) : SITE_NAME,
      isPartOf: SITE_URL,
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
  ]

  if (SERVICE_PATHS.has(pathname) || pathname.startsWith("/trademark-registration/")) {
    graph.push({
      "@type": "Service",
      name: "Trademark registration",
      url,
      provider: { "@type": "LegalService", name: SITE_NAME, url: SITE_URL },
    })
  }

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph })

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}

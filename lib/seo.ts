import type { Metadata } from "next"

/** Apex origin. Canonicals and the sitemap always use this host, never www. */
export const SITE_URL = "https://justprotected.com"
export const SITE_NAME = "Just Protected"

type PageMetadataInput = {
  title: string
  description: string
  /** Path beginning with "/", or "/" for the homepage. Resolved against metadataBase. */
  path: string
  keywords?: string
  type?: "website" | "article"
  noindex?: boolean
  languages?: Record<string, string>
}

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  noindex = false,
  languages,
}: PageMetadataInput): Metadata {
  const canonical = path.startsWith("/") ? path : `/${path}`

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  }
}

export type FaqItem = { question: string; answer: string }

export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export function articleJsonLd({
  headline,
  description,
  path,
  datePublished,
}: {
  headline: string
  description: string
  path: string
  datePublished: string
}) {
  const url = `${SITE_URL}${path}`
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished,
    dateModified: datePublished,
    mainEntityOfPage: url,
    url,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  }
}

export function serviceJsonLd({
  name,
  description,
  path,
}: {
  name: string
  description: string
  path: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    provider: {
      "@type": "LegalService",
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}

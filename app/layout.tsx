import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Just Protected - Global Trademark Registration Services",
  description: "Secure your brand worldwide with Just Protected's comprehensive trademark registration services.",
  openGraph: {
    title: "Just Protected - Global Trademark Registration Services",
    description: "Secure your brand worldwide with Just Protected's comprehensive trademark registration services.",
    url: "https://justprotected.com",
    siteName: "Just Protected",
    images: [
      {
        url: "https://justprotected.com/logo.png",
        width: 512,
        height: 512,
        alt: "Just Protected Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Just Protected - Global Trademark Registration Services",
    description: "Secure your brand worldwide with Just Protected's comprehensive trademark registration services.",
    images: ["https://justprotected.com/logo.png"],
  },
  alternates: {
    canonical: "https://justprotected.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta name="google-site-verification" content="6dpN_v4tVuDR1yKD24oiRYmdwt1EdkvfL9rjHBe4dUo" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body>
        {children}
        <Analytics />
        <Script id="schema-org" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Just Protected",
              "url": "https://justprotected.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://justprotected.com/logo.png",
                "width": 512,
                "height": 512,
                "caption": "JP - Just Protected"
              },
              "sameAs": [
                "https://www.facebook.com/justprotected",
                "https://www.linkedin.com/company/justprotected",
                "https://twitter.com/justprotected"
              ],
              "description": "Global Trademark Registration Services. Protect your brand identity across borders with our AI-powered trademark search and registration services.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              }
            }
          `}
        </Script>
      </body>
    </html>
  )
}



import './globals.css'
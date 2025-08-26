import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"
import { CurrencyProvider } from "@/lib/currency-context"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Just Protected - Trademark Registration & Protection Services",
  description:
    "Professional trademark registration and protection services worldwide. Secure your brand with expert legal guidance and comprehensive trademark solutions.",
  keywords: "trademark registration, brand protection, intellectual property, trademark search, legal services",
  authors: [{ name: "Just Protected" }],
  creator: "Just Protected",
  publisher: "Just Protected",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://justprotected.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Just Protected - Trademark Registration & Protection Services",
    description:
      "Professional trademark registration and protection services worldwide. Secure your brand with expert legal guidance.",
    url: "https://justprotected.com",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Just Protected Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Just Protected - Trademark Registration & Protection Services",
    description:
      "Professional trademark registration and protection services worldwide. Secure your brand with expert legal guidance.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "6e5b936f07814729",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>
        <CurrencyProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <Suspense fallback={null}>{children}</Suspense>
            <Toaster />
          </ThemeProvider>
        </CurrencyProvider>
        <Analytics />
      </body>
    </html>
  )
}

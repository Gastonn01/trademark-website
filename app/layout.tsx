import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Just Protected - Trademark Registration Services",
  description: "Professional trademark registration services worldwide. Protect your brand with our expert legal team.",
  keywords: "trademark registration, brand protection, intellectual property, legal services",
  authors: [{ name: "Just Protected" }],
  creator: "Just Protected",
  publisher: "Just Protected",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://justprotected.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Just Protected - Trademark Registration Services",
    description:
      "Professional trademark registration services worldwide. Protect your brand with our expert legal team.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://justprotected.com",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Just Protected - Trademark Registration Services",
    description:
      "Professional trademark registration services worldwide. Protect your brand with our expert legal team.",
    creator: "@justprotected",
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
    yandex: "your-yandex-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

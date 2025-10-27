import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/next"
import { GTMTracker } from "@/components/gtm-tracker"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Suspense } from "react"
import Script from "next/script"
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
    generator: 'v0.app'
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

        {/* Consent Mode v2 - Must run before GTM */}
        <Script
          id="consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied', 
                ad_personalization: 'denied',
                analytics_storage: 'denied'
              });
            `,
          }}
        />

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5DDZ4XHV');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5DDZ4XHV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Suspense fallback={null}>
          <ScrollToTop />
          <GTMTracker />
          {children}
          <Toaster />
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}

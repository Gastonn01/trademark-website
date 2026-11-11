import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { SiteAnalytics } from "@/components/site-analytics"
import { GTMTracker } from "@/components/gtm-tracker"
import { CookieConsentBanner } from "@/components/cookie-consent-banner"
import { ScrollToTop } from "@/components/scroll-to-top"
import { TrademarkFAQBot } from "@/components/trademark-faq-bot"
import { RouteJsonLd } from "@/components/route-json-ld"
import { OG_IMAGE } from "@/lib/seo"
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
  metadataBase: new URL("https://justprotected.com"),
  openGraph: {
    title: "Just Protected - Trademark Registration Services",
    description:
      "Professional trademark registration services worldwide. Protect your brand with our expert legal team.",
    url: "https://justprotected.com",
    siteName: "Just Protected",
    locale: "en_US",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Just Protected - Trademark Registration Services",
    description:
      "Professional trademark registration services worldwide. Protect your brand with our expert legal team.",
    images: [OG_IMAGE.url],
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
  generator: "v0.app",
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
        {/* Kept in the document head so pages that replace openGraph still expose a share image. */}
        <meta property="og:image" content="https://justprotected.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Just Protected. AI is using your name. Time to fight back." />
        <meta name="twitter:image" content="https://justprotected.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />

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

        {/* Blocks the stray Cookiebot tag firing from inside GTM (unauthorized
            domain group, dead weight) — we have our own consent banner and
            don't control that GTM account to remove the tag directly. */}
        <Script
          id="block-cookiebot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function isCookiebot(el) {
                  return el && el.tagName === 'SCRIPT' && typeof el.src === 'string' && el.src.indexOf('cookiebot.com') !== -1;
                }
                var origAppendChild = Node.prototype.appendChild;
                Node.prototype.appendChild = function(node) {
                  if (isCookiebot(node)) return node;
                  return origAppendChild.call(this, node);
                };
                var origInsertBefore = Node.prototype.insertBefore;
                Node.prototype.insertBefore = function(node, ref) {
                  if (isCookiebot(node)) return node;
                  return origInsertBefore.call(this, node, ref);
                };
              })();
            `,
          }}
        />

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){if(d.cookie.split(';').some(function(c){return c.trim()==='jp_exclude_analytics=1';})){w['ga-disable-G-ZHE1N7PH51']=true;return;}w[l]=w[l]||[];w[l].push({'gtm.start':
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
            src="/analytics/tag-manager"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <RouteJsonLd />
        <ScrollToTop />
        {children}
        <Toaster />
        <SiteAnalytics />
        <TrademarkFAQBot />
        <Suspense fallback={null}>
          <GTMTracker />
        </Suspense>
        <CookieConsentBanner />
      </body>
    </html>
  )
}

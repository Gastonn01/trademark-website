import type React from "react"
import "@/app/globals.css"
import "@/app/fix-top-space.css"
import { Inter } from "next/font/google"
import Script from "next/script"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"
import { TrademarkChatbot } from "@/components/trademark-chatbot"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Trakmar | Conectamos Emprendedores con Agentes de Marcas",
  description:
    "Plataforma que conecta emprendedores y empresas with agentes de marcas verificados en Argentina. Registro de marcas simplificado y transparente.",
  metadataBase: new URL("https://trakmar.com"),
  applicationName: "Trakmar",
  openGraph: {
    title: "Trakmar | Conectamos Emprendedores con Agentes de Marcas",
    description: "Plataforma que conecta emprendedores y empresas con agentes de marcas verificados en Argentina.",
    url: "https://trakmar.com",
    siteName: "Trakmar",
    images: [
      {
        url: "https://trakmar.com/logo.png",
        width: 512,
        height: 512,
        alt: "Trakmar Logo",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trakmar | Conectamos Emprendedores con Agentes de Marcas",
    description: "Plataforma que conecta emprendedores y empresas con agentes de marcas verificados en Argentina.",
    images: ["https://trakmar.com/logo.png"],
  },
  alternates: {
    canonical: "https://trakmar.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.className}>
      <head>
        <meta name="google-site-verification" content="6dpN_v4tVuDR1yKD24oiRYmdwt1EdkvfL9rjHBe4dUo" />
        <meta name="msvalidate.01" content="4F29914D377793189675972516715A23" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Cargando...</div>}>
            {children}
          </Suspense>
          <Toaster />
          <TrademarkChatbot />
        </ThemeProvider>
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-17618544334" strategy="afterInteractive" />
        <Script id="google-ads-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17618544334');
          `}
        </Script>
        <Script id="schema-org" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Trakmar",
              "alternateName": "Trakmar",
              "url": "https://trakmar.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://trakmar.com/logo.png",
                "width": 512,
                "height": 512,
                "caption": "Trakmar"
              },
              "description": "Plataforma que conecta emprendedores y empresas con agentes de marcas verificados en Argentina. Registro de marcas simplificado y transparente.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "AR"
              }
            }
          `}
        </Script>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-4WFT849RER" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4WFT849RER');
          `}
        </Script>
        <Analytics />
      </body>
    </html>
  )
}

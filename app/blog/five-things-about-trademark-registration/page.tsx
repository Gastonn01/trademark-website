import FiveThingsTrademarkPageClient from "./FiveThingsTrademarkPageClient"

export const metadata = {
  openGraph: {
    title: "5 Things You Didn't Know About Trademark Registration | 2026",
    description: "Discover surprising facts about trademark registration that could impact your brand protection strategy. Learn about unusual trademarks, territorial rights, and more.",
    url: "/blog/five-things-about-trademark-registration",
    siteName: "Just Protected",
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "5 Things You Didn't Know About Trademark Registration | 2026",
    description: "Discover surprising facts about trademark registration that could impact your brand protection strategy. Learn about unusual trademarks, territorial rights, and more.",
  },
  title: "5 Things You Didn't Know About Trademark Registration | 2026",
  description:
    "Discover surprising facts about trademark registration that could impact your brand protection strategy. Learn about unusual trademarks, territorial rights, and more.",
  keywords: "trademark facts, unusual trademarks, trademark protection, trademark registration tips, brand protection",
  alternates: {
    canonical: "/blog/five-things-about-trademark-registration",
  },
}

export default function FiveThingsTrademarkPage() {
  return <FiveThingsTrademarkPageClient />
}

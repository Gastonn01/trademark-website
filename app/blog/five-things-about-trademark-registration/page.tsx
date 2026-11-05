import FiveThingsTrademarkPageClient from "./FiveThingsTrademarkPageClient"

export const metadata = {
  title: "5 Things You Didn't Know About Trademark Registration | 2024",
  description:
    "Discover surprising facts about trademark registration that could impact your brand protection strategy. Learn about unusual trademarks, territorial rights, and more.",
  keywords: "trademark facts, unusual trademarks, trademark protection, trademark registration tips, brand protection",
  alternates: {
    canonical: "/blog/five-things-about-trademark-registration",
  },

  openGraph: {
    title: "5 Things You Didn't Know About Trademark Registration | 2024",
    description: "Discover surprising facts about trademark registration that could impact your brand protection strategy. Learn about unusual trademarks, territorial rights, and more.",
    url: "/blog/five-things-about-trademark-registration",
    siteName: "Just Protected",
    locale: "en_US",
    type: "article",
  },

  twitter: {
    card: "summary_large_image",
    title: "5 Things You Didn't Know About Trademark Registration | 2024",
    description: "Discover surprising facts about trademark registration that could impact your brand protection strategy. Learn about unusual trademarks, territorial rights, and more.",
  },
}

export default function FiveThingsTrademarkPage() {
  return <FiveThingsTrademarkPageClient />
}

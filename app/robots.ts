import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

/** Private or non-content paths, plus query-filtered copies of the free search. */
const DISALLOW = [
  "/api/",
  "/api/*",
  "/free-search?*",
  "/free-search/?*",
  "/free-search/started",
  "/free-search/email",
  "/free-search/details",
  "/thank-you/name-check",
  "/thank-you/contact",
  "/thank-you/book-a-call",
  "/thank-you/clone-scan",
  "/thank-you/affiliate",
  "/thank-you/amazon-review",
  "/thank-you/registration",
  "/thank-you/payment",
  "/admin",
  "/login",
  "/webhook-status",
  "/payment-confirmation",
  "/forms",
]

const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "Google-Extended",
  "Applebot-Extended",
]

export default function robots(): MetadataRoute.Robots {
  const publicRule = { allow: "/", disallow: DISALLOW }

  return {
    rules: [{ userAgent: "*", ...publicRule }, ...AI_CRAWLERS.map((userAgent) => ({ userAgent, ...publicRule }))],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}

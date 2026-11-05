import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

const PRIVATE_PATHS = ["/api/", "/admin", "/login", "/webhook-status", "/payment-confirmation", "/forms"]

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
  const publicRule = { allow: "/", disallow: PRIVATE_PATHS }

  return {
    rules: [{ userAgent: "*", ...publicRule }, ...AI_CRAWLERS.map((userAgent) => ({ userAgent, ...publicRule }))],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}

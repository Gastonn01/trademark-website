import fs from "fs"
import path from "path"
import type { MetadataRoute } from "next"
import { countrySlug, getAllCountryNames } from "@/lib/country-pages"
import { SITE_URL } from "@/lib/seo"

/** Routes that redirect, require auth, or only exist after a transaction. */
const EXCLUDED = new Set([
  "/admin",
  "/login",
  "/webhook-status",
  "/payment-confirmation",
  "/forms",
  "/thank-you",
  "/thank-you-verification",
  "/pricing",
  "/blog/register-trademark-european-union",
  "/blog/trademark-registration-china",
  "/blog/trademark-registration-united-kingdom",
  "/blog/trademark-registration-germany",
  "/blog/trademark-registration-india",
  "/trademark-process",
])

function fileMtime(filePath: string): Date {
  try {
    return fs.statSync(filePath).mtime
  } catch {
    return new Date("2026-11-09T00:00:00Z")
  }
}

function staticRoutes(): { route: string; file: string }[] {
  const appDir = path.join(process.cwd(), "app")
  const routes: { route: string; file: string }[] = []

  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === "api" || entry.name.startsWith("_") || entry.name.startsWith("[")) continue
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full)
      } else if (entry.name === "page.tsx") {
        const rel = path.relative(appDir, dir)
        const route = rel === "" ? "/" : `/${rel.split(path.sep).join("/")}`
        if (!EXCLUDED.has(route)) routes.push({ route, file: full })
      }
    }
  }

  walk(appDir)
  return routes
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = new Map<string, Date>()

  for (const { route, file } of staticRoutes()) {
    entries.set(route, fileMtime(file))
  }

  const countryTemplate = path.join(process.cwd(), "app/trademark-registration/[country]/page.tsx")
  const countryModified = fileMtime(countryTemplate)
  for (const name of getAllCountryNames()) {
    entries.set(`/trademark-registration/${countrySlug(name)}`, countryModified)
  }

  return [...entries.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([route, lastModified]) => ({
      url: route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`,
      lastModified,
      changeFrequency: route === "/" || route === "/blog" ? "weekly" : "monthly",
      priority: route === "/" ? 1 : route.split("/").length > 2 ? 0.6 : 0.8,
    }))
}

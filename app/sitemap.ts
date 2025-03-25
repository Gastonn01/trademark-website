import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://justprotected.com"

  // Rutas principales
  const mainRoutes = ["", "/about", "/pricing", "/how-it-works", "/contact", "/verification", "/blog"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Rutas de blog
  const blogPosts = [
    "/blog/trademark-classification",
    "/blog/trademark-registration-comparison",
    "/blog/register-trademark-usa",
    "/blog/register-trademark-european-union",
    "/blog/register-trademark-china",
    "/blog/register-trademark-india",
    // Añade aquí todas las rutas de blog
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  return [...mainRoutes, ...blogPosts]
}


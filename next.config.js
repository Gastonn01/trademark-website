/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "flagcdn.com"],
    unoptimized: true, // Necesario para export
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add this to handle API routes in static export
  trailingSlash: true,
}

module.exports = nextConfig

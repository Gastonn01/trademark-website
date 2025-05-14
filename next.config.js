/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "example.com"],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Change output to standalone for API routes to work
  output: "standalone",
  // Add trailingSlash for better compatibility with static hosting
  trailingSlash: true,
}

module.exports = nextConfig

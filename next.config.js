/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "flagcdn.com"],
    unoptimized: true, // Necesario para export
  },
  output: "export", // Para exportar como estático
}

module.exports = nextConfig

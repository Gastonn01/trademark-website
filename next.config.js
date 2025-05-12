/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "flagcdn.com"],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configuración para asegurar que las rutas de API y el panel de administración funcionen
  output: "standalone", // Cambiado de 'export' a 'standalone'
  trailingSlash: true,
}

module.exports = nextConfig

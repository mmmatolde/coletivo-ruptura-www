/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.ctfassets.net'],
    unoptimized: true,
  },
  experimental: {
    verbose: true,
  },
  output: 'standalone',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  poweredByHeader: false,
}

export default nextConfig

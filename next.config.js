/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['contentful', '@contentful/rich-text-types'],
  images: {
    domains: ['images.ctfassets.net'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
}

module.exports = nextConfig 
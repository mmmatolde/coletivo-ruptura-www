/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['contentful', '@contentful/rich-text-types'],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
}

module.exports = nextConfig 
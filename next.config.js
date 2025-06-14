/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['contentful', '@contentful/rich-text-types'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  env: {
    CONTENTFUL_SPACE_ID: 'rvdwllnv6i3u',
    CONTENTFUL_ACCESS_TOKEN: 'CfSOh9D09HFeTWxCo8x4D-QFPSkCWI5MatXMmsidXbc',
  },
}

module.exports = nextConfig 
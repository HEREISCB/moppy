/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'www.thespruce.com',
      },
      {
        protocol: 'https',
        hostname: 'www.360precisioncleaning.com',
      },
      {
        protocol: 'https',
        hostname: 'cleanfanatics.com',
      },
    ],
  },
}

module.exports = nextConfig

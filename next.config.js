/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://datbannhahangapis.azurewebsites.net/api/:path*', // Chuyển hướng yêu cầu API
        },
      ];
    },
  };
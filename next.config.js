/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'https://localhost:44317/api/:path*', // Chuyển hướng yêu cầu API
//       },
//     ];
//   },
// };
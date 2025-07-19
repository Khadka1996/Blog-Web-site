/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.everestkit.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.everestkit.com/api/:path*', // Proxy to backend
      },
      {
        source: '/uploads/:path*',
        destination: 'https://api.everestkit.com/uploads/:path*', // Image access
      },
    ]
  },
}

export default nextConfig

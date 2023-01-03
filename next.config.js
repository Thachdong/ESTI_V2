/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async() => ([
    {
      source: '/',
      destination: '/dashboard/quotations/requests',
      permanent: true,
    },
  ])
}

module.exports = nextConfig

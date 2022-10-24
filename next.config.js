/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: () => ([
    {
      source: '/',
      destination: '/dashboard/quotations/requests',
      permanent: true,
    },
  ])
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async() => ([
    {
      source: '/',
      destination: '/dashboard/quotation/quote-list',
      permanent: true,
    },
  ])
}

module.exports = nextConfig

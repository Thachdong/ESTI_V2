/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: () => ([
    {
      source: '/',
      destination: '/dashboard',
      permanent: true,
    },
  ])
}

module.exports = nextConfig

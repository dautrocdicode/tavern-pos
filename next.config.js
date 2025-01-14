/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['salmon-raw-harrier-526.mypinata.cloud'],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig

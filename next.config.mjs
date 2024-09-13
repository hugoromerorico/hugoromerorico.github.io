/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true,
    },
    basePath: '/hugo-romero-rico',
    assetPrefix: '/hugo-romero-rico/',
  }

export default nextConfig;

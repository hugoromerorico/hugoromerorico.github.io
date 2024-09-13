/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/hugoromerorico.github.io' : '',
  assetPrefix: isProd ? '/hugoromerorico.github.io/' : '',
};

export default nextConfig;

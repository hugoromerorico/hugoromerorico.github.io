/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

console.log('Is production:', isProd); // Print whether it's in production mode

const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true, // Needed for static exports
    },
    basePath: isProd ? '/hugoromerorico.github.io' : '', // Apply basePath only in production
    assetPrefix: isProd ? '/hugoromerorico.github.io/' : '', // Apply assetPrefix only in production
};

export default nextConfig;

/** @type {import('next').NextConfig} */

var isProd = process.env.NODE_ENV === 'production';

console.log('Is production:', isProd); // Print whether it's in production mode
isProd = false; // Force development mode

const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true, // Needed for static exports
    },
    basePath: isProd ? '/hugoromerorico.github.io' : '', // Apply basePath only in production
    assetPrefix: isProd ? '/hugoromerorico.github.io/' : '', // Apply assetPrefix only in production
};

export default nextConfig;

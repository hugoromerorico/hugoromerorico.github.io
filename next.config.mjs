/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true, // Needed for static exports
    },
};

export default nextConfig;

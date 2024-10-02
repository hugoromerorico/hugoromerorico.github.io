/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true, // Needed for static exports
    },
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          path: false,
          crypto: false,
        };
      }
      
      // Add a rule to handle .node files
      config.module.rules.push({
        test: /\.node$/,
        use: 'node-loader',
      });
  
      return config;
    },
  };
  
  export default nextConfig;

/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true, // Needed for static exports
    },
    webpack: (config, { isServer }) => {
      // Add WASM support
      config.experiments = {
        ...config.experiments,
        asyncWebAssembly: true,
        layers: true,
      };

      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          path: false,
          crypto: false,
        };
      }

      // Handle .node files
      config.module.rules.push({
        test: /\.node$/,
        loader: 'node-loader',
      });

      return config;
    },
  };
  
  export default nextConfig;

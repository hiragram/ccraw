/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  typescript: {
    // Ensure TypeScript is properly configured
    tsconfigPath: './tsconfig.json',
    ignoreBuildErrors: false
  },
  swcMinify: true,
  experimental: {
    swcPlugins: []
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src')
    }
    
    // Ensure TypeScript files are handled correctly
    config.resolve.extensions = ['.tsx', '.ts', '.js', '.jsx', ...config.resolve.extensions]
    
    // Add TypeScript rule explicitly
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'next/dist/build/webpack/loaders/next-swc-loader.js',
          options: {
            sourceMaps: true,
            isServer,
            hasReactRefresh: !isServer,
            parseMap: {},
            transform: {
              react: {
                runtime: 'automatic'
              }
            }
          }
        }
      ]
    })
    
    return config
  }
}

module.exports = nextConfig
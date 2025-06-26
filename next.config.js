/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  typescript: {
    // Ensure TypeScript is properly configured
    tsconfigPath: './tsconfig.json'
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src')
    }
    
    // Ensure TypeScript files are handled correctly
    config.resolve.extensions = ['.tsx', '.ts', '.js', '.jsx', ...config.resolve.extensions]
    
    return config
  }
}

module.exports = nextConfig
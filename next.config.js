/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil',
    });
    return config;
  },
  // Deaktiviere API-Routen-Logs im Development-Modus
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  // Deaktiviere Server-Logs
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Minimiere Logs
  devIndicators: {
    buildActivity: false,
  },
};

module.exports = nextConfig;

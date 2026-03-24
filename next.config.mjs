/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/favicon.ico',
        destination: '/brand/turgut-coskun-logo.webp',
        permanent: false,
      },
    ];
  },
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  /** App Router: next.config i18n kullanilmaz; dil URL'si middleware + rewrite ile */
  transpilePackages: ['next-sanity', 'sanity', '@sanity/vision'],
  /** Üretimde gereksiz console.log temizliği */
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? { exclude: ['error', 'warn'] }
        : false,
  },
  /** Tree-shake: framer-motion içe aktarımı küçültür (özellikle mobil) */
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
    ],
  },
};

export default nextConfig;

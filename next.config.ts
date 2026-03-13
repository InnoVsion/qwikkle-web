import type { NextConfig } from 'next';

const cdnHost = process.env.NEXT_PUBLIC_CDN_HOST;

const nextConfig: NextConfig = {
  output: 'standalone', // Required for Docker multi-stage builds
  typedRoutes: true, // Type-safe Link hrefs
  images: {
    remotePatterns: cdnHost
      ? [{ protocol: 'https', hostname: cdnHost }]
      : [],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;

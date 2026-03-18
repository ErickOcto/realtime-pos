import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  devIndicators: false,
  images: {
    domains: ['https://eyqkhediqoytafmslmpt.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eyqkhediqoytafmslmpt.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};


export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/Inzaghi',
  assetPrefix: '/Inzaghi',
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
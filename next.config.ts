import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // ADD THESE TWO LINES:
  basePath: '/Inzaghi',    // Tells Next.js the site is in the /Inzaghi subfolder
  assetPrefix: '/Inzaghi', // Ensures CSS and JS files load from the right path
  
  // Keep these to bypass strict errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',      // This is the magic line for GitHub Pages
  images: {
    unoptimized: true,   // Required because GitHub can't resize images on the fly
  },
  // If your URL is https://careless-loser.github.io/Inzaghi/
  // basepath: '/Inzaghi', 
};

export default nextConfig;
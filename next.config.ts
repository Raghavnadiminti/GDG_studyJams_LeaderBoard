import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   reactStrictMode: false, // disables strict mode double rendering warnings
  eslint: {
    ignoreDuringBuilds: true, // disable eslint warnings during build
  },
  typescript: {
    ignoreBuildErrors: true, // disable TS type check warnings during build
  },
};

export default nextConfig;

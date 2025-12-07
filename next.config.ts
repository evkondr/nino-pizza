import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://media.dodostatic.net/**'), new URL('https://cdn.dodostatic.net/**')],
  }
};

export default nextConfig;

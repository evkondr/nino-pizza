import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL('https://media.dodostatic.net/**'),
      new URL('https://cdn.dodostatic.net/**'),
      {
        protocol: 'https',
        hostname: 'cdn.inappstory.ru',
        port: '',
        pathname: '/**',
      },
    ],
  }
};

export default nextConfig;

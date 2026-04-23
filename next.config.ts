import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gcdnb.pbrd.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

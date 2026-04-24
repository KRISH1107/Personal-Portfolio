import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gcdnb.pbrd.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lastfm.freetls.fastly.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

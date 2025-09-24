import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "payload-cms-blog-website-rtpq.vercel.app", // your Payload host
        pathname: "/**", // Payload usually serves uploads under /media
      },
    ],
  },
};

export default nextConfig;

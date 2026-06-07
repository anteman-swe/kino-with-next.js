import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    prependData: `@use "@/styles/variables.scss" as *; @use "@/styles/mixins.scss" as *;`,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "*/**",
      },
    ],
  },

  turbopack: {
    root: path.resolve(__dirname),
    // root: '/',
  },
  ...(process.env.NEXT_STANDALONE === "true" && { output: "standalone" }),
};

export default nextConfig;

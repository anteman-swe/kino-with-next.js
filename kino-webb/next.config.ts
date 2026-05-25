import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    prependData: `@use "@/styles/variables.scss" as *; @use "@/styles/mixins.scss" as *;`,
  },
  images: {
    domains: ["m.media-amazon.com"],
  },

  turbopack: {
    root: path.resolve(__dirname),
    // root: '/',
  }
};

export default nextConfig;

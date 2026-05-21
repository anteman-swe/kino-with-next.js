import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    prependData: `@use "@/styles/variables.scss" as *; @use "@/styles/mixins.scss" as *;`,
  },
  turbopack: {
    root: path.resolve(__dirname),
    // root: '/',
  }
};

export default nextConfig;

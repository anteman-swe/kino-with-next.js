import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    prependData: `@use "@/styles/variables.scss" as *; @use "@/styles/mixins.scss" as *;`,
  }
};

export default nextConfig;

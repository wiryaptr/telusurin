import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // About dan Metodologi digabung menjadi satu halaman (/metodologi)
      { source: "/about", destination: "/metodologi", permanent: false },
    ];
  },
  /* config options here */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

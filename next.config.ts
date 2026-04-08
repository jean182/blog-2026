import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Enable View Transitions API for smooth page transitions
  experimental: {
    viewTransition: true,
  },
  // Redirect old /posts/ URLs to new root URLs
  async redirects() {
    return [
      {
        source: "/posts/:slug",
        destination: "/:slug",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);

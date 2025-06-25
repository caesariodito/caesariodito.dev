import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: [],
  },
  distDir: ".next",
  // Configure pageExtensions to include md and mdx
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],

  // Optimize for Vercel deployment
  poweredByHeader: false,

  // Ensure API routes are properly handled
  output: "standalone",

  // Configure source directories for Next.js
  transpilePackages: ["next-mdx-remote"],

  // Ensure proper handling of both src/ and root directories
  webpack: (config) => {
    // Add support for importing markdown files
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        {
          loader: "@mdx-js/loader",
          /** @type {import('@mdx-js/loader').Options} */
          options: {
            providerImportSource: "@mdx-js/react",
          },
        },
      ],
    });

    return config;
  },

  // Disable static generation for problematic pages
  experimental: {
    // Allow dynamic rendering for these paths
    unstable_allowDynamic: ["/projects/[slug]/**", "/journals/[slug]/**"],
  },
};

export default withMDX(nextConfig);

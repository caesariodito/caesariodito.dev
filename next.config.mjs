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
      { hostname: "cdn.discordapp.com" },
      { hostname: "flowbite.s3.amazonaws.com" },
      { hostname: "static.wikia.nocookie.net" },
      { hostname: "**.wikia.nocookie.net" },
      { hostname: "**.wikipedia.org" },
      { hostname: "**.ytimg.com" },
      { hostname: "i.ytimg.com" },
      { hostname: "**.twimg.com" },
      { hostname: "**.googleusercontent.com" },
      { hostname: "**.ggpht.com" },
      { hostname: "**.capitalfm.com" },
      { hostname: "**.bbc.co.uk" },
      { hostname: "**.bbc.com" },
      { hostname: "**.nytimes.com" },
      { hostname: "**.cnn.com" },
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
  transpilePackages: [],

  // Ensure proper handling of both src/ and root directories
  webpack: (config) => {
    return config;
  },
};

export default withMDX(nextConfig);

/** @type {import('next').NextConfig} */
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require("remark-gfm")],
    rehypePlugins: [require("rehype-slug")],
  },
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      { hostname: 'cdn.discordapp.com' },
      { hostname: 'flowbite.s3.amazonaws.com' }
    ],
    domains: [],
  },
  distDir: ".next",
  // Configure pageExtensions to include md and mdx
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  
  // Ensure proper handling of both src/ and root directories
  webpack: (config) => {
    return config;
  },
};

// Merge MDX config with Next.js config
module.exports = withMDX(nextConfig);

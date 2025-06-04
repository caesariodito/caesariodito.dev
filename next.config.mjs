import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

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
export default withMDX(nextConfig); 
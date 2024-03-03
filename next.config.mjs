/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{hostname: 'cdn.discordapp.com'}, {hostname: 'flowbite.s3.amazonaws.com'}]
    }
};

export default nextConfig;

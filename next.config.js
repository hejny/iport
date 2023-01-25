/** @type {import('next').NextConfig} */

nextConfig = {
    experimental: {
        appDir: true /* <- TODO: !!! Same in rapid prototyping */,
    },
    reactStrictMode: true,
    images: {
        unoptimized: true /* <- TODO: Optimize images, all images should be in some modern format like webp/svg */,
    },

    async exportPathMap() {
        return {
            '/': { page: '/' },
        };
    },
};

module.exports = nextConfig;

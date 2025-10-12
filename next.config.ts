import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        unoptimized: true,
        domains: ['portfolioappimages.blob.core.windows.net']
    },
};

export default nextConfig;

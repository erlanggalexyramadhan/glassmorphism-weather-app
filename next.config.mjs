/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: "/glassmorphism-weather-app",
    assetPrefix: "/glassmorphism-weather-app/",
    images: {
        unoptimized: true,
    },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.iopener-training.com",
                port: "",
                pathname: "/uploads/**",

            },
        ],
        domains: ['iopener-training.com'],


    },
};

export default nextConfig;

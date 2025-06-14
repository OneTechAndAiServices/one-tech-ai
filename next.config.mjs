/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
 
  trailingSlash:true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
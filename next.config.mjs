/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Allows production builds to complete even if your project has ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allows production builds to complete even if your project has TypeScript errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

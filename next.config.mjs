/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Local assets only after migration; remote patterns kept empty for self-hosting.
  },
};

export default nextConfig;

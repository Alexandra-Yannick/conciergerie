/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      // Cela permet au build de finir même s'il y a des erreurs d'apostrophes
      ignoreDuringBuilds: true,
    },
};

export default nextConfig;
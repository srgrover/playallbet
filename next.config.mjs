/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'e01-marca.uecdn.es',
        port: '',
        pathname: '/assets/datos-deportivos/escudos/opta/**',
      },
      {
        protocol: 'https',
        hostname: 'e01-marca.uecdn.es',
        port: '',
        pathname: '/assets/datos-deportivos/banderas/**',
      },
      {
        protocol: 'https',
        hostname: 'images.fotmob.com',
        port: '',
        pathname: '/image_resources/**',
      },
    ],
  },
};

export default nextConfig;

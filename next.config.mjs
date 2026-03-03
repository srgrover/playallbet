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
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**',
      },
    ],
  },
};

export default nextConfig;

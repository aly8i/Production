/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fbcdn.net',
        port: '',
        pathname: '/v/**',
      },
    ],
    domains:["firebasestorage.googleapis.com","hfc-resto.appspot.com","icon-library.com","images.app.goo.gl","fbcdn.net","https://scontent.fbey4-2.fna.fbcdn.net","lh3.googleusercontent.com","unsplash.com"]
  },
}

module.exports = nextConfig

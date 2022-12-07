/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images:{
    domains:["firebasestorage.googleapis.com","hfc-resto.appspot.com","icon-library.com","images.app.goo.gl","lh3.googleusercontent.com","unsplash.com"]
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images:{
    domains:["firebasestorage.googleapis.com","hfc-resto.appspot.com","icon-library.com","images.app.goo.gl","scontent.fbey4-2.fna.fbcdn.net","https://scontent.fbey4-2.fna.fbcdn.net","lh3.googleusercontent.com","unsplash.com"]
  },
}

module.exports = nextConfig

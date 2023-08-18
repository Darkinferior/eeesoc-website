/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "miro.medium.com",
      "images.weserv.nl",
      "res.cloudinary.com",
      "www.bitmesra.ac.in",
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */

const getHost = () => {
  if (process.env.VERCEL_ENV === 'production') {
    return 'https://bmwarehouse.vercel.app';
  }
  return process.env.VERCEL ? `https://bmwarehouse.vercel.app` : 'http://localhost:3000';
};

const nextConfig = {
  env: {
    BASE_URL: getHost()
  },
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com'
      }
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    return config;
  },
  images: {
    domains: ['res.cloudinary.com', 'down-id.img.susercontent.com', 'images.tokopedia.net']
  }
};

module.exports = nextConfig;

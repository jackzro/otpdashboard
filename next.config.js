/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://otp.sms123.online:8083/api/voiceotp", // your HTTP backend
      },
    ];
  },
};

module.exports = nextConfig;

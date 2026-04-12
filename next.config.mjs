/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.1.94', '192.168.1.101', '192.168.1.100', '192.168.1.116', 'localhost:3000'],
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
    images: {
remotePatterns: [
{
protocol: 'https',
hostname: 'vsyakrovlya.ru',
},
{
protocol: 'https',
hostname: 'i.pravatar.cc',
},
{
protocol: 'https',
hostname: 'images.unsplash.com',
},
{
protocol: 'https',
hostname: 'slelguoygbfzlpylpxfs.supabase.co',
}
],
},
};

export default nextConfig;

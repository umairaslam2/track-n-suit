/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com',"img.freepik.com","images.pexels.com","oxfit.com.pk"],
      },
      eslint: {
        ignoreDuringBuilds: true,
      },
};

export default nextConfig;

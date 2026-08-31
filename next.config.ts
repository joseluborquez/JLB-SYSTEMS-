import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Fotos de reseñas subidas por clientes (bucket testimonial-photos).
        protocol: "https",
        hostname: "ztoflhpcluasxwozrupm.supabase.co",
        pathname: "/storage/v1/object/public/testimonial-photos/**",
      },
    ],
  },
};

export default nextConfig;

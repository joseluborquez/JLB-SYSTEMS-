import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Rutas del sitio anterior: se conservan los links ya compartidos.
  async redirects() {
    return [
      { source: "/agentes-ia", destination: "/soluciones/agentes-whatsapp", permanent: true },
      { source: "/proyecto/:id", destination: "/casos/:id", permanent: true },
      // Páginas que pasaron a ser secciones de la portada. Temporales (307):
      // la estructura todavía puede cambiar.
      { source: "/auditoria", destination: "/#como-funciona", permanent: false },
      { source: "/metodo", destination: "/#como-funciona", permanent: false },
      { source: "/soluciones", destination: "/#soluciones", permanent: false },
      { source: "/soluciones/meta-ads", destination: "/#soluciones", permanent: false },
      { source: "/soluciones/integraciones-ia-equipo", destination: "/#soluciones", permanent: false },
      { source: "/soluciones/plataformas-a-medida", destination: "/#soluciones", permanent: false },
      { source: "/precios", destination: "/#soluciones", permanent: false },
      { source: "/recursos", destination: "/", permanent: false },
    ];
  },
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

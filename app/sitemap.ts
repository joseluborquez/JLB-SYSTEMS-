import type { MetadataRoute } from "next";
import { proyectos } from "@/lib/proyectos";

const BASE_URL = "https://www.jlbsystems.cl";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, priority: 1 },
    { url: `${BASE_URL}/soluciones/agentes-whatsapp`, priority: 0.8 },
    { url: `${BASE_URL}/casos`, priority: 0.8 },
    { url: `${BASE_URL}/resena`, priority: 0.3 },
    ...proyectos.map((p) => ({
      url: `${BASE_URL}/casos/${p.id}`,
      priority: 0.7,
    })),
  ];
}

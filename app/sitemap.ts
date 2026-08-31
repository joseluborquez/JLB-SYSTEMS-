import type { MetadataRoute } from "next";
import { proyectos } from "@/lib/proyectos";

const BASE_URL = "https://nocodejose.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, priority: 1 },
    { url: `${BASE_URL}/agentes-ia`, priority: 0.9 },
    { url: `${BASE_URL}/resena`, priority: 0.3 },
    ...proyectos.map((p) => ({
      url: `${BASE_URL}/proyecto/${p.id}`,
      priority: 0.7,
    })),
  ];
}

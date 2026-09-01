import { supabase } from "./supabase";

export interface Testimonio {
  id: string;
  created_at: string;
  name: string;
  role: string | null;
  quote: string;
  rating: number | null;
  photo_url: string | null;
}

/** Fotos ya alojadas en el sitio, para reseñas aprobadas sin foto propia. */
export const fotosLocales: Record<string, string> = {};

/** Server-side: se llama directo desde un Server Component, sin
 * react-query ni fetch en el cliente — mejora sobre la SPA original.
 * Sin respaldo hardcodeado: si no hay reseñas aprobadas todavía, devuelve
 * un array vacío y la sección simplemente no se muestra — mejor eso que
 * rellenar con nombres inventados. */
export async function getTestimoniosAprobados(): Promise<Testimonio[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("id, created_at, name, role, quote, rating, photo_url")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getTestimoniosAprobados] fetch failed:", error);
    return [];
  }
  return data ?? [];
}

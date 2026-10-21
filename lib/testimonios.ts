import { supabase } from "./supabase";

export interface Testimonio {
  id: string;
  created_at: string;
  name: string;
  role: string | null;
  quote: string;
  rating: number | null;
  photo_url: string | null;
  video_url: string | null;
}

/** Fotos ya alojadas en el sitio, para reseñas aprobadas sin foto propia. */
export const fotosLocales: Record<string, string> = {};

/** Frase corta con el resultado, que se muestra arriba de la cita completa.
 * Va por nombre porque la tabla de reseñas no tiene ese campo; sale solo de
 * lo que dice cada reseña. Sin entrada, la tarjeta muestra solo la cita. */
export const destacados: Record<string, string> = {
  "Fernando Tabie": "Del catálogo en PDF a una vitrina digital",
  "Oscar Saldivia": "Hace el trabajo de una persona",
  "Raul Martinez": "De 5–10 minutos a segundos por cotización",
  Hugo: "De 35 horas a 4 por ciclo de despachos",
};

/** Proyecto (id en lib/proyectos.ts) al que corresponde cada reseña, para el
 * botón "Ver proyecto". Sin entrada, la tarjeta no lleva botón. */
export const proyectoDeResena: Record<string, string> = {
  "Fernando Tabie": "sublinovena",
  "Oscar Saldivia": "teayudo",
  "Raul Martinez": "raulspeed",
  Hugo: "dilogic",
};

/** Server-side: se llama directo desde un Server Component, sin
 * react-query ni fetch en el cliente — mejora sobre la SPA original.
 * Sin respaldo hardcodeado: si no hay reseñas aprobadas todavía, devuelve
 * un array vacío y la sección simplemente no se muestra — mejor eso que
 * rellenar con nombres inventados. */
export async function getTestimoniosAprobados(): Promise<Testimonio[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("id, created_at, name, role, quote, rating, photo_url, video_url")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getTestimoniosAprobados] fetch failed:", error);
    return [];
  }
  return data ?? [];
}

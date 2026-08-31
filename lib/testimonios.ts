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

/** Fotos ya alojadas en el sitio, para reseñas sembradas sin foto propia. */
export const fotosLocales: Record<string, string> = {
  "Juan Pablo Vargas": "/testimonios/juan-pablo-vargas.png",
  "Juan Núñez": "/testimonios/juan-nunez.png",
};

/** Se muestran si la base todavía no tiene reseñas aprobadas. */
const testimoniosDeReserva: Testimonio[] = [
  {
    id: "seed-juan-pablo-vargas",
    created_at: "",
    name: "Juan Pablo Vargas",
    role: "Fundador de Uruz",
    quote: "Gracias a José, ahora gestiono de forma más sencilla mi gimnasio.",
    rating: 5,
    photo_url: null,
  },
  {
    id: "seed-juan-nunez",
    created_at: "",
    name: "Juan Núñez",
    role: "Cofundador de HumanIA",
    quote:
      "Lancé mi idea en 4 semanas y pude validarla en el mercado, me explotó la cabeza.",
    rating: 5,
    photo_url: null,
  },
];

/** Server-side: se llama directo desde un Server Component, sin
 * react-query ni fetch en el cliente — mejora sobre la SPA original. */
export async function getTestimoniosAprobados(): Promise<Testimonio[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("id, created_at, name, role, quote, rating, photo_url")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error || !data?.length) return testimoniosDeReserva;
  return data;
}

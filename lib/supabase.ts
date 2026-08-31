// Cliente de Supabase — mismo proyecto que usaba el portfolio (Vite),
// reusado tal cual: misma tabla `testimonials`, mismo bucket
// `testimonial-photos`, mismo RLS. No se crea un proyecto nuevo.
//
// Seguro de importar desde Server o Client Components: sin auth/sesión
// (no hay login en el sitio, solo lectura pública + inserciones anónimas
// vía RLS), así que no depende de `localStorage`.
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabase-types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}

/** Las claves nuevo-estilo de Supabase son strings opacos, no JWT bearer —
 * sin este shim el cliente manda un header Authorization inválido. */
function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );

    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }

    if (isNewSupabaseApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) {
      headers.delete("Authorization");
    }

    headers.set("apikey", supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  global: {
    fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY),
  },
  auth: {
    persistSession: false,
  },
});

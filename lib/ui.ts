// Clases compartidas de botones y contenedores. Están acá para que cambiar
// el estilo de un botón sea una sola edición en vez de nueve.

// accent / accent-fg se invierten con el tema: blanco sobre negro en oscuro,
// negro sobre blanco en claro. Ver app/globals.css.
//
// Los CTA llevan la clase cta-estrella: components/EfectoCtas.tsx les agrega
// una estrella de luz que recorre el borde (efecto StarBorder).
//
// Los CTA van en pill (rounded-full) siguiendo las referencias de Vercel; las
// tarjetas y los inputs se quedan en radios chicos para no perder la precisión.
export const btnPrimary =
  "cta-estrella cta-estrella-relleno inline-flex items-center justify-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition-opacity duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40";

export const btnSecondary =
  "cta-estrella inline-flex items-center justify-center gap-1.5 rounded-full border border-border-hi px-5 py-2.5 text-sm font-medium text-fg transition-colors duration-150 hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40";

// Ancho máximo y aire lateral, idéntico en todas las secciones.
export const container = "mx-auto w-full max-w-5xl px-7 sm:px-12 lg:px-16";

// Separador superior + respiración vertical de cada sección.
export const section = "border-t border-border py-20 sm:py-24";

// Titular de sección: grande, tracking apretado, peso medio.
export const heading =
  "text-[clamp(1.65rem,4vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.03em] text-fg";

// Tarjeta: radio algo mayor que el resto, como en las referencias.
export const card = "rounded-xl border border-border";

// Tarjeta con efecto MagicBento: el borde se ilumina cerca del cursor y una
// luz suave lo sigue dentro de la tarjeta. Ver .tarjeta-flujo en
// app/globals.css y components/EfectoTarjetas.tsx. Solo para tarjetas
// informativas; las de formularios, planes y calculadoras usan `card`.
export const cardFlujo = `${card} tarjeta-flujo`;

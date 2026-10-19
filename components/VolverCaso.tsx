"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { btnPrimary } from "@/lib/ui";

// Vuelve al lugar desde donde se abrió el caso. Se lee del navegador con
// useSyncExternalStore: el servidor siempre pinta "Volver a casos" y, ya
// hidratado, el cliente corrige sin desajuste (useSearchParams obligaba a un
// Suspense cuyo respaldo chocaba con el efecto de estrella de los botones).
// Origen del clic (?desde=...): cada uno vuelve a su lugar; sin parámetro,
// a la lista de casos.
const destinos: Record<string, { href: string; texto: string }> = {
  casos: { href: "/casos", texto: "Volver a casos" },
  resenas: { href: "/#resenas", texto: "Volver a las reseñas" },
  inicio: { href: "/#casos", texto: "Volver al inicio" },
};

const sinSuscripcion = () => () => {};
const desdeUrl = () => new URLSearchParams(window.location.search).get("desde");
const desdeServidor = () => null;

export default function VolverCaso() {
  const desde = useSyncExternalStore(sinSuscripcion, desdeUrl, desdeServidor);
  const destino = destinos[desde ?? ""] ?? destinos.casos;

  return (
    <Link href={destino.href} className={btnPrimary}>
      {destino.texto}
    </Link>
  );
}

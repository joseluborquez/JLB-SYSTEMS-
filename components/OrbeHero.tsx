"use client";

import Strands from "@/components/Strands";
import { useTemaClaro } from "@/lib/useTemaClaro";

/** Orbe animado del encabezado de la portada. Decorativo: sin texto ni foco. */
export default function OrbeHero() {
  const claro = useTemaClaro();

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[22rem] md:ml-auto md:mr-0 md:max-w-[26rem]"
    >
      <Strands lightMode={claro} energy={0.65} />
    </div>
  );
}

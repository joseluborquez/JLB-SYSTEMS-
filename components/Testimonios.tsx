"use client";

import { useMemo } from "react";
import Image from "next/image";
import StarRating from "@/components/StarRating";
import { useAutoScroll } from "@/lib/useAutoScroll";
import { fotosLocales, type Testimonio } from "@/lib/testimonios";
import { card, container, heading, section } from "@/lib/ui";

const iniciales = (nombre: string) =>
  nombre
    .split(" ")
    .map((palabra) => palabra[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function TarjetaTestimonio({ testimonio }: { testimonio: Testimonio }) {
  const foto = testimonio.photo_url ?? fotosLocales[testimonio.name];

  return (
    <div
      className={`${card} mx-3 flex w-[300px] shrink-0 flex-col bg-surface p-6 sm:mx-4 sm:w-[400px] sm:p-7`}
    >
      {testimonio.rating ? (
        <StarRating value={testimonio.rating} className="mb-4" />
      ) : null}
      <blockquote className="flex-1 text-base leading-relaxed text-fg">
        &ldquo;{testimonio.quote}&rdquo;
      </blockquote>
      <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        {foto ? (
          <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
            <Image src={foto} alt={testimonio.name} fill sizes="40px" className="object-cover" />
          </div>
        ) : (
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border-hi font-mono text-xs text-muted">
            {iniciales(testimonio.name)}
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-fg">{testimonio.name}</p>
          {testimonio.role ? (
            <p className="text-xs text-muted">{testimonio.role}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function Testimonios({ testimonios }: { testimonios: Testimonio[] }) {
  // Se repiten hasta tener al menos 4, para que el marquee alcance a cubrir
  // pantallas anchas con pocas reseñas. Con testimonios=[] el while nunca
  // avanzaría (push de nada no crece el array), por eso el guard de abajo.
  const set = useMemo(() => {
    if (testimonios.length === 0) return [];
    const copia = [...testimonios];
    while (copia.length < 4) copia.push(...testimonios);
    return copia;
  }, [testimonios]);

  const trackRef = useAutoScroll<HTMLDivElement>(24, [set]);

  if (testimonios.length === 0) return null;

  return (
    <section className={`${section} overflow-hidden`}>
      <div className={container}>
        <h2 className={`${heading} max-w-2xl`}>
          Lo que dicen mis clientes.{" "}
          <span className="text-muted">Historias reales.</span>
        </h2>
      </div>

      <div
        ref={trackRef}
        className="mt-12 flex items-stretch overflow-x-auto no-scrollbar [overscroll-behavior-x:contain] [scroll-behavior:auto]"
      >
        {["a", "b", "c"].map((copia) => (
          <div key={copia} className="flex items-stretch" aria-hidden={copia !== "a"}>
            {set.map((testimonio, i) => (
              <TarjetaTestimonio key={`${copia}-${testimonio.id}-${i}`} testimonio={testimonio} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

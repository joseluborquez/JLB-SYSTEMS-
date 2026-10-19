"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/StarRating";
import CintaCasos from "@/components/CintaCasos";
import { videoOptimizado, videoThumbnail } from "@/lib/cloudinary";
import {
  destacados,
  fotosLocales,
  proyectoDeResena,
  type Testimonio,
} from "@/lib/testimonios";
import { btnPrimary, cardFlujo, container, heading, section } from "@/lib/ui";

const iniciales = (nombre: string) =>
  nombre
    .split(" ")
    .map((palabra) => palabra[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function TarjetaTestimonio({
  testimonio,
  className = "mx-3 w-[300px] shrink-0 sm:mx-4 sm:w-[400px]",
  duplicada = false,
}: {
  testimonio: Testimonio;
  className?: string;
  /** Segunda copia de la cinta: se ve y se puede pulsar, pero no entra en el orden del teclado. */
  duplicada?: boolean;
}) {
  const foto = testimonio.photo_url ?? fotosLocales[testimonio.name];
  const destacado = destacados[testimonio.name];
  const proyecto = proyectoDeResena[testimonio.name];

  return (
    <div
      className={`${cardFlujo} flex flex-col bg-surface p-6 sm:p-7 ${className}`}
    >
      {testimonio.rating ? (
        <StarRating value={testimonio.rating} className="mb-4" />
      ) : null}
      {testimonio.video_url ? (
        <video
          src={videoOptimizado(testimonio.video_url)}
          poster={videoThumbnail(testimonio.video_url)}
          controls
          preload="none"
          className="mb-4 aspect-video w-full rounded-lg border border-border object-cover"
        />
      ) : null}
      {destacado ? (
        <p className="mb-3 text-base font-medium leading-snug tracking-[-0.01em] text-fg">
          {destacado}
        </p>
      ) : null}
      <blockquote className="flex-1 text-sm leading-relaxed text-fg">
        &ldquo;{testimonio.quote}&rdquo;
      </blockquote>
      <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        {foto ? (
          <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
            <Image
              src={foto}
              alt={testimonio.name}
              fill
              sizes="40px"
              className="object-cover"
            />
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
      {proyecto ? (
        <Link
          href={`/casos/${proyecto}?desde=resenas`}
          tabIndex={duplicada ? -1 : undefined}
          className={`${btnPrimary} mt-5 self-center`}
        >
          Ver proyecto
        </Link>
      ) : null}
    </div>
  );
}

export default function Testimonios({
  testimonios,
  incrustado = false,
}: {
  testimonios: Testimonio[];
  /** Dentro de otra sección: sin borde ni separación propios. */
  incrustado?: boolean;
}) {
  // Se repiten hasta tener al menos 4, para que la cinta cubra pantallas
  // anchas con pocas reseñas. Con testimonios=[] el while nunca avanzaría,
  // por eso el guard de abajo.
  const set = useMemo(() => {
    if (testimonios.length === 0) return [];
    const copia = [...testimonios];
    while (copia.length < 4) copia.push(...testimonios);
    return copia;
  }, [testimonios]);

  if (testimonios.length === 0) return null;

  const titulo = "Lo que dicen quienes ya trabajaron con nosotros.";

  const cinta = (
    <div className={incrustado ? "mt-6" : "mt-12"}>
      <CintaCasos etiqueta="Reseñas">
        <div className="cinta-casos-pista items-stretch">
          {["a", "b"].map((copia) =>
            set.map((testimonio, i) => (
              <div
                key={`${copia}-${testimonio.id}-${i}`}
                className="flex"
                aria-hidden={copia === "b" ? true : undefined}
              >
                <TarjetaTestimonio
                  testimonio={testimonio}
                  duplicada={copia === "b"}
                  className="w-[300px] shrink-0 sm:w-[420px]"
                />
              </div>
            )),
          )}
        </div>
      </CintaCasos>
    </div>
  );

  if (incrustado) {
    return (
      <div id="resenas" className="mt-16 scroll-mt-24">
        <div className={container}>
          <h3 className="text-lg font-medium tracking-[-0.01em] text-fg">
            {titulo}
          </h3>
        </div>
        {cinta}
      </div>
    );
  }

  return (
    <section id="resenas" className={`${section} overflow-hidden scroll-mt-24`}>
      <div className={container}>
        <h2 className={`${heading} max-w-2xl`}>{titulo}</h2>
      </div>
      {cinta}
    </section>
  );
}

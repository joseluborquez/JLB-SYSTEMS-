import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProyecto, logosHerramientas, proyectos } from "@/lib/proyectos";
import { container } from "@/lib/ui";

export function generateStaticParams() {
  return proyectos.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const proyecto = getProyecto((await params).id);
  if (!proyecto) return {};
  return {
    title: proyecto.nombre,
    description: proyecto.descripcion,
  };
}

const secciones = (
  proyecto: NonNullable<ReturnType<typeof getProyecto>>,
) => [
  { titulo: "El desafío", ...proyecto.desafio },
  { titulo: "La solución", ...proyecto.solucion },
  { titulo: "Los resultados", ...proyecto.resultados },
];

export default async function ProyectoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const proyecto = getProyecto((await params).id);
  if (!proyecto) notFound();

  return (
    <>
      <section className="border-b border-border pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className={container}>
          <Link
            href="/#portafolio"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-dim transition-colors duration-150 hover:text-fg"
          >
            <span aria-hidden="true">←</span> Volver al portafolio
          </Link>

          <h1 className="mt-6 text-[clamp(1.8rem,5vw,3rem)] font-medium leading-[1.1] tracking-[-0.03em] text-fg">
            {proyecto.nombre}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {proyecto.descripcion}
          </p>

          <div className="relative mt-10 aspect-video overflow-hidden rounded-xl border border-border">
            <Image
              src={proyecto.imagen}
              alt={proyecto.nombre}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border py-14">
        <div className={container}>
          <p className="text-center font-mono text-xs tracking-[0.02em] text-dim">
            Herramientas utilizadas
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {proyecto.tags.map((tag) => (
              <div key={tag} className="flex flex-col items-center gap-2">
                <div className="relative flex size-16 items-center justify-center rounded-lg border border-border bg-surface p-3">
                  <Image
                    src={logosHerramientas[tag] ?? ""}
                    alt={tag}
                    fill
                    sizes="64px"
                    className="object-contain p-3"
                  />
                </div>
                <span className="font-mono text-xs text-muted">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {secciones(proyecto).map((s, i) =>
        s.imagen ? (
          <section key={s.titulo} className="border-b border-border py-16 last:border-b-0 sm:py-20">
            <div className={container}>
              <div
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-14 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <h2 className="text-xl font-medium tracking-[-0.01em] text-fg sm:text-2xl">
                    {s.titulo}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted">
                    {s.descripcion}
                  </p>
                </div>
                <div className="relative aspect-video overflow-hidden rounded-xl border border-border">
                  <Image
                    src={s.imagen}
                    alt={s.titulo}
                    fill
                    sizes="(min-width: 1024px) 512px, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        ) : (
          // Sin imagen propia para esta sección (p. ej. Dilogic, donde solo
          // hay una foto real del proyecto): texto solo, sin repetir la
          // imagen principal ni dejar una columna vacía.
          <section key={s.titulo} className="border-b border-border py-16 last:border-b-0 sm:py-20">
            <div className={container}>
              <div className="max-w-2xl">
                <h2 className="text-xl font-medium tracking-[-0.01em] text-fg sm:text-2xl">
                  {s.titulo}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {s.descripcion}
                </p>
              </div>
            </div>
          </section>
        ),
      )}
    </>
  );
}

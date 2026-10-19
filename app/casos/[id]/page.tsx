import type { Metadata } from "next";
import Image from "next/image";
import VolverCaso from "@/components/VolverCaso";
import { notFound } from "next/navigation";
import CierreAgenda from "@/components/CierreAgenda";
import { nombreModulo } from "@/lib/modulos";
import { getProyecto, logosHerramientas, proyectos, tagsMonocromo } from "@/lib/proyectos";
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
  { titulo: "Situación inicial", ...proyecto.desafio },
  { titulo: "Qué se implementó", ...proyecto.solucion },
  {
    // "medido" solo cuando hay números reales contra el punto de partida.
    titulo: proyecto.medido ? "Resultado medido" : "Resultado",
    ...proyecto.resultados,
  },
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
          <VolverCaso />

          <p className="mt-6 font-mono text-xs text-dim">
            {nombreModulo[proyecto.modulo]}
          </p>
          <h1 className="mt-2 text-[clamp(1.8rem,5vw,3rem)] font-medium leading-[1.1] tracking-[-0.03em] text-fg">
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
            Stack utilizado
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
                    className={`object-contain p-3 ${tagsMonocromo.has(tag) ? "jlb-logo-stack" : ""}`}
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
    
      {proyecto.medido ? (
        <section className="border-t border-border py-16 sm:py-20">
          <div className={container}>
            <h2 className="text-xl font-medium tracking-[-0.01em] text-fg sm:text-2xl">
              Métricas
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {proyecto.medido.map((m) => (
                <li key={m} className="text-sm leading-relaxed text-muted">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {proyecto.autonomia ? (
        <section className="border-t border-border py-16 sm:py-20">
          <div className={container}>
            <h2 className="text-xl font-medium tracking-[-0.01em] text-fg sm:text-2xl">
              Autonomía
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              {proyecto.autonomia}
            </p>
          </div>
        </section>
      ) : null}

      {proyecto.testimonio ? (
        <section className="border-t border-border py-16 sm:py-20">
          <div className={container}>
            <blockquote className="max-w-2xl text-lg leading-relaxed text-fg">
              &ldquo;{proyecto.testimonio.texto}&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-muted">
              {proyecto.testimonio.autor}
            </p>
          </div>
        </section>
      ) : null}

      <CierreAgenda />
    </>
  );
}

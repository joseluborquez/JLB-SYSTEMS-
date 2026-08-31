import Image from "next/image";
import Link from "next/link";
import Eyebrow, { IconoFlujo } from "@/components/Eyebrow";
import { proyectos } from "@/lib/proyectos";
import { card, container, heading, section } from "@/lib/ui";

export default function PortafolioGrid() {
  return (
    <section id="portafolio" className={section}>
      <div className={container}>
        <Eyebrow icono={IconoFlujo}>Portafolio</Eyebrow>

        <h2 className={`${heading} mt-4 max-w-3xl`}>
          Software real, funcionando en producción.
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {proyectos.map((proyecto) => (
            <Link
              key={proyecto.id}
              href={`/proyecto/${proyecto.id}`}
              className={`${card} group flex flex-col overflow-hidden bg-surface transition-colors duration-150 hover:border-border-hi`}
            >
              <div className="relative aspect-video overflow-hidden border-b border-border">
                <Image
                  src={proyecto.imagen}
                  alt={proyecto.nombre}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-base font-medium tracking-[-0.01em] text-fg">
                  {proyecto.nombre}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {proyecto.descripcion}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {proyecto.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border-hi px-3 py-1 font-mono text-xs text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

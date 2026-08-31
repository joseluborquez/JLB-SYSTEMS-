import Image from "next/image";
import { container, heading, section } from "@/lib/ui";

const herramientas = [
  { nombre: "Claude Code", logo: "/logos/herramientas/claude-logo.svg" },
  { nombre: "Supabase", logo: "/logos/herramientas/supabase-logo.png" },
  { nombre: "Vercel", logo: "/logos/herramientas/vercel-logo.svg" },
  { nombre: "Kapso", logo: "/logos/herramientas/kapso-logo.png" },
];

export default function Herramientas() {
  // Tres copias idénticas: la animación CSS desplaza -33.333%, un tercio
  // exacto del ancho total, y vuelve a empezar sin salto visible.
  const copias = ["a", "b", "c"];

  return (
    <section className={`${section} overflow-hidden`}>
      <div className={container}>
        <h2 className={`${heading} max-w-2xl`}>
          El stack detrás del software.{" "}
          <span className="text-muted">Infraestructura propia del cliente.</span>
        </h2>
      </div>

      <div className="relative mt-12">
        <div className="flex animate-scroll-infinite">
          {copias.map((copia) => (
            <div key={copia} className="flex shrink-0" aria-hidden={copia !== "a"}>
              {herramientas.map((h) => (
                <div
                  key={`${copia}-${h.nombre}`}
                  className="mx-6 flex min-w-[110px] flex-col items-center gap-2 sm:mx-10 sm:min-w-[140px]"
                >
                  <div className="relative h-10 w-full sm:h-14">
                    <Image src={h.logo} alt={h.nombre} fill sizes="140px" className="object-contain" />
                  </div>
                  <span className="font-mono text-xs whitespace-nowrap text-muted">
                    {h.nombre}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

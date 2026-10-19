import Link from "next/link";
import Eyebrow, { IconoCapas } from "@/components/Eyebrow";
import { modulos } from "@/lib/modulos";
import { btnPrimary, cardFlujo, container, heading, section } from "@/lib/ui";

export default function SolucionesInicio() {
  return (
    <section id="soluciones" className={section}>
      <div className={container}>
        <Eyebrow icono={IconoCapas}>Soluciones</Eyebrow>

        <h2 className={`${heading} mt-4 max-w-3xl`}>
          Lo que armamos,{" "}
          <span className="text-muted">según lo que necesites.</span>
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          Los módulos salen de una auditoría o de una necesidad que ya tienes
          clara, y cada uno incluye la capacitación para que tu equipo lo
          domine.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {modulos.map((modulo, i) => (
            <div
              key={modulo.id}
              className={`${cardFlujo} flex flex-col bg-surface p-6 ${
                // 5 módulos: 3 arriba y 2 abajo, sin huecos.
                i < 3 ? "lg:col-span-2" : "lg:col-span-3"
              } ${i === modulos.length - 1 ? "md:col-span-2" : ""}`}
            >
              <p className="text-sm leading-snug text-dim">
                <span className="font-mono text-xs">Si te pasa</span>{" "}
                <span className="text-muted">&ldquo;{modulo.dolor}&rdquo;</span>
              </p>
              <h3 className="mt-4 text-base font-medium tracking-[-0.01em] text-fg">
                {modulo.nombre}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {modulo.resumen}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-dim">
                {modulo.cuandoConviene}
              </p>
              {modulo.href ? (
                <div className="mt-5 border-t border-border pt-5">
                  <Link href={modulo.href} className={btnPrimary}>
                    Ver demo y planes
                  </Link>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

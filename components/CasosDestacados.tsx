import Image from "next/image";
import Link from "next/link";
import CintaCasos from "@/components/CintaCasos";
import Eyebrow, { IconoFlujo } from "@/components/Eyebrow";
import { proyectos } from "@/lib/proyectos";
import { cardFlujo, container, heading, section } from "@/lib/ui";

export default function CasosDestacados({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <section id="casos" className={section}>
      <div className={container}>
        <Eyebrow icono={IconoFlujo}>Casos</Eyebrow>

        <h2 className={`${heading} mt-4 max-w-3xl`}>
          Proyectos reales,{" "}
          <span className="text-muted">funcionando en producción.</span>
        </h2>
      </div>

      {/* Cinta horizontal en bucle (dos copias idénticas); también se desplaza a mano. */}
      <div className="mt-12">
        <CintaCasos>
          <div className="cinta-casos-pista">
            {[0, 1].map((copia) =>
              proyectos.map((caso) => (
                <Link
                  key={`${copia}-${caso.id}`}
                  href={`/casos/${caso.id}?desde=inicio`}
                  aria-hidden={copia === 1 ? true : undefined}
                  tabIndex={copia === 1 ? -1 : undefined}
                  className={`${cardFlujo} group flex w-72 shrink-0 flex-col overflow-hidden bg-surface transition-colors duration-150 hover:border-border-hi sm:w-80`}
                >
                  <div className="relative aspect-video overflow-hidden border-b border-border">
                    <Image
                      src={caso.imagen}
                      alt={copia === 0 ? caso.nombre : ""}
                      fill
                      sizes="320px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-base font-medium tracking-[-0.01em] text-fg">
                      {caso.nombre}
                    </h3>
                    <p className="mt-2 line-clamp-4 flex-1 text-sm leading-relaxed text-muted">
                      {caso.resultados.descripcion}
                    </p>
                  </div>
                </Link>
              )),
            )}
          </div>
        </CintaCasos>
      </div>

      {children}
    </section>
  );
}

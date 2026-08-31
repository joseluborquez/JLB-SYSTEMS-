import Link from "next/link";
import Eyebrow, { IconoCapas } from "@/components/Eyebrow";
import { btnPrimary, btnSecondary, card, container, heading, section } from "@/lib/ui";

export default function Servicios() {
  return (
    <section className={section}>
      <div className={container}>
        <Eyebrow icono={IconoCapas}>Servicios</Eyebrow>

        <h2 className={`${heading} mt-4 max-w-3xl`}>
          Dos formas de resolver tu problema.{" "}
          <span className="text-muted">Elige la que te haga sentido.</span>
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <div className={`${card} bg-surface flex flex-col p-6 sm:p-7`}>
            <h3 className="text-lg font-medium tracking-[-0.01em] text-fg">
              Software a medida
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              Web apps internas, automatizaciones y CRMs construidos para cómo
              trabaja tu negocio, no al revés. Abajo tienes proyectos reales
              funcionando en producción.
            </p>
            <a href="#portafolio" className={`${btnSecondary} mt-6`}>
              Ver portafolio
            </a>
          </div>

          <div className={`${card} bg-surface flex flex-col p-6 sm:p-7`}>
            <h3 className="text-lg font-medium tracking-[-0.01em] text-fg">
              Agentes de WhatsApp con IA
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              Un agente que responde en segundos, resuelve dudas, agenda y
              hace seguimiento — con precios fijos y una demo en vivo que
              puedes probar ahora mismo.
            </p>
            <Link href="/agentes-ia" className={`${btnPrimary} mt-6`}>
              Ver agentes IA <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

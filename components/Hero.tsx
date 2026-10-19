import Reticula from "@/components/Reticula";
import { btnPrimary, container } from "@/lib/ui";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      <Reticula />

      <div className={`${container} relative`}>
        {/* Pill de anuncio, como la barra superior de las referencias. */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface py-1 pr-3.5 pl-1">
          <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[10px] tracking-wide text-accent-fg">
            Módulo
          </span>
          <span className="text-xs text-muted">
            Soluciones · sobre WhatsApp Business API
          </span>
        </div>

        <h1 className="mt-7 max-w-3xl text-[clamp(2rem,6.5vw,4rem)] font-medium leading-[1.06] tracking-[-0.04em] text-fg">
          Tus clientes escriben a cualquier hora.
          <br />
          <span className="text-muted">
            Tu negocio responde a cualquier hora.
          </span>
        </h1>

        <p className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Agentes de WhatsApp construidos a medida que responden en segundos,
          resuelven dudas, agendan horas y hacen seguimiento. Sin que tengas que
          estar ahí.
        </p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-dim">
          Es uno de los módulos que puede salir de tu auditoría. Incluye la
          capacitación para que tú y tu equipo lo operen y lo modifiquen.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          {/* Apunta al demo, no a WhatsApp: es el mejor argumento de venta y
              evita que "el agente" signifique dos cosas en la misma página. */}
          <a href="#demo" className={btnPrimary}>
            Pruébalo ahora
          </a>
          <a href="#planes" className={btnPrimary}>
            Ver planes
          </a>
        </div>
      </div>
    </section>
  );
}

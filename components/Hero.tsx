import Reticula from "@/components/Reticula";
import { btnPrimary, btnSecondary, container } from "@/lib/ui";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <Reticula />

      <div className={`${container} relative`}>
        {/* Pill de anuncio, como la barra superior de las referencias. */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface py-1 pr-3.5 pl-1">
          <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[10px] tracking-wide text-accent-fg">
            Oficial
          </span>
          <span className="text-xs text-muted">
            Construido sobre WhatsApp Business API
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

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          {/* Apunta al demo, no a WhatsApp: es el mejor argumento de venta y
              evita que "el agente" signifique dos cosas en la misma página. */}
          <a href="#demo" className={btnPrimary}>
            Pruébalo ahora <span aria-hidden="true">→</span>
          </a>
          <a href="#planes" className={btnSecondary}>
            Ver planes
          </a>
        </div>
      </div>
    </section>
  );
}

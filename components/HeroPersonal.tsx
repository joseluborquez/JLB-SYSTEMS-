import Reticula from "@/components/Reticula";
import { config } from "@/lib/config";
import { btnPrimary, btnSecondary, container } from "@/lib/ui";

export default function HeroPersonal() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <Reticula />

      <div className={`${container} relative`}>
        <h1 className="max-w-3xl text-[clamp(2rem,6.5vw,4rem)] font-medium leading-[1.06] tracking-[-0.04em] text-fg">
          Software a medida
          <br />
          <span className="text-muted">en semanas, no meses.</span>
        </h1>

        <p className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Web apps internas, automatizaciones y agentes de IA para WhatsApp,
          sin la demora ni el costo de una agencia de desarrollo tradicional.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="#portafolio" className={btnPrimary}>
            Ver portafolio <span aria-hidden="true">→</span>
          </a>
          <a
            href={config.calendario}
            target="_blank"
            rel="noopener noreferrer"
            className={btnSecondary}
          >
            Agenda una reunión gratuita
          </a>
        </div>
      </div>
    </section>
  );
}

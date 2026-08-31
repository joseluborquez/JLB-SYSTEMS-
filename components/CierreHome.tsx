import Reticula from "@/components/Reticula";
import { config } from "@/lib/config";
import { btnPrimary, container } from "@/lib/ui";

export default function CierreHome() {
  return (
    <section className="relative overflow-hidden border-t border-border py-20 sm:py-28">
      <Reticula />

      <div className={`${container} relative text-center`}>
        <h2 className="mx-auto max-w-2xl text-[clamp(1.65rem,4vw,2.6rem)] font-medium leading-[1.1] tracking-[-0.03em] text-fg">
          ¿Listo para resolver tu problema con software a medida?
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted">
          Agenda una reunión gratuita de 30 minutos y descubre cómo puedo
          ayudarte.
        </p>

        <div className="mt-9 flex justify-center">
          <a
            href={config.calendario}
            target="_blank"
            rel="noopener noreferrer"
            className={btnPrimary}
          >
            Agenda tu reunión gratuita <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

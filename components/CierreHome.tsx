import BotonAgenda from "@/components/BotonAgenda";
import Reticula from "@/components/Reticula";
import { config } from "@/lib/config";
import { btnSecondary, container, heading } from "@/lib/ui";

export default function CierreHome() {
  return (
    <section className="relative overflow-hidden border-t border-border py-20 sm:py-24">
      <Reticula />

      <div className={`${container} relative text-center`}>
        <h2 className={`${heading} mx-auto max-w-2xl`}>
          Conversemos 30 minutos y definimos por dónde empezar.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted">
          Si ya sabes qué necesitas, lo vemos. Si no, partimos con una
          auditoría de flujos.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <BotonAgenda />
          <a
            href={config.whatsappAuditoria}
            target="_blank"
            rel="noopener noreferrer"
            className={btnSecondary}
          >
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

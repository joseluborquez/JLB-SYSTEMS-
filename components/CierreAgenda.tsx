import BotonAgenda from "@/components/BotonAgenda";
import Reticula from "@/components/Reticula";
import { config } from "@/lib/config";
import { btnSecondary, container, heading } from "@/lib/ui";

type Props = { titulo?: string };

/** Cierre común: todas las páginas terminan en la misma conversación. */
export default function CierreAgenda({
  titulo = "Conversemos 30 minutos y definimos el alcance de tu auditoría.",
}: Props) {
  return (
    <section className="relative overflow-hidden border-t border-border py-20 sm:py-24">
      <Reticula />
      <div className={`${container} relative text-center`}>
        <h2 className={`${heading} mx-auto max-w-2xl`}>{titulo}</h2>
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

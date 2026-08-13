import Eyebrow, { IconoEtiqueta } from "@/components/Eyebrow";
import { config } from "@/lib/config";
import { card, container, heading, section } from "@/lib/ui";

// Los tres momentos de pago. La implementación es un precio cerrado; la
// mensualidad va con "desde" mientras se cotiza caso a caso.
const comoSePaga = [
  {
    monto: "$250 USD + IVA",
    titulo: "Implementación",
    detalle: "Pago único. Construyo el agente y lo dejo andando.",
  },
  {
    monto: "Sin mensualidad",
    titulo: "Primer mes de operación",
    detalle: "Mi fee parte el segundo mes. Solo corre el consumo.",
  },
  {
    monto: "Desde $150 USD + IVA",
    titulo: "Desde el segundo mes",
    detalle: "Según el volumen de tu negocio. Mes a mes, sin contrato.",
  },
];

const incluyeSiempre = [
  "Agente IA: responde dudas, entiende qué necesita y agenda",
  "Integraciones: CRM, base de datos, pagos, flujos multi-paso",
  "Panel de conversaciones + aviso cuando el agente te necesita",
  "Ajustes de textos, precios y horarios incluidos",
  "Número propio de WhatsApp para el negocio",
  "Soporte por WhatsApp",
];

const defineMensualidad = [
  "Cuántas conversaciones atiende al mes",
  "Cuántos mensajes de recordatorio y seguimiento envía",
  "Con cuántos de tus sistemas se conecta",
];

export default function Planes() {
  return (
    <section id="planes" className={section}>
      <div className={container}>
        <Eyebrow icono={IconoEtiqueta}>Precios</Eyebrow>

        <h2 className={`${heading} mt-4 max-w-3xl`}>
          Se paga en dos partes.{" "}
          <span className="text-muted">
            Una implementación única, y desde el segundo mes una mensualidad.
          </span>
        </h2>

        <div className="mt-10 grid divide-y divide-border border-y border-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {comoSePaga.map((momento, i) => (
            <div
              key={momento.titulo}
              className="py-6 md:px-6 md:py-7 md:first:pl-0 md:last:pr-0"
            >
              <span className="font-mono text-xs text-dim">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 font-mono text-lg tracking-[-0.02em] text-fg">
                {momento.monto}
              </p>
              <p className="mt-2 text-sm font-medium tracking-[-0.01em] text-fg">
                {momento.titulo}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {momento.detalle}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className={`${card} bg-surface p-6 sm:p-7`}>
            <p className="text-base font-medium tracking-[-0.01em] text-fg">
              Siempre incluido
            </p>
            <ul className="mt-6 space-y-3 border-t border-border pt-6">
              {incluyeSiempre.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm leading-relaxed text-muted"
                >
                  <span aria-hidden="true" className="text-dim">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${card} flex flex-col p-6 sm:p-7`}>
            <p className="text-base font-medium tracking-[-0.01em] text-fg">
              Qué define la mensualidad
            </p>
            <ul className="mt-6 space-y-3 border-t border-border pt-6">
              {defineMensualidad.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm leading-relaxed text-muted"
                >
                  <span aria-hidden="true" className="text-dim">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm leading-relaxed text-muted">
              Lo vemos en la llamada con los números reales de tu negocio, y te
              dejo el valor por escrito antes de que decidas.
            </p>

            {/* Visible, no en letra chica: el consumo va sobre la mensualidad
                y el comprador tiene que saberlo antes de la llamada. */}
            <p className="mt-6 flex-1 border-t border-border pt-6 text-sm leading-relaxed text-muted">
              Aparte de la mensualidad corre el{" "}
              <span className="text-fg">consumo del mes</span>: mensajes de
              Meta, transcripción de audios e integraciones. Va a costo, sin
              recargo mío, en la misma boleta.
            </p>

            <a
              href={config.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 text-sm font-medium text-fg underline decoration-border-hi underline-offset-4 transition-colors duration-150 hover:decoration-fg"
            >
              ¿Dudas con el precio? Escríbeme →
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-x-8 gap-y-3 border-t border-border pt-6 text-sm leading-relaxed text-dim sm:grid-cols-2">
          <p>
            Una conversación son 24 horas de chat con la misma persona, no un
            mensaje. Cuatrocientas conversaciones son cerca de cuatrocientos
            clientes distintos al mes.
          </p>
          <p>
            Una sola boleta mensual: tu mensualidad más el consumo del mes, a
            costo. No tienes que configurar pagos con Meta por tu cuenta.
          </p>
          <p>
            Valores en USD y sin IVA. La boleta se emite en pesos al tipo de
            cambio del día de facturación.
          </p>
          <p>
            Los precios pueden ajustarse si Meta modifica sus tarifas a partir
            de octubre 2026. Te aviso con un mes de anticipación.
          </p>
        </div>
      </div>
    </section>
  );
}

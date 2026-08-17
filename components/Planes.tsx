import Eyebrow, { IconoEtiqueta } from "@/components/Eyebrow";
import { config } from "@/lib/config";
import { btnPrimary, card, container, heading, section } from "@/lib/ui";

// Tres tramos, definidos por LO QUE HACE el agente y no por volumen.
//
// La razón es de costos: una conversación cuesta centavos de IA, mientras que
// las integraciones cuestan horas de desarrollo y los seguimientos cuestan
// mensajes de plantilla de Meta. Escalonar por conversaciones sería cobrar por
// lo más barato. Las conversaciones incluidas van como tope, no como driver.
//
// El precio de la conversación adicional es MÁS ALTO que el precio efectivo
// por conversación del propio tramo, y eso es deliberado. Si fuera más barato,
// a un cliente le convendría quedarse en el tramo chico y desbordar para
// siempre: 800 conversaciones en el tramo 1 saldrían $300 contra los $390 del
// tramo 2. Así, subir de tramo conviene justo cuando el cliente lo necesita.
//
// El extra BAJA al subir de tramo, premiando al que se compromete. La
// competencia cobra $0,40 plano en todos sus planes.
//
// Los valores salen del modelo en COSTOS.md del repo del CRM. Si cambias uno
// acá, cambia también el prompt del agente: cita los precios de memoria.
const tramos = [
  {
    nombre: "Responde y agenda",
    implementacion: "$450",
    mensualidad: "$220",
    para: "Negocios que pierden clientes por no contestar a tiempo.",
    conversaciones: "400 conversaciones al mes",
    extra: "$0,40 por conversación adicional",
    incluye: [
      "Responde dudas frecuentes con la información de tu negocio",
      "Entiende qué necesita cada persona y lo registra",
      "Agenda en tu calendario y manda la invitación",
      "Te avisa cuando alguien necesita hablar contigo",
    ],
    destacado: false,
  },
  {
    nombre: "Integrado",
    implementacion: "$590",
    mensualidad: "$390",
    para: "Negocios con sistemas propios donde el agente tiene que operar.",
    conversaciones: "1.200 conversaciones al mes",
    extra: "$0,30 por conversación adicional",
    incluye: [
      "Todo lo anterior",
      "Se conecta con hasta 3 de tus sistemas: CRM, ERP, agenda, pagos",
      "Consulta stock, precios o estado de pedidos en vivo",
      "Recordatorios automáticos antes de cada cita",
    ],
    destacado: true,
  },
  {
    nombre: "Ciclo completo",
    implementacion: "$1.400",
    mensualidad: "$890",
    para: "Operaciones de alto volumen que además quieren recuperar ventas.",
    conversaciones: "3.000 conversaciones al mes",
    extra: "$0,25 por conversación adicional",
    incluye: [
      "Todo lo anterior",
      "Integraciones a medida, sin límite de sistemas",
      "Seguimiento a quien no respondió y recuperación de ventas caídas",
      "Prioridad de soporte y ajustes",
    ],
    destacado: false,
  },
];

const incluyeSiempre = [
  "Agente construido a medida para tu negocio, no una plantilla",
  "Panel de conversaciones con el historial completo",
  "Ajustes de textos, precios y horarios incluidos",
  "Número propio de WhatsApp para el negocio",
  "Soporte por WhatsApp, directo conmigo",
  "Mes a mes, sin contrato de permanencia",
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

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
          El primer mes de operación no tiene mensualidad. Empieza a correr
          desde el segundo, cuando ya viste al agente trabajando con tus
          clientes de verdad.
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {tramos.map((tramo) => (
            <div
              key={tramo.nombre}
              className={`${card} flex flex-col p-6 sm:p-7 ${
                tramo.destacado ? "bg-surface border-border-hi" : ""
              }`}
            >
              <p className="text-base font-medium tracking-[-0.01em] text-fg">
                {tramo.nombre}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {tramo.para}
              </p>

              <div className="mt-6 border-t border-border pt-6">
                <p className="font-mono text-2xl tracking-[-0.02em] text-fg">
                  {tramo.mensualidad}
                  <span className="ml-1 font-sans text-sm text-muted">
                    USD/mes
                  </span>
                </p>
                <p className="mt-1.5 text-sm text-muted">
                  {tramo.implementacion} de implementación, pago único
                </p>
              </div>

              <div className="mt-5 border-t border-border pt-5">
                <p className="text-sm text-fg">{tramo.conversaciones}</p>
                <p className="mt-1 text-sm text-dim">{tramo.extra}</p>
              </div>

              <ul className="mt-5 flex-1 space-y-3 border-t border-border pt-5">
                {tramo.incluye.map((item) => (
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

              <a
                href={config.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={`${btnPrimary} mt-6 w-full`}
              >
                Conversemos tu caso
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className={`${card} bg-surface p-6 sm:p-7`}>
            <p className="text-base font-medium tracking-[-0.01em] text-fg">
              En los tres tramos
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
              El consumo va aparte
            </p>

            {/* Visible, no en letra chica: el consumo va sobre la mensualidad
                y el comprador tiene que saberlo antes de la llamada. Es el
                único monto que varía de mes a mes, y una sorpresa acá cuesta
                el cliente. */}
            <p className="mt-6 border-t border-border pt-6 text-sm leading-relaxed text-muted">
              Aparte de la mensualidad corre el{" "}
              <span className="text-fg">consumo del mes</span>: mensajes de
              Meta, transcripción de audios e integraciones. Va a costo, sin
              recargo mío, en la misma boleta.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-muted">
              En el tramo de seguimiento automático es el monto que más se
              mueve, porque cada recordatorio que envía el agente es un mensaje
              que cobra Meta. Te muestro la estimación antes de activarlo.
            </p>

            <p className="mt-6 flex-1 border-t border-border pt-6 text-sm leading-relaxed text-muted">
              ¿No estás seguro de cuál te corresponde? Lo vemos en la llamada con
              los números reales de tu negocio, y te dejo el valor por escrito
              antes de que decidas.
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

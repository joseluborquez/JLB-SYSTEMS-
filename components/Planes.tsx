import Eyebrow, { IconoEtiqueta } from "@/components/Eyebrow";
import { config } from "@/lib/config";
import { btnPrimary, card, container, heading, section } from "@/lib/ui";
import CalculadoraIA from "@/components/CalculadoraIA";
import CalculadoraMeta from "@/components/CalculadoraMeta";

// Cuatro tramos, definidos por LO QUE HACE el agente, no por volumen.
// Conversaciones ilimitadas en los tres — antes había tope + cobro extra
// por conversación, pero eso protegía un costo de IA que absorbía yo. Ahora
// el consumo de IA va a costo del cliente (ver CalculadoraIA), así que un
// tope ya no protege ningún margen: solo sería una restricción artificial.
//
// Implementación pareja en $300 + IVA en los tres tramos con precio fijo,
// divisible en las primeras 3 mensualidades con contrato mínimo de 3 meses
// — la ventana de contrato coincide con lo que toma recuperar el costo real
// de implementación vía margen mensual.
//
// Los valores salen del modelo en COSTOS.md del repo del CRM. Si cambias uno
// acá, cambia también el prompt del agente: cita los precios de memoria.
const tramos = [
  {
    nombre: "Básico",
    implementacion: "$300",
    mensualidad: "$120",
    para: "Negocios que solo necesitan responder preguntas frecuentes, sin agendar ni integrar nada todavía.",
    incluye: [
      "Número propio de WhatsApp conectado al negocio",
      "Responde dudas frecuentes con la información de tu negocio",
      "Conversaciones ilimitadas al mes",
      "Entiende qué necesita cada persona y lo registra",
      "Te avisa cuando alguien necesita hablar contigo",
    ],
    destacado: false,
  },
  {
    nombre: "Responde y agenda",
    implementacion: "$300",
    mensualidad: "$220",
    para: "Negocios que pierden clientes por no contestar a tiempo.",
    incluye: [
      "Número propio de WhatsApp conectado al negocio",
      "Todo lo de Básico",
      "Agenda en tu calendario y manda la invitación",
      "Conversaciones ilimitadas al mes",
    ],
    destacado: false,
  },
  {
    nombre: "Integrado",
    implementacion: "$300",
    mensualidad: "$390",
    para: "Negocios con sistemas propios donde el agente tiene que operar.",
    incluye: [
      "Número propio de WhatsApp conectado al negocio",
      "Todo lo de Responde y agenda",
      "Se conecta con tu CRM: consulta y actualiza datos del cliente y del pipeline",
      "Recordatorios y avisos programados a clientes que ya tienes",
    ],
    destacado: true,
  },
];

// Ciclo completo no tiene precio fijo (es a cotización), así que no calza
// con el layout de tarjeta angosta de los tres de arriba — se muestra aparte,
// como una tarjeta ancha, en vez de forzarla al mismo grid.
const cicloCompleto = {
  nombre: "Ciclo completo",
  para: "Operaciones que necesitan integraciones a medida más allá del CRM.",
  incluye: [
    "Todo lo de Integrado",
    "Integraciones a medida, sin límite de sistemas (facturación, inventario, sistemas propios)",
    "Seguimiento a leads que no respondieron y recuperación de ventas caídas",
    "Prioridad de soporte y ajustes",
  ],
};

const incluyeSiempre = [
  "Agente construido a medida para tu negocio, no una plantilla",
  "Panel de conversaciones con el historial completo",
  "Ajustes de textos, precios y horarios incluidos",
  "Número propio de WhatsApp para el negocio",
  "Soporte por WhatsApp, 24/7",
  "Mes a mes, sin contrato de permanencia (salvo que dividas la implementación en cuotas, ver abajo)",
];

export default function Planes() {
  return (
    <section id="planes" className={section}>
      <div className={container}>
        <Eyebrow icono={IconoEtiqueta}>Precios</Eyebrow>

        <h2 className={`${heading} mt-4 max-w-3xl`}>
          Se paga en dos partes:{" "}
          <span className="text-muted">
            una implementación única y una mensualidad.
          </span>
        </h2>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
          La implementación se puede pagar de una vez, o dividida en las
          primeras 3 mensualidades con un contrato mínimo de 3 meses.
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
                    USD/mes + IVA
                  </span>
                </p>
                <p className="mt-1.5 text-sm text-muted">
                  {tramo.implementacion} USD + IVA de implementación
                </p>
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

        {/* Ciclo completo: ancha y sola, no un cuarto casillero angosto —
            es a cotización, no tiene precio que mostrar como los otros tres. */}
        <div className={`${card} mt-4 flex flex-col gap-6 p-6 sm:p-7 lg:flex-row lg:items-center`}>
          <div className="lg:w-1/3">
            <p className="text-base font-medium tracking-[-0.01em] text-fg">
              {cicloCompleto.nombre}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              {cicloCompleto.para}
            </p>
            <p className="mt-4 font-mono text-xl tracking-[-0.02em] text-fg">
              A cotización
            </p>
            <p className="mt-1 text-xs text-dim">Valor USD + IVA, según alcance</p>
            <a
              href={config.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnPrimary} mt-4 w-full lg:w-auto`}
            >
              Conversemos tu caso
            </a>
          </div>

          <ul className="grid flex-1 gap-3 border-t border-border pt-6 sm:grid-cols-2 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
            {cicloCompleto.incluye.map((item) => (
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

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className={`${card} bg-surface p-6 sm:p-7`}>
            <p className="text-base font-medium tracking-[-0.01em] text-fg">
              En los cuatro tramos
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
              <span className="text-fg">consumo del mes</span>: el modelo de
              IA que elijas, mensajes de Meta e integraciones. Va a costo, sin
              recargo mío, en la misma boleta.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-muted">
              En el tramo de seguimiento automático es el monto que más se
              mueve, porque cada recordatorio que envía el agente es un mensaje
              que cobra Meta. Te muestro la estimación antes de activarlo.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-muted">
              La transcripción de audios (notas de voz) tiene uso razonable
              incluido. Si tu negocio recibe muchas notas de voz, lo vemos en
              la llamada para que no te tomes una sorpresa.
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

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <CalculadoraIA />
          <CalculadoraMeta />
        </div>

        <div className="mt-8 grid gap-x-8 gap-y-3 border-t border-border pt-6 text-sm leading-relaxed text-dim sm:grid-cols-2">
          <p>
            Una conversación son 24 horas de chat con la misma persona, no un
            mensaje.
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

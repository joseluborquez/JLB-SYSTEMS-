import Eyebrow, { IconoChispa } from "@/components/Eyebrow";
import { config } from "@/lib/config";
import { btnPrimary, container, heading, section } from "@/lib/ui";

/**
 * Conversación que se muestra como vista previa.
 *
 * REEMPLAZAR POR UNA REAL: copia un intercambio de verdad de tu agente
 * (anonimizado) y cambia la etiqueta de abajo a "Conversación real". Una
 * transcripción auténtica convence mucho más que un ejemplo, y acá el único
 * costo de cambiarla es editar este arreglo.
 */
const conversacion: { de: "cliente" | "agente"; texto: string }[] = [
  {
    de: "cliente",
    texto: "Hola, tengo una veterinaria y quiero saber cuánto cuesta",
  },
  {
    de: "agente",
    texto:
      "Hola. Hay tres tramos según lo que necesites que haga el agente. El de entrada son $450 USD + IVA de implementación y $220 al mes, con el primer mes de operación incluido. ¿Cuántas consultas recibes al mes por WhatsApp, más o menos?",
  },
  { de: "cliente", texto: "unas 200" },
  {
    de: "agente",
    texto:
      "Con ese volumen quedas en el tramo de entrada. ¿Te agendo 30 minutos con José Luis para ver tu caso? Tengo jueves 15:00 o viernes 11:00.",
  },
  { de: "cliente", texto: "jueves" },
  {
    de: "agente",
    texto: "Listo, jueves 15:00. Te llega la invitación al correo.",
  },
];

const preguntas = [
  "¿Cuánto cuesta para mi rubro?",
  "¿Se conecta con mi sistema de agenda?",
  "Quiero hablar con una persona",
];

export default function Demo() {
  return (
    <section id="demo" className={section}>
      <div className={container}>
        <Eyebrow icono={IconoChispa}>Demo en vivo</Eyebrow>

        <h2 className={`${heading} mt-4 max-w-3xl`}>
          El agente que te atiende es el mío.{" "}
          <span className="text-muted">
            Escríbele por WhatsApp y pregúntale lo que quieras.
          </span>
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="max-w-md text-base leading-relaxed text-muted">
              Lo construí igual que construyo los de mis clientes: conoce mis
              precios, entiende qué necesitas y te agenda la llamada sin que yo
              intervenga. Si prefieres hablar conmigo, se lo dices y me pasa la
              conversación.
            </p>

            <p className="mt-8 font-mono text-xs text-dim">Prueba con:</p>
            <ul className="mt-3 space-y-2">
              {preguntas.map((pregunta) => (
                <li
                  key={pregunta}
                  className="flex gap-2.5 text-sm leading-relaxed text-muted"
                >
                  <span aria-hidden="true" className="text-dim">
                    ↳
                  </span>
                  <span>{pregunta}</span>
                </li>
              ))}
            </ul>

            <a
              href={config.whatsappDemo}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnPrimary} mt-8`}
            >
              Escríbele por WhatsApp <span aria-hidden="true">→</span>
            </a>

            <p className="mt-5 max-w-xs text-xs leading-relaxed text-dim">
              Responde al tiro, a cualquier hora. No te va a llamar nadie.
            </p>
          </div>

          {/* Vista previa: adelanta cómo es la conversación para que abrir
              WhatsApp no sea un salto a ciegas. */}
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-between gap-3 border-b border-border bg-surface px-4 py-2.5">
              <span className="flex min-w-0 items-center gap-2 font-mono text-xs text-muted">
                <span
                  aria-hidden="true"
                  className="size-1.5 shrink-0 rounded-full bg-muted"
                />
                <span className="truncate">Agente de {config.empresa}</span>
              </span>
              <span className="shrink-0 font-mono text-xs whitespace-nowrap text-dim">
                23:47
              </span>
            </div>

            <div className="space-y-3 p-4">
              {conversacion.map((mensaje, i) => (
                <div
                  key={i}
                  className={
                    mensaje.de === "cliente"
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                >
                  <p
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      mensaje.de === "cliente"
                        ? "rounded-br-md border border-border-hi bg-surface text-fg"
                        : "rounded-bl-md border border-border text-muted"
                    }`}
                  >
                    {mensaje.texto}
                  </p>
                </div>
              ))}
            </div>

            <p className="border-t border-border px-4 py-2.5 font-mono text-xs text-dim">
              Conversación de ejemplo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

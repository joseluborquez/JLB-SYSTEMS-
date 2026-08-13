import Eyebrow, { IconoFlujo } from "@/components/Eyebrow";
import { container, heading, section } from "@/lib/ui";

const pasos = [
  {
    titulo: "Llega la consulta",
    texto:
      "Por WhatsApp, a cualquier hora. El negocio recibe un número nuevo, separado de tu teléfono personal, que convive con el que ya usas. No migras nada.",
  },
  {
    titulo: "El agente responde",
    texto:
      "Contesta dudas con la información real de tu negocio: precios, horarios, servicios, disponibilidad.",
  },
  {
    titulo: "Entiende y agenda",
    texto:
      "Entiende qué necesita la persona, y si corresponde, la agenda directo en tu calendario.",
  },
  {
    titulo: "Hace seguimiento",
    texto:
      "Si preguntó y no cerró, el agente retoma la conversación más adelante en vez de dejarla ahí.",
  },
  {
    titulo: "Te avisa cuando te necesita",
    texto:
      "Si el caso requiere una persona, te notifica y tomas la conversación desde donde quedó.",
  },
];

export default function ComoFunciona() {
  return (
    <section className={section}>
      {/* Titular fijo a la izquierda mientras los pasos scrollean, como en
          las referencias de dos columnas. */}
      <div
        className={`${container} grid gap-10 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-16`}
      >
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow icono={IconoFlujo}>Proceso</Eyebrow>
          <h2 className={`${heading} mt-4`}>
            Cómo funciona.{" "}
            <span className="text-muted">
              Tú apareces solo en el último paso.
            </span>
          </h2>
        </div>

        <ol className="border-t border-border">
          {pasos.map((paso, i) => (
            <li
              key={paso.titulo}
              className="grid gap-2 border-b border-border py-7 sm:grid-cols-[3rem_1fr] sm:gap-6"
            >
              <span className="font-mono text-sm text-dim">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="max-w-2xl">
                <h3 className="text-base font-medium tracking-[-0.01em] text-fg">
                  {paso.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {paso.texto}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

import Reticula from "@/components/Reticula";
import { config } from "@/lib/config";
import { btnPrimary, btnSecondary, container, heading } from "@/lib/ui";

const pasos = [
  {
    titulo: "Conversamos",
    texto: "me cuentas cómo atiendes hoy y qué te preguntan.",
  },
  {
    titulo: "Lo construyo",
    texto: "armo el agente con tu información y lo conecto a tus herramientas.",
  },
  {
    titulo: "Lo probamos",
    texto: "revisas conversaciones reales, ajustamos lo que haga falta.",
  },
  {
    titulo: "En marcha",
    texto: "el agente atiende, yo me encargo del mantenimiento.",
  },
];

export default function Cierre() {
  return (
    <section className="relative overflow-hidden border-t border-border py-20 sm:py-28">
      <Reticula />

      <div className={`${container} relative`}>
        <h2 className={`${heading} max-w-3xl`}>
          Cómo empezamos.{" "}
          <span className="text-muted">
            No parte con un contrato, parte con una conversación.
          </span>
        </h2>

        {/* Cuatro columnas solo desde lg: a 640px dejarían ~100px por celda.
            Entre medio se lee como lista vertical, que es correcto en vez de
            apretado. `divide` no sirve en una grilla que envuelve, así que no
            hay paso intermedio de dos columnas. */}
        <ol className="mt-14 grid divide-y divide-border border-y border-border lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {pasos.map((paso, i) => (
            <li
              key={paso.titulo}
              className="py-7 lg:px-6 lg:py-8 lg:first:pl-0 lg:last:pr-0"
            >
              <span className="font-mono text-xs text-dim">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-sm font-medium tracking-[-0.01em] text-fg">
                {paso.titulo}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {paso.texto}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <a
            href={config.calendario}
            target="_blank"
            rel="noopener noreferrer"
            className={btnPrimary}
          >
            Agenda una llamada <span aria-hidden="true">→</span>
          </a>
          <a
            href={config.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={btnSecondary}
          >
            o escríbeme por WhatsApp
          </a>
        </div>

        {/* Va bajo los botones a propósito: baja la barrera justo antes del
            clic, no doce líneas antes. */}
        <p className="mt-6 font-mono text-xs text-dim">
          30 minutos, sin compromiso. Vemos si tiene sentido para tu caso.
        </p>
      </div>
    </section>
  );
}

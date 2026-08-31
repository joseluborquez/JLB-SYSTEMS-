import Image from "next/image";
import { config } from "@/lib/config";
import { btnPrimary, container, heading, section } from "@/lib/ui";

const pasos = [
  {
    titulo: "Diagnóstico gratuito",
    texto: "reunión inicial para definir alcance y crear una maqueta general.",
  },
  {
    titulo: "Kick-off administrativo",
    texto: "aceptación de la propuesta y planificación inicial.",
  },
  {
    titulo: "Definición del proyecto",
    texto: "arquitectura y principales flujos.",
  },
  {
    titulo: "Desarrollo",
    texto:
      "construcción del producto acelerada por IA, con reuniones semanales de feedback.",
  },
  {
    titulo: "Entrega",
    texto: "reunión final con producto funcional y documentación técnica.",
  },
];

export default function Metodo() {
  return (
    <section id="metodo" className={section}>
      <div className={container}>
        <div className="flex flex-col items-center text-center">
          <div className="relative size-40 overflow-hidden rounded-full border border-border-hi sm:size-56">
            <Image
              src="/jose-profile.png"
              alt="José Luis Bórquez — software a medida acelerado por IA"
              fill
              sizes="(min-width: 640px) 224px, 160px"
              className="object-cover"
              priority
            />
          </div>
          <h2 className={`${heading} mt-6 max-w-2xl`}>
            De tu problema a software funcionando.
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            Un proceso claro, acelerado por IA — {config.persona}.
          </p>
        </div>

        <ol className="mt-14 grid divide-y divide-border border-y border-border md:grid-cols-5 md:divide-x md:divide-y-0">
          {pasos.map((paso, i) => (
            <li
              key={paso.titulo}
              className="py-7 md:px-5 md:py-8 md:first:pl-0 md:last:pr-0"
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

        <div className="mt-10 flex justify-center">
          <a
            href={config.calendario}
            target="_blank"
            rel="noopener noreferrer"
            className={btnPrimary}
          >
            Agenda una reunión gratuita <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

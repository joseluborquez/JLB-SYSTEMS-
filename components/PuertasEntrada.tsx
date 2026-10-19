import { btnPrimary, cardFlujo, container, heading, section } from "@/lib/ui";

// Dos caminos al mismo cierre (agendar 30 minutos): quien ya sabe qué
// necesita va a las soluciones; quien no, al recorrido que parte por la
// auditoría.
const puertas = [
  {
    href: "#soluciones",
    titulo: "Ya sé qué necesito",
    texto:
      "Armamos un sistema acotado, conectado a las herramientas que ya usas, y capacitamos a tu equipo para que lo maneje.",
    enlace: "Ver qué armamos",
  },
  {
    href: "#como-funciona",
    titulo: "No sé por dónde empezar",
    texto:
      "Partimos con una auditoría de flujos: revisamos cómo trabaja tu negocio y te entregamos una hoja de ruta priorizada.",
    enlace: "Ver cómo funciona",
  },
];

export default function PuertasEntrada() {
  return (
    <section className={section}>
      <div className={container}>
        <h2 className={`${heading} max-w-2xl`}>
          ¿Dónde estás hoy?{" "}
          <span className="text-muted">Hay dos formas de empezar.</span>
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {puertas.map((puerta) => (
            <a
              key={puerta.titulo}
              href={puerta.href}
              className={`${cardFlujo} group flex flex-col bg-surface p-6 sm:p-8 hover:border-border-hi`}
            >
              <h3 className="text-lg font-medium tracking-[-0.01em] text-fg">
                {puerta.titulo}
              </h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-muted">
                {puerta.texto}
              </p>
              <span className={`${btnPrimary} mt-6 self-start`}>
                {puerta.enlace}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

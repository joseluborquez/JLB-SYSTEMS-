import Eyebrow, { IconoCapas } from "@/components/Eyebrow";
import { card, container, heading, section } from "@/lib/ui";

const puntos = [
  {
    titulo: "Se integra con tus herramientas",
    texto:
      "Tu sistema de agenda, tu base de datos, tu pasarela de pago. Si tiene API, se conecta.",
  },
  {
    titulo: "No tienes que configurar nada",
    texto:
      "No hay constructor de flujos que aprender ni plantillas que llenar. Me cuentas cómo atiendes y te lo dejo andando.",
  },
  {
    titulo: "Crece contigo",
    texto:
      "¿Necesitas después que cobre, consulte stock o avise a tu equipo? Se agrega sin empezar de cero.",
  },
];

// Lo que el agente de ese cliente hace hoy. Sirve como prueba de las tres
// tarjetas de arriba, que sin esto son solo afirmaciones.
const capacidades = [
  "agenda visitas",
  "genera link de pago",
  "registra en base de datos",
  "responde consultas",
];

export default function Diferenciador() {
  return (
    <section className={section}>
      <div className={container}>
        <Eyebrow icono={IconoCapas}>A medida</Eyebrow>

        {/* Titular a dos tonos: la afirmación en blanco, el matiz en muted. */}
        <h2 className={`${heading} mt-4 max-w-3xl`}>
          Construido según cómo trabaja tu negocio.{" "}
          <span className="text-muted">
            No adapto tu operación a un software.
          </span>
        </h2>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
          Parto de tu flujo real: qué te preguntan, cómo sabes si alguien va en
          serio, cómo agendas, cuándo entra una persona.
        </p>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {puntos.map((punto) => (
            <div
              key={punto.titulo}
              className={`${card} bg-surface p-6 transition-colors duration-150 hover:border-border-hi`}
            >
              <h3 className="text-base font-medium leading-snug tracking-[-0.01em] text-fg">
                {punto.titulo}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {punto.texto}
              </p>
            </div>
          ))}
        </div>

        {/* La evidencia va aparte de las afirmaciones: mismo borde, sin fondo,
            para que no se lea como una cuarta tarjeta de features. */}
        <div className={`${card} mt-4 p-6 sm:p-7`}>
          <p className="font-mono text-xs tracking-[0.02em] text-dim">
            Un caso real
          </p>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg">
            A un cliente le armé un agente que agenda visitas, genera el link de
            pago y deja todo registrado en su base de datos. Además responde las
            consultas de siempre.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {capacidades.map((capacidad) => (
              <li
                key={capacidad}
                className="rounded-full border border-border-hi px-3 py-1 font-mono text-xs text-muted"
              >
                {capacidad}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

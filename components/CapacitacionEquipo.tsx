import Link from "next/link";
import { btnPrimary, cardFlujo, container, heading, section } from "@/lib/ui";

// Franja corta: la mitad "que tu equipo domina" de la promesa, con un caso.
const puntos = [
  "Antes de cerrar el proyecto, tu equipo hace un cambio real, acompañado por nosotros.",
  "Tú eliges hasta dónde llegar: usarlo, ajustarlo o construir sobre él.",
  "Los accesos quedan a tu nombre. No dependes de nadie para modificarlo.",
];

export default function CapacitacionEquipo() {
  return (
    <section className={section}>
      <div className={container}>
        <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-14">
          <div>
            <h2 className={heading}>
              Cada solución incluye capacitación.{" "}
              <span className="text-muted">
                Tu equipo la domina antes de que cerremos.
              </span>
            </h2>
            <ul className="mt-8 space-y-4">
              {puntos.map((punto) => (
                <li
                  key={punto}
                  className="flex gap-3 text-base leading-relaxed text-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-fg"
                  />
                  {punto}
                </li>
              ))}
            </ul>
          </div>

          <div className={`${cardFlujo} bg-surface p-6 sm:p-8`}>
            <p className="font-mono text-xs text-dim">Caso · Sublinovena</p>
            <p className="mt-4 text-lg font-medium leading-snug tracking-[-0.01em] text-fg">
              Su equipo aprendió a hacer cambios en su sitio por su cuenta.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Después de entregar el proyecto, empezaron a ajustarlo solos y
              pidieron el siguiente paso: conectar Claude a sus herramientas.
            </p>
            <Link href="/casos/sublinovena" className={`${btnPrimary} mt-6`}>
              Ver proyecto
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

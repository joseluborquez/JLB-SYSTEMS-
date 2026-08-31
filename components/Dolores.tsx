import { card, container, heading, section } from "@/lib/ui";

const dolores = [
  {
    titulo: "Respuesta lenta a leads",
    texto: "Pierdes prospectos ante la competencia por no responder a tiempo.",
  },
  {
    titulo: "Procesos operativos manuales",
    texto: "Cierre de caja, cotizaciones, despachos que consumen horas del equipo.",
  },
  {
    titulo: "Software genérico que no calza",
    texto: "Herramientas de plantilla que no se ajustan a tu operación específica.",
  },
  {
    titulo: "Agencias tradicionales, fuera de presupuesto",
    texto: "Cotizan $10-50K+ USD y meses de espera para un problema urgente.",
  },
  {
    titulo: "Dependencia de plataformas de terceros",
    texto: "Límites de configuración, lock-in, sin dueño real del código.",
  },
  {
    titulo: "Falta de seguimiento estructurado",
    texto: "Prospectos que se enfrían sin un sistema que los nutra.",
  },
];

export default function Dolores() {
  return (
    <section className={section}>
      <div className={container}>
        <h2 className={`${heading} max-w-3xl`}>
          ¿Tu negocio pierde tiempo o dinero por procesos manuales?{" "}
          <span className="text-muted">Estos son los problemas que más resuelvo.</span>
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dolores.map((dolor) => (
            <div
              key={dolor.titulo}
              className={`${card} bg-surface p-6 transition-colors duration-150 hover:border-border-hi`}
            >
              <h3 className="text-base font-medium leading-snug tracking-[-0.01em] text-fg">
                {dolor.titulo}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {dolor.texto}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

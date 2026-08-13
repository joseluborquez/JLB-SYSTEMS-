import Eyebrow, { IconoReloj } from "@/components/Eyebrow";
import { container, heading, section } from "@/lib/ui";

const bloques = [
  {
    titulo: "Contestas cuando puedes, no cuando el cliente escribe",
    texto:
      "Y entre que llega el mensaje y le respondes, ya preguntó en otros dos lados.",
  },
  {
    titulo: "Repites las mismas cinco respuestas todos los días",
    texto:
      "Precios, horarios, ubicación, si atienden tal cosa. Una y otra vez.",
  },
  {
    titulo: "Los que no cerraron quedan ahí, sin seguimiento",
    texto: "Preguntaron, les interesó, y nadie volvió a escribirles.",
  },
];

export default function Problema() {
  return (
    <section className={section}>
      <div className={container}>
        <Eyebrow icono={IconoReloj}>El problema</Eyebrow>

        <h2 className={`${heading} mt-4 max-w-3xl`}>
          Lo que pasa mientras no estás.{" "}
          <span className="text-muted">
            No es falta de ganas de responder. Es que no puedes estar siempre.
          </span>
        </h2>

        {/* Columnas separadas solo por divisores, sin caja alrededor.
            Recién a md: a 640px tres columnas dejan ~155px útiles y los
            titulares se parten en cinco líneas. */}
        <div className="mt-14 grid divide-y divide-border border-y border-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {bloques.map((bloque) => (
            <div
              key={bloque.titulo}
              className="py-8 md:px-7 md:py-10 md:first:pl-0 md:last:pr-0"
            >
              <h3 className="text-base font-medium leading-snug tracking-[-0.01em] text-fg">
                {bloque.titulo}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {bloque.texto}
              </p>
            </div>
          ))}
        </div>

        {/* Cierre que conecta las tres pérdidas con la plata, sin inventar
            ninguna cifra: la aritmética la hace el lector. */}
        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted">
          Ninguno de los tres se nota en el día a día. Se notan a fin de mes.
        </p>
      </div>
    </section>
  );
}

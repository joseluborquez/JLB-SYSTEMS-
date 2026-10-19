import Eyebrow from "@/components/Eyebrow";
import Reticula from "@/components/Reticula";
import { container } from "@/lib/ui";

type Props = {
  eyebrow?: string;
  icono?: React.ReactNode;
  titulo: React.ReactNode;
  /** Segunda parte del titular, en gris. */
  tituloSecundario?: React.ReactNode;
  descripcion?: React.ReactNode;
  /** Botones debajo de la descripción. */
  acciones?: React.ReactNode;
  /** Elemento decorativo a la derecha del titular (de fondo en móvil). */
  lateral?: React.ReactNode;
};

/** Encabezado de portada y de páginas internas: mismo ritmo en todas. */
export default function EncabezadoPagina({
  eyebrow,
  icono,
  titulo,
  tituloSecundario,
  descripcion,
  acciones,
  lateral,
}: Props) {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      <Reticula />

      <div
        className={`${container} relative ${
          lateral
            ? "grid items-center gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-6"
            : ""
        }`}
      >
        <div className="relative z-10">
          {eyebrow ? <Eyebrow icono={icono}>{eyebrow}</Eyebrow> : null}

          <h1
            className={`${eyebrow ? "mt-4 " : ""}max-w-3xl ${
              // Con elemento lateral el titular comparte fila: letra menor.
              lateral
                ? "text-[clamp(1.9rem,5.5vw,2.5rem)] md:text-[clamp(1.9rem,4.2vw,3.5rem)]"
                : "text-[clamp(2rem,6.5vw,4rem)]"
            } font-medium leading-[1.06] tracking-[-0.04em] text-fg`}
          >
            {titulo}
            {tituloSecundario ? (
              <>
                <br />
                <span className="text-muted">{tituloSecundario}</span>
              </>
            ) : null}
          </h1>

          {descripcion ? (
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {descripcion}
            </p>
          ) : null}

          {acciones ? (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {acciones}
            </div>
          ) : null}
        </div>

        {lateral ? (
          // En móvil queda de fondo, detrás del texto; desde md va al costado.
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-45 md:pointer-events-auto md:static md:block md:opacity-100">
            {lateral}
          </div>
        ) : null}
      </div>
    </section>
  );
}

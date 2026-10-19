import ArbolPasos from "@/components/ArbolPasos";
import Eyebrow, { IconoReloj } from "@/components/Eyebrow";
import { container, heading, section } from "@/lib/ui";

export default function PasosRecorrido() {
  return (
    <section id="como-funciona" className={section}>
      <div className={container}>
        <Eyebrow icono={IconoReloj}>Ruta de autonomía</Eyebrow>

        <h2 className={`${heading} mt-4 max-w-2xl`}>
          Primero entender,{" "}
          <span className="text-muted">después implementar.</span>
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          Tres meses para pasar de procesos manuales a un sistema que tu equipo
          domina: el primero para auditar, el segundo para implementar y
          capacitar, el tercero para acompañar.
        </p>

        <ArbolPasos />

        <p className="mt-10 text-sm text-muted">
          Puedes llevarte la hoja de ruta y ejecutarla con otro proveedor.
        </p>
      </div>
    </section>
  );
}

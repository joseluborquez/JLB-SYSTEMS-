import type { Metadata } from "next";
import CasosFiltrables from "@/components/CasosFiltrables";
import CierreAgenda from "@/components/CierreAgenda";
import EncabezadoPagina from "@/components/EncabezadoPagina";
import { proyectos } from "@/lib/proyectos";
import { container, section } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Casos",
  description:
    "Proyectos reales de JLB Systems: agentes de WhatsApp, integraciones y plataformas a medida, con la situación inicial, lo implementado y el resultado.",
};

export default function Casos() {
  return (
    <>
      <EncabezadoPagina
        eyebrow="Casos"
        titulo="Una página por caso,"
        tituloSecundario="con el antes y el después."
        descripcion="Filtra por módulo para ver cómo se aplicó cada solución en negocios reales."
      />
      <section className={section}>
        <div className={container}>
          <CasosFiltrables casos={proyectos} />
        </div>
      </section>
      <CierreAgenda />
    </>
  );
}

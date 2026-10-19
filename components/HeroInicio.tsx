import BotonAgenda from "@/components/BotonAgenda";
import EncabezadoPagina from "@/components/EncabezadoPagina";
import OrbeHero from "@/components/OrbeHero";
import { btnPrimary } from "@/lib/ui";

export default function HeroInicio() {
  return (
    <EncabezadoPagina
      titulo="Convierte tus procesos manuales"
      tituloSecundario="en sistemas con IA que tu equipo domina."
      descripcion="Conectamos las herramientas que ya usas, automatizamos lo repetitivo y capacitamos a tu equipo para que lo maneje."
      lateral={<OrbeHero />}
      acciones={
        <>
          <BotonAgenda />
          <a href="#como-funciona" className={btnPrimary}>
            Ver cómo funciona
          </a>
        </>
      }
    />
  );
}

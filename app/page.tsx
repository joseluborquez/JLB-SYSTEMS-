import CierreHome from "@/components/CierreHome";
import Dolores from "@/components/Dolores";
import Herramientas from "@/components/Herramientas";
import HeroPersonal from "@/components/HeroPersonal";
import Metodo from "@/components/Metodo";
import PortafolioGrid from "@/components/PortafolioGrid";
import Servicios from "@/components/Servicios";
import Testimonios from "@/components/Testimonios";
import WelcomeDialog from "@/components/WelcomeDialog";
import { getTestimoniosAprobados } from "@/lib/testimonios";

// La página se genera estática por defecto (no usa cookies/headers), así
// que sin esto las reseñas quedarían congeladas en lo que había al hacer
// build. Revalida cada hora — no hace falta más frecuencia para algo que
// se aprueba a mano.
export const revalidate = 3600;

export default async function Home() {
  const testimonios = await getTestimoniosAprobados();

  return (
    <>
      <HeroPersonal />
      <Dolores />
      <Metodo />
      <Servicios />
      <PortafolioGrid />
      <Testimonios testimonios={testimonios} />
      <Herramientas />
      <CierreHome />
      <WelcomeDialog />
    </>
  );
}

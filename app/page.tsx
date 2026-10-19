import CasosDestacados from "@/components/CasosDestacados";
import CapacitacionEquipo from "@/components/CapacitacionEquipo";
import CierreHome from "@/components/CierreHome";
import HeroInicio from "@/components/HeroInicio";
import PasosRecorrido from "@/components/PasosRecorrido";
import PuertasEntrada from "@/components/PuertasEntrada";
import QuienYPreguntas from "@/components/QuienYPreguntas";
import SolucionesInicio from "@/components/SolucionesInicio";
import Testimonios from "@/components/Testimonios";
import WelcomeDialog from "@/components/WelcomeDialog";
import { getTestimoniosAprobados } from "@/lib/testimonios";

// La página se genera estática por defecto (no usa cookies/headers), así
// que sin esto las reseñas quedarían congeladas en lo que había al hacer
// build. Revalida cada hora — no hace falta más frecuencia para algo que
// se aprueba a mano.
export const revalidate = 3600;

// Portada única: ocho secciones que resumen lo que antes eran páginas
// separadas (auditoría, soluciones, método, precios). El detalle de cada
// módulo se conversa en la llamada de 30 minutos. Se conservan aparte la
// página del agente de WhatsApp y el detalle de los casos.
export default async function Home() {
  const testimonios = await getTestimoniosAprobados();

  return (
    <>
      <HeroInicio />
      <Testimonios testimonios={testimonios} />
      <PuertasEntrada />
      <PasosRecorrido />
      <SolucionesInicio />
      <CapacitacionEquipo />
      <CasosDestacados />
      <QuienYPreguntas />
      <CierreHome />
      <WelcomeDialog />
    </>
  );
}

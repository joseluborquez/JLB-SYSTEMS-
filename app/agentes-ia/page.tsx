import type { Metadata } from "next";
import Cierre from "@/components/Cierre";
import ComoFunciona from "@/components/ComoFunciona";
import Demo from "@/components/Demo";
import Diferenciador from "@/components/Diferenciador";
import Hero from "@/components/Hero";
import Planes from "@/components/Planes";
import Problema from "@/components/Problema";

export const metadata: Metadata = {
  title: "Agentes de WhatsApp con IA",
  description:
    "Agentes de IA para WhatsApp construidos a medida para negocios de servicios en LATAM. Responden en segundos, resuelven dudas, califican y agendan.",
};

export default function AgentesIA() {
  return (
    <>
      <Hero />
      <Demo />
      <Problema />
      <ComoFunciona />
      <Diferenciador />
      <Planes />
      <Cierre />
    </>
  );
}

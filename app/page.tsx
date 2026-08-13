import Cierre from "@/components/Cierre";
import ComoFunciona from "@/components/ComoFunciona";
import Demo from "@/components/Demo";
import Diferenciador from "@/components/Diferenciador";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Planes from "@/components/Planes";
import Problema from "@/components/Problema";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Demo />
        <Problema />
        <ComoFunciona />
        <Diferenciador />
        <Planes />
        <Cierre />
      </main>
      <Footer />
    </>
  );
}

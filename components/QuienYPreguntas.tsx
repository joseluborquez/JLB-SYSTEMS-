import Faq from "@/components/Faq";
import TarjetaPerfil from "@/components/TarjetaPerfil";
import { faqsAuditoria } from "@/lib/auditoria";
import { container, heading, section } from "@/lib/ui";

// Quién está detrás y preguntas frecuentes, en una sola sección.
export default function QuienYPreguntas() {
  return (
    <section id="preguntas" className={section}>
      <div className={container}>
        <div className="flex flex-col items-center gap-12 text-center md:flex-row md:items-center md:gap-16 md:text-left">
          <TarjetaPerfil />

          <div>
            <h2 className={heading}>Hola, soy José Luis.</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              Certificado como AI Operations Expert. Con JLB Systems ayudamos a
              negocios a decidir dónde sí y dónde no aplicar IA, y a quedarse
              con el control de lo que se implementa.
            </p>
          </div>
        </div>

        <h3 className="mt-24 text-xl font-medium tracking-[-0.01em] text-fg sm:text-2xl">
          Preguntas frecuentes
        </h3>
        <div className="mt-6 max-w-3xl">
          <Faq items={faqsAuditoria} />
        </div>
      </div>
    </section>
  );
}

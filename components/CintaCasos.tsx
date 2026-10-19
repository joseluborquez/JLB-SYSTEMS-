"use client";

import { useEffect, useRef } from "react";

// Cinta horizontal con avance automático permanente en bucle. El scroll manual
// (trackpad o swipe); mantener presionado lo detiene se suma al avance: sirve para acelerarlo, y al
// soltar vuelve a la velocidad base. Espera dos copias idénticas del contenido:
// al pasar la mitad del ancho vuelve atrás sin salto.
const VELOCIDAD = 40; // px por segundo
const TACTIL_MS = 700; // pausa extra tras soltar el dedo

export default function CintaCasos({
  children,
  etiqueta = "Proyectos",
}: {
  children: React.ReactNode;
  etiqueta?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reducido = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let ultimo = 0;
    let acumulado = 0;
    let tactilHasta = 0;
    let tocando = false;
    let visible = true;

    const ajustar = () => {
      const mitad = el.scrollWidth / 2;
      if (!mitad) return;
      if (el.scrollLeft >= mitad) el.scrollLeft -= mitad;
      else if (el.scrollLeft <= 0) el.scrollLeft += mitad;
    };

    const frame = (ahora: number) => {
      const dt = ultimo ? Math.min((ahora - ultimo) / 1000, 0.05) : 0;
      ultimo = ahora;
      if (visible && !tocando && ahora >= tactilHasta) {
        acumulado += VELOCIDAD * dt;
        const entero = Math.trunc(acumulado);
        if (entero !== 0) {
          el.scrollLeft += entero;
          acumulado -= entero;
        }
      }
      ajustar();
      raf = requestAnimationFrame(frame);
    };

    // Mientras se mantiene presionado (mouse o dedo) el avance se detiene; al
    // soltar con el dedo cede un instante más para no pelear con la inercia.
    const onDown = () => {
      tocando = true;
    };
    const onUp = (e: PointerEvent) => {
      tocando = false;
      if (e.pointerType === "touch")
        tactilHasta = performance.now() + TACTIL_MS;
    };
    const onScroll = () => ajustar();

    el.scrollLeft = 1;
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    const io = new IntersectionObserver(([entrada]) => {
      visible = entrada.isIntersecting;
    });
    io.observe(el);

    if (!reducido) raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div ref={ref} className="cinta-casos no-scrollbar" aria-label={etiqueta}>
      {children}
    </div>
  );
}

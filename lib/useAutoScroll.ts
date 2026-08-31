import { useEffect, useRef } from "react";

/**
 * Auto-desplaza un contenedor scrolleable hacia la derecha, en loop infinito.
 *
 * A diferencia de una animación con `transform`, esto mueve el scroll real del
 * contenedor, así que el usuario puede arrastrar, hacer swipe o usar el
 * trackpad mientras tanto. El movimiento se pausa mientras interactúa.
 *
 * Espera tres copias idénticas del contenido: se mantiene en la copia del medio
 * para poder avanzar y retroceder sin llegar nunca a un borde.
 */
export function useAutoScroll<T extends HTMLElement>(
  pixelsPerSecond = 24,
  deps: unknown[] = [],
) {
  const ref = useRef<T>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const setWidth = () => el.scrollWidth / 3;

    // Partir en la copia del medio.
    el.scrollLeft = setWidth();

    const wrap = () => {
      const width = setWidth();
      if (width <= 0) return;
      if (el.scrollLeft >= width * 2) el.scrollLeft -= width;
      else if (el.scrollLeft <= 0) el.scrollLeft += width;
    };

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;
    let last = performance.now();
    let carry = 0;

    const tick = (now: number) => {
      const elapsed = now - last;
      last = now;

      if (!pausedRef.current && !reducedMotion) {
        // Se acumulan las fracciones: scrollLeft redondea y si no, no avanza.
        carry += (pixelsPerSecond * elapsed) / 1000;
        const step = Math.floor(carry);
        if (step > 0) {
          carry -= step;
          el.scrollLeft += step;
        }
      }

      wrap();
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    const pause = () => {
      pausedRef.current = true;
    };
    const resume = () => {
      pausedRef.current = false;
    };

    // Al usar la rueda o soltar el dedo, se retoma tras un respiro.
    let resumeTimer: ReturnType<typeof setTimeout>;
    const pauseBriefly = () => {
      pause();
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(resume, 2000);
    };

    el.addEventListener("pointerenter", pause);
    el.addEventListener("pointerleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", pauseBriefly, { passive: true });
    el.addEventListener("wheel", pauseBriefly, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(resumeTimer);
      el.removeEventListener("pointerenter", pause);
      el.removeEventListener("pointerleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", pauseBriefly);
      el.removeEventListener("wheel", pauseBriefly);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pixelsPerSecond, ...deps]);

  return ref;
}

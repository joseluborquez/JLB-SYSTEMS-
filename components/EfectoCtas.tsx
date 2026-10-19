"use client";

import { useEffect } from "react";
import { adjuntarEstrella, type AjustesEstrella } from "@/lib/starBorder";

// Colores de StarBorder por tema: estrella blanca sobre fondo oscuro y
// estrella de tinta sobre fondo claro.
const OSCURO: AjustesEstrella = { color: [255, 255, 255], claro: false };
const CLARO: AjustesEstrella = { color: [24, 24, 27], claro: true };

// Los botones rellenos (.cta-estrella-relleno: blanco en oscuro, negro en
// claro) usan la luz opuesta: sobre su relleno, una estrella del mismo color
// no se vería. En el botón negro (tema claro) la estrella es blanca y más
// intensa: la mitad de su luz cae fuera del botón, sobre el fondo blanco, donde
// no se ve.
const NEGRO: AjustesEstrella = { ...OSCURO, fuerza: 1.9 };

const leerPara = (boton: HTMLElement) => () => {
  const temaClaro = document.documentElement.dataset.theme === "light";
  const relleno = boton.classList.contains("cta-estrella-relleno");
  if (temaClaro && relleno) return NEGRO;
  return temaClaro !== relleno ? CLARO : OSCURO;
};

/**
 * Aplica el efecto StarBorder (React Bits) a todo `.cta-estrella`, incluidos
 * los que aparecen después (navegación entre páginas, menú móvil). Un solo
 * observador para todo el sitio; cada botón recibe su canvas.
 */
export default function EfectoCtas() {
  useEffect(() => {
    const activos = new Map<Element, () => void>();

    const sincronizar = () => {
      for (const [elemento, limpiar] of activos) {
        if (!elemento.isConnected) {
          limpiar();
          activos.delete(elemento);
        }
      }
      document.querySelectorAll<HTMLElement>(".cta-estrella").forEach((boton) => {
        if (!activos.has(boton)) activos.set(boton, adjuntarEstrella(boton, leerPara(boton)));
      });
    };

    let pendiente = 0;
    const programar = () => {
      if (pendiente) return;
      pendiente = requestAnimationFrame(() => {
        pendiente = 0;
        sincronizar();
      });
    };

    sincronizar();
    const observador = new MutationObserver(programar);
    observador.observe(document.body, { childList: true, subtree: true });

    return () => {
      observador.disconnect();
      cancelAnimationFrame(pendiente);
      activos.forEach((limpiar) => limpiar());
      activos.clear();
    };
  }, []);

  return null;
}

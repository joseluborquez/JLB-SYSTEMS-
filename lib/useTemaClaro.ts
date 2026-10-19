"use client";

import { useEffect, useState } from "react";

/** Lee el tema que fija el script de layout.tsx y reacciona al botón de tema. */
export function useTemaClaro() {
  const [claro, setClaro] = useState(false);

  useEffect(() => {
    const leer = () =>
      setClaro(document.documentElement.dataset.theme === "light");
    leer();
    const observador = new MutationObserver(leer);
    observador.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observador.disconnect();
  }, []);

  return claro;
}

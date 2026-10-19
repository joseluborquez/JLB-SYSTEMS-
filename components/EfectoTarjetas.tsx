"use client";

import { useEffect } from "react";

// Efecto de MagicBento (React Bits, reactbits.dev) aplicado a toda
// `.tarjeta-flujo`: el borde se ilumina cerca del cursor (también en las
// tarjetas vecinas), una luz suave sigue al cursor dentro de la tarjeta y al
// hacer clic sale un anillo de luz que recorre la página. Los gradientes
// están en app/globals.css; aquí solo se calcula la posición del cursor.
// Se omiten del original las estrellas, la inclinación, el magnetismo y la
// animación de entrada.

const SELECTOR = ".tarjeta-flujo";
// Alcance del brillo del borde: coincide con --mb-border-size (+ margen).
const ALCANCE = 265;

type Estado = { calor: number; escrito: Record<string, string> };

export default function EfectoTarjetas() {
  useEffect(() => {
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const estados = new WeakMap<HTMLElement, Estado>();
    let tarjetas: HTMLElement[] = [];
    let cajas: DOMRect[] = [];
    let sucio = true;
    let raf = 0;
    let ultimo = 0;
    const puntero = { x: -1e5, y: -1e5, dentro: false };
    const luz = { x: -1e5, y: -1e5, cerca: 0, lista: false };
    const onda = { x: 0, y: 0, t: -1, duracion: 1.1, alcance: 1200 };

    const estadoDe = (el: HTMLElement) => {
      let estado = estados.get(el);
      if (!estado) {
        estado = { calor: 0, escrito: {} };
        estados.set(el, estado);
      }
      return estado;
    };

    const escribir = (el: HTMLElement, estado: Estado, nombre: string, valor: string) => {
      if (estado.escrito[nombre] === valor) return;
      estado.escrito[nombre] = valor;
      el.style.setProperty(nombre, valor);
    };

    const medir = () => {
      sucio = false;
      tarjetas = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
      cajas = tarjetas.map((el) => el.getBoundingClientRect());
    };

    const cuadro = (ahora: number) => {
      raf = 0;
      const dt = Math.min(0.05, (ahora - ultimo) / 1000 || 0);
      ultimo = ahora;
      if (sucio) medir();
      let ocupado = false;

      const cerca = puntero.dentro ? 1 : 0;
      if (!luz.lista && cerca) {
        luz.x = puntero.x;
        luz.y = puntero.y;
        luz.lista = true;
      }
      const seguir = reducido ? 1 : 1 - Math.exp(-dt / 0.05);
      luz.x += (puntero.x - luz.x) * seguir;
      luz.y += (puntero.y - luz.y) * seguir;
      const fundido = reducido ? 1 : 1 - Math.exp(-dt / (cerca > luz.cerca ? 0.12 : 0.4));
      luz.cerca += (cerca - luz.cerca) * fundido;
      if (Math.abs(cerca - luz.cerca) < 0.002) luz.cerca = cerca;
      else ocupado = true;
      if (Math.abs(puntero.x - luz.x) + Math.abs(puntero.y - luz.y) > 0.3) ocupado = true;

      let radioOnda = 0;
      let alfaOnda = 0;
      if (onda.t >= 0) {
        onda.t += dt;
        const avance = Math.min(1, onda.t / onda.duracion);
        radioOnda = onda.alcance * (1 - Math.pow(1 - avance, 2.2));
        alfaOnda = Math.pow(1 - avance, 1.3);
        if (avance >= 1) {
          onda.t = -1;
          alfaOnda = 0;
        } else ocupado = true;
      }

      const alto = window.innerHeight;
      tarjetas.forEach((el, i) => {
        const caja = cajas[i];
        // Fuera de pantalla no se calcula nada; al volver entra por scroll.
        if (caja.bottom < -ALCANCE || caja.top > alto + ALCANCE) return;
        const estado = estadoDe(el);
        const lx = luz.x - caja.left;
        const ly = luz.y - caja.top;
        const px = puntero.x - caja.left;
        const py = puntero.y - caja.top;
        const dentro =
          puntero.dentro && px >= 0 && py >= 0 && px <= caja.width && py <= caja.height;

        const objetivo = dentro ? 1 : 0;
        estado.calor +=
          (objetivo - estado.calor) *
          (reducido ? 1 : 1 - Math.exp(-dt / (objetivo > estado.calor ? 0.14 : 0.32)));
        if (Math.abs(objetivo - estado.calor) < 0.002) estado.calor = objetivo;
        else ocupado = true;

        // Distancia del cursor a la tarjeta: lejos, el borde no se ilumina.
        const dx = Math.max(caja.left - puntero.x, 0, puntero.x - caja.right);
        const dy = Math.max(caja.top - puntero.y, 0, puntero.y - caja.bottom);
        const alcanza = Math.hypot(dx, dy) < ALCANCE;

        escribir(el, estado, "--mb-x", `${lx.toFixed(1)}px`);
        escribir(el, estado, "--mb-y", `${ly.toFixed(1)}px`);
        escribir(el, estado, "--mb-near", (alcanza ? luz.cerca : 0).toFixed(3));
        escribir(el, estado, "--mb-hot", estado.calor.toFixed(3));
        escribir(el, estado, "--mb-wx", `${(onda.x - caja.left).toFixed(1)}px`);
        escribir(el, estado, "--mb-wy", `${(onda.y - caja.top).toFixed(1)}px`);
        escribir(el, estado, "--mb-wr", `${radioOnda.toFixed(1)}px`);
        escribir(el, estado, "--mb-wa", alfaOnda.toFixed(3));
      });

      if (ocupado) raf = requestAnimationFrame(cuadro);
    };

    const despertar = () => {
      if (raf) return;
      ultimo = performance.now();
      raf = requestAnimationFrame(cuadro);
    };

    const alMover = (evento: PointerEvent) => {
      if (evento.pointerType === "touch") return;
      puntero.x = evento.clientX;
      puntero.y = evento.clientY;
      puntero.dentro = true;
      despertar();
    };

    const alSalir = (evento: PointerEvent) => {
      if (evento.relatedTarget) return;
      puntero.dentro = false;
      despertar();
    };

    const alHacerClic = (evento: MouseEvent) => {
      const tarjeta = (evento.target as Element | null)?.closest<HTMLElement>(SELECTOR);
      if (!tarjeta || reducido) return;
      let x = evento.clientX;
      let y = evento.clientY;
      if (evento.detail === 0) {
        // Clic con teclado: el anillo sale del centro de la tarjeta.
        const caja = tarjeta.getBoundingClientRect();
        x = caja.left + caja.width / 2;
        y = caja.top + caja.height / 2;
      }
      onda.x = x;
      onda.y = y;
      onda.t = 0;
      onda.alcance =
        Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) + 140;
      despertar();
    };

    const invalidar = () => {
      sucio = true;
      despertar();
    };

    window.addEventListener("pointermove", alMover, { passive: true });
    window.addEventListener("scroll", invalidar, { passive: true, capture: true });
    window.addEventListener("resize", invalidar, { passive: true });
    document.addEventListener("pointerout", alSalir);
    document.addEventListener("click", alHacerClic);
    // Tarjetas nuevas (filtros, navegación entre páginas).
    const observador = new MutationObserver(invalidar);
    observador.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", alMover);
      window.removeEventListener("scroll", invalidar, { capture: true });
      window.removeEventListener("resize", invalidar);
      document.removeEventListener("pointerout", alSalir);
      document.removeEventListener("click", alHacerClic);
      observador.disconnect();
    };
  }, []);

  return null;
}

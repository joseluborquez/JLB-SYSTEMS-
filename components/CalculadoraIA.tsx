"use client";

import { useState } from "react";
import { card } from "@/lib/ui";
import {
  MODELOS,
  RESPUESTAS_POR_CONVERSACION_DEFAULT,
  estimarCostoMensual,
  type ModeloIA,
} from "@/lib/ia-calculadora";

function formatoUSD(valor: number): string {
  if (valor < 1) return `$${valor.toFixed(2)}`;
  return `$${valor.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export default function CalculadoraIA() {
  const [modelo, setModelo] = useState<ModeloIA>(MODELOS[0]);
  const [conversaciones, setConversaciones] = useState(300);

  const costoMensual = estimarCostoMensual(modelo, conversaciones);

  return (
    <div className={`${card} bg-surface p-6 sm:p-7`}>
      <p className="text-base font-medium tracking-[-0.01em] text-fg">
        Calculadora de consumo de IA
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        El consumo de IA va a costo, sin recargo mío. Elige el modelo y una
        estimación de conversaciones al mes para ver el orden de magnitud —
        es una aproximación, no una boleta.
      </p>

      <div className="mt-6 border-t border-border pt-6">
        <p className="text-xs font-medium tracking-[0.02em] text-dim uppercase">
          Modelo
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {MODELOS.map((m) => {
            const activo = m.modelo === modelo.modelo;
            return (
              <button
                key={m.modelo}
                type="button"
                onClick={() => setModelo(m)}
                aria-pressed={activo}
                className={`flex flex-col items-center gap-1.5 rounded-lg border px-2 py-3 text-center transition-colors duration-150 ${
                  activo
                    ? "border-border-hi bg-bg"
                    : "border-border hover:border-border-hi"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f5f5f5]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.logo} alt="" className="h-4 w-4" />
                </span>
                <span className="text-xs font-medium text-fg">
                  {m.proveedorNombre}
                </span>
                <span className="text-[11px] leading-tight text-dim">
                  {m.modeloNombre}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-6">
        <label htmlFor="conversaciones-mes" className="text-xs font-medium tracking-[0.02em] text-dim uppercase">
          Conversaciones al mes: {conversaciones.toLocaleString("es-CL")}
        </label>
        <input
          id="conversaciones-mes"
          type="range"
          min={50}
          max={3000}
          step={50}
          value={conversaciones}
          onChange={(e) => setConversaciones(Number(e.target.value))}
          className="mt-3 w-full accent-fg"
        />
      </div>

      <div className="mt-6 border-t border-border pt-6">
        <p className="font-mono text-2xl tracking-[-0.02em] text-fg">
          {formatoUSD(costoMensual)}
          <span className="ml-1 font-sans text-sm text-muted">USD/mes estimado</span>
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-dim">
          Asume ~{RESPUESTAS_POR_CONVERSACION_DEFAULT} respuestas del agente por
          conversación. No incluye mensajes de Meta ni transcripción de audio,
          que se cobran aparte y también a costo.
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { card } from "@/lib/ui";
import { estimarCostoMeta } from "@/lib/meta-calculadora";
import { RESPUESTAS_POR_CONVERSACION_DEFAULT } from "@/lib/ia-calculadora";

function formatoUSD(valor: number): string {
  if (valor < 1) return `$${valor.toFixed(2)}`;
  return `$${valor.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export default function CalculadoraMeta() {
  const [conversaciones, setConversaciones] = useState(300);
  const [recordatorios, setRecordatorios] = useState(0);
  const [categoria, setCategoria] = useState<"utility" | "marketing">("utility");

  const estimacion = estimarCostoMeta(
    conversaciones,
    RESPUESTAS_POR_CONVERSACION_DEFAULT,
    recordatorios,
    categoria,
  );

  return (
    <div className={`${card} bg-surface p-6 sm:p-7`}>
      <p className="text-base font-medium tracking-[-0.01em] text-fg">
        Calculadora de mensajes de Meta
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        Tarifas de Chile, a costo, sin recargo mío. Las respuestas del agente
        son gratis hasta el 30/09/2026 — desde el 1 de octubre Meta las cobra
        igual que a los recordatorios.
      </p>

      <div className="mt-6 border-t border-border pt-6">
        <label htmlFor="conversaciones-meta" className="text-xs font-medium tracking-[0.02em] text-dim uppercase">
          Conversaciones al mes: {conversaciones.toLocaleString("es-CL")}
        </label>
        <input
          id="conversaciones-meta"
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
        <label htmlFor="recordatorios-meta" className="text-xs font-medium tracking-[0.02em] text-dim uppercase">
          Recordatorios/seguimientos al mes: {recordatorios.toLocaleString("es-CL")}
        </label>
        <input
          id="recordatorios-meta"
          type="range"
          min={0}
          max={1000}
          step={25}
          value={recordatorios}
          onChange={(e) => setRecordatorios(Number(e.target.value))}
          className="mt-3 w-full accent-fg"
        />

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => setCategoria("utility")}
            className={`rounded-full border px-3 py-1 text-xs transition-colors duration-150 ${
              categoria === "utility"
                ? "border-border-hi bg-bg text-fg"
                : "border-border text-muted hover:border-border-hi"
            }`}
          >
            Recordatorio (utility)
          </button>
          <button
            type="button"
            onClick={() => setCategoria("marketing")}
            className={`rounded-full border px-3 py-1 text-xs transition-colors duration-150 ${
              categoria === "marketing"
                ? "border-border-hi bg-bg text-fg"
                : "border-border text-muted hover:border-border-hi"
            }`}
          >
            Seguimiento de venta (marketing)
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
        <div>
          <p className="text-xs text-dim uppercase tracking-[0.02em]">Hoy</p>
          <p className="font-mono text-xl tracking-[-0.02em] text-fg">
            {formatoUSD(estimacion.totalHoy)}
            <span className="ml-1 font-sans text-xs text-muted">USD/mes</span>
          </p>
        </div>
        <div>
          <p className="text-xs text-dim uppercase tracking-[0.02em]">Desde 01/10/2026</p>
          <p className="font-mono text-xl tracking-[-0.02em] text-fg">
            {formatoUSD(estimacion.totalDesdeOctubre)}
            <span className="ml-1 font-sans text-xs text-muted">USD/mes</span>
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-dim">
        Asume ~{RESPUESTAS_POR_CONVERSACION_DEFAULT} respuestas del agente por
        conversación. Tarifa oficial de Meta para el cambio de octubre
        pendiente de confirmación final — este valor puede ajustarse.
      </p>

      <p className="mt-2 text-xs leading-relaxed text-dim">
        Excepción: las conversaciones que empiezan desde un anuncio de Meta
        (clic a WhatsApp) tienen entrada gratuita — Meta ya cobró por el
        anuncio. Si tus leads vienen mayormente de ads, tu costo real queda
        por debajo de esta estimación.
      </p>
    </div>
  );
}

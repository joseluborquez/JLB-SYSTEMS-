# JLB Systems — landing

Landing page de JLB Systems SpA. El demo no está embebido: la sección Demo
invita a escribirle por WhatsApp al agente real de JLB Systems, que es el mismo
producto que se vende.

Next.js (App Router) · TypeScript · Tailwind CSS v4. Sin dependencias fuera del
framework.

## Instalar y correr

```bash
npm install
npm run dev    # http://localhost:3000
```

No hay variables de entorno. Es un sitio estático: no hay rutas de API, ni base
de datos, ni claves que rotar.

## Todo lo editable: `lib/config.ts`

Nombres, links y contacto viven en un solo archivo. Ningún componente tiene
datos escritos a mano.

| Campo | Valor actual | Dónde aparece |
|---|---|---|
| `numero` | `12082485778` | base de los dos links de WhatsApp |
| `whatsapp` | prellena "Hola, vengo de la web" | hero, precios, cierre |
| `whatsappDemo` | prellena "Hola, quiero probar el agente" | sección Demo |
| `calendario` | link de Google Calendar | navbar, cierre |
| `marca` | `JLB Systems` | logotipo de navbar y footer |
| `empresa` | `JLB Systems SpA` | cabecera del chat del Demo |
| `email` | `contacto@nocodejose.com` | footer |

**El número va sin `+`, espacios ni guiones.** `+1 208-248-5778` se escribe
`12082485778`. Los dos links se arman solos a partir de él, con mensajes
distintos para que puedas separar en tu bandeja quién viene a probar el agente
de quién viene a comprar.

El campo se llama `calendario` y no `googlecalendar` a propósito: cambiar de
herramienta de agendamiento no debería obligar a tocar los componentes.

## La conversación de la sección Demo

`components/Demo.tsx` arranca con un arreglo `conversacion` que se muestra como
vista previa. **Reemplázalo por una transcripción real** de tu agente
(anonimizada) y cambia la etiqueta del pie de "Conversación de ejemplo" a
"Conversación real". Una conversación auténtica convence mucho más.

Dos cosas que deben mantenerse sincronizadas con la realidad, o el visitante lo
nota en treinta segundos:

- **Los precios del ejemplo deben calzar** con lo que responde tu agente de
  verdad y con la sección Precios. Viven en TRES lugares y hay que cambiarlos
  juntos: `components/Planes.tsx`, la conversación de `components/Demo.tsx`, y
  el prompt del agente en el repo del CRM (`kapso/agente-prompt.md`), que los
  cita de memoria.

  Hoy son tres tramos: **$450 + $220/mes**, **$590 + $390/mes** y
  **$1.400 + $890/mes**. El modelo de costos que los justifica está en
  `CRM-lead-to-customer/COSTOS.md`.
- Las preguntas sugeridas deben ser preguntas que tu agente sepa responder.

## Temas claro y oscuro

Por defecto sigue la preferencia del sistema. El botón de la navbar alterna
manualmente y guarda la elección en `localStorage` (`jlb-tema`), que desde ahí
manda por sobre el sistema.

Los colores no se repiten por tema en cada componente: los tokens de Tailwind
(`--color-bg`, `--color-fg`, …) apuntan a variables `--jlb-*` que se redefinen
en `app/globals.css` según `[data-theme]`. Para ajustar una paleta, editas un
solo bloque.

Dos detalles que conviene no romper al editar:

- `app/layout.tsx` inyecta un script inline que fija `data-theme` **antes** del
  primer paint. Sin él la página aparece con el tema equivocado y salta.
- Las reglas base (`html`, `body`, `a`, `:focus-visible`) van dentro de
  `@layer base`. Escritas fuera de una capa le ganarían a las utilidades de
  Tailwind, y `a { color: inherit }` dejaría los botones primarios con el texto
  invisible.

El botón primario usa `bg-accent` / `text-accent-fg`, que se invierten con el
tema: blanco sobre negro en oscuro, negro sobre blanco en claro.

## Estructura

```
app/
  layout.tsx     fuentes Geist + metadata + script de tema
  page.tsx       importa las 7 secciones en orden
  globals.css    tokens de color, paletas por tema y reglas base
components/      un componente por sección, más Eyebrow, Reticula y ThemeToggle
lib/
  config.ts      links, marca y contacto (ver tabla más arriba)
  ui.ts          clases compartidas (botones, contenedor, titular, tarjeta)
docs/
  estructura-de-costos.md   documento interno de costos y topes por cliente
```

`Reticula` es la decoración de fondo (líneas verticales + cruces) que usan el
hero y el cierre. `Eyebrow` es la etiqueta pequeña sobre cada titular.

## Build

```bash
npm run build
```

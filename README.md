# JLB Systems — landing

Sitio de JLB Systems SpA. El demo no está embebido: la sección Demo
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
| `email` | `nocodejose@gmail.com` | footer |

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

El sitio vende una **auditoría de flujos** con módulos a elección y traspaso de
autonomía. Es una portada única de ocho secciones; cada sección responde una
pregunta y todo termina en agendar una conversación de 30 minutos.

```
app/
  page.tsx                 portada: Hero, Dos puertas, Cómo funciona, Soluciones,
                           Capacitación,
                           Casos + testimonios, Quién + Preguntas, Cierre
  soluciones/agentes-whatsapp/   demo, planes y calculadoras del agente
  casos/ y casos/[id]/     casos con filtro por módulo
  resena/                  formulario de reseñas (Supabase)
components/                una pieza por sección; EfectoTarjetas y EfectoCtas
                           aplican los efectos de tarjetas y botones
lib/
  config.ts                links, marca, contacto y nombres del servicio
  auditoria.ts             pasos y preguntas frecuentes
  modulos.ts               catálogo de módulos (sin precios)
  proyectos.ts             casos; `modulo` los clasifica
```

Las páginas que antes eran `/auditoria`, `/soluciones`, `/metodo`, `/precios` y
`/recursos` redirigen (307) a sus secciones de la portada, y `/agentes-ia` y
`/proyecto/:id` a sus rutas nuevas (`next.config.ts`).

## Pendientes de contenido

- **El precio de la auditoría no se publica**; solo se define en la
  conversación de alcance. Los módulos muestran rangos "desde".
- Los nombres del servicio (`config.servicio`, `config.acompanamiento`) son
  provisorios.
- Los casos usan el texto antiguo. Para el formato nuevo, completar en
  `lib/proyectos.ts` los campos opcionales `medido`, `autonomia` y
  `testimonio`: la página del caso los muestra solo si existen.
- Los precios del agente (`components/Planes.tsx`, `components/Demo.tsx` y el
  prompt del agente) no se han alineado con la oferta nueva.
- Se retiró la página de Recursos (taller, Skool, contenido de NoCode José):
  no había links reales. Si se retoma, necesita las URLs.

## Build

```bash
npm run build
```

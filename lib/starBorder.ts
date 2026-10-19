// Motor de StarBorder (React Bits, reactbits.dev), extraído del componente
// para aplicarlo a los botones del sitio, que son <a>, <Link> y <button> con
// estilos propios (btnPrimary / btnSecondary en lib/ui.ts). Una estrella de
// luz recorre el borde del botón; al pasar el cursor o enfocar con teclado da
// una vuelta rápida, y al hacer clic sale un destello. Versión reducida: sin
// destellos de polvo (sparkle), sin los modos "brighten" y "reveal" y con una
// sola estrella.

export interface AjustesEstrella {
  /** Color de la estrella y su estela, [r, g, b]. */
  color: [number, number, number];
  /** Tema claro: la luz es oscura y el brillo, más suave. */
  claro: boolean;
  /** Intensidad de la estrella: grosor de la estela y brillo. 1 = normal. */
  fuerza?: number;
}

const BLEED = 48;
const LAP = 0.9;
const TAU = Math.PI * 2;
const WHITE: [number, number, number] = [255, 255, 255];

// Valores de StarBorder usados en el sitio.
const DURACION = 4; // segundos por vuelta
const GROSOR = 1; // px
const LARGO_ESTELA = 0.3; // fracción del borde
const BRILLO = 0.6;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const wrap = (value: number, total: number) => ((value % total) + total) % total;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (2 - 2 * t) ** 3 / 2);
type Rgb = [number, number, number];
const mix = (a: Rgb, b: Rgb, t: number): Rgb => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t
];
const rgba = (rgb: Rgb, alpha: number) =>
  `rgba(${Math.round(rgb[0])}, ${Math.round(rgb[1])}, ${Math.round(rgb[2])}, ${clamp(alpha, 0, 1).toFixed(3)})`;

interface Segmento {
  length: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  angle: number | null;
}

interface Contorno {
  r: number;
  segments: Segmento[];
  total: number;
}

const outline = (width: number, height: number, radius: number): Contorno => {
  const r = Math.max(0, Math.min(radius, width / 2, height / 2));
  const arc = (Math.PI * r) / 2;
  const across = Math.max(0, width - 2 * r);
  const down = Math.max(0, height - 2 * r);
  const segments: Segmento[] = [
    { length: across, x: r, y: 0, dx: 1, dy: 0, angle: null },
    { length: arc, x: width - r, y: r, dx: 0, dy: 0, angle: -Math.PI / 2 },
    { length: down, x: width, y: r, dx: 0, dy: 1, angle: null },
    { length: arc, x: width - r, y: height - r, dx: 0, dy: 0, angle: 0 },
    { length: across, x: width - r, y: height, dx: -1, dy: 0, angle: null },
    { length: arc, x: r, y: height - r, dx: 0, dy: 0, angle: Math.PI / 2 },
    { length: down, x: 0, y: height - r, dx: 0, dy: -1, angle: null },
    { length: arc, x: r, y: r, dx: 0, dy: 0, angle: Math.PI }
  ];
  return {
    r,
    segments,
    total: Math.max(
      1,
      segments.reduce((sum, segment) => sum + segment.length, 0)
    )
  };
};

interface Punto {
  x: number;
  y: number;
  nx: number;
  ny: number;
}

const pointAt = (shape: Contorno, distance: number, point: Punto) => {
  let s = wrap(distance, shape.total);
  for (const segment of shape.segments) {
    if (segment.length > 0 && s <= segment.length) {
      if (segment.angle === null) {
        point.x = segment.x + segment.dx * s;
        point.y = segment.y + segment.dy * s;
        point.nx = segment.dy;
        point.ny = -segment.dx;
      } else {
        const angle = segment.angle + s / shape.r;
        point.nx = Math.cos(angle);
        point.ny = Math.sin(angle);
        point.x = segment.x + point.nx * shape.r;
        point.y = segment.y + point.ny * shape.r;
      }
      return point;
    }
    s -= segment.length;
  }
  return point;
};

const project = (shape: Contorno, px: number, py: number) => {
  let best = Infinity;
  let found = 0;
  let offset = 0;
  shape.segments.forEach(segment => {
    if (segment.length > 0) {
      let s = 0;
      let x = 0;
      let y = 0;
      if (segment.angle === null) {
        s = clamp((px - segment.x) * segment.dx + (py - segment.y) * segment.dy, 0, segment.length);
        x = segment.x + segment.dx * s;
        y = segment.y + segment.dy * s;
      } else {
        let angle = wrap(Math.atan2(py - segment.y, px - segment.x) - segment.angle, TAU);
        if (angle > Math.PI / 2) angle = angle > Math.PI * 1.25 ? 0 : Math.PI / 2;
        s = angle * shape.r;
        x = segment.x + Math.cos(segment.angle + angle) * shape.r;
        y = segment.y + Math.sin(segment.angle + angle) * shape.r;
      }
      const distance = (px - x) ** 2 + (py - y) ** 2;
      if (distance < best) {
        best = distance;
        found = offset + s;
      }
    }
    offset += segment.length;
  });
  return found;
};

/**
 * Agrega el canvas de la estrella al botón y lo anima. Devuelve la función de
 * limpieza. `leer` se consulta en cada cuadro, así el tema puede cambiar en
 * vivo.
 *
 * El botón necesita position: relative (para que el canvas se ancle a él y no
 * a la sección de la portada) e isolation: isolate (para que el canvas quede
 * bajo el texto). Se fijan aquí, inline y con !important, en vez de depender
 * solo de la clase .cta-estrella: si esa hoja de estilos llega desactualizada
 * al navegador, la estrella igual queda sobre el botón.
 */
export function adjuntarEstrella(root: HTMLElement, leer: () => AjustesEstrella) {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = `position:absolute;top:-${BLEED}px;left:-${BLEED}px;z-index:-1;width:calc(100% + ${BLEED * 2}px);height:calc(100% + ${BLEED * 2}px);pointer-events:none;`;
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};
  const previo = { position: root.style.position, isolation: root.style.isolation };
  if (getComputedStyle(root).position === 'static') root.style.setProperty('position', 'relative', 'important');
  root.style.setProperty('isolation', 'isolate', 'important');
  root.appendChild(canvas);

  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const point: Punto = { x: 0, y: 0, nx: 0, ny: -1 };
  const state = {
    width: 0,
    height: 0,
    dpr: 1,
    radius: 0,
    phase: 0,
    velocity: 0,
    motion: 0,
    lap: -1,
    time: 0,
    flash: 0,
    visible: false
  };
  const pulses: { origin: number; age: number }[] = [];
  let raf = 0;
  let last = performance.now();
  let alive = true;

  const measure = () => {
    state.width = root.offsetWidth;
    state.height = root.offsetHeight;
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);
    state.radius = parseFloat(getComputedStyle(root).borderTopLeftRadius) || 0;
    canvas.width = Math.max(1, Math.round((state.width + BLEED * 2) * state.dpr));
    canvas.height = Math.max(1, Math.round((state.height + BLEED * 2) * state.dpr));
    wake();
  };

  const local = (event: PointerEvent): [number, number] => {
    const rect = root.getBoundingClientRect();
    const scaleX = rect.width ? state.width / rect.width : 1;
    const scaleY = rect.height ? state.height / rect.height : 1;
    return [(event.clientX - rect.left) * scaleX, (event.clientY - rect.top) * scaleY];
  };

  const shapeFor = () =>
    outline(
      Math.max(1, state.width - GROSOR),
      Math.max(1, state.height - GROSOR),
      state.radius - GROSOR / 2
    );

  const stroke = (x1: number, y1: number, x2: number, y2: number, width: number, style: string) => {
    ctx.lineWidth = width;
    ctx.strokeStyle = style;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };

  const drawTrail = (
    s: AjustesEstrella,
    shape: Contorno,
    head: number,
    length: number,
    sign: number,
    intensity: number,
    tip = true
  ) => {
    if (length < 0.5 || intensity <= 0) return;
    const steps = clamp(Math.ceil(length / 2), 2, 90);
    pointAt(shape, head, point);
    let px = point.x;
    let py = point.y;
    for (let i = 1; i <= steps; i++) {
      pointAt(shape, head - sign * length * (i / steps), point);
      const u = 1 - (i - 0.5) / steps;
      const fade = u * u * intensity;
      let tone = s.color;
      if (!s.claro) tone = mix(tone, WHITE, u ** 6 * 0.65);
      ctx.lineCap = tip && i === 1 ? 'round' : 'butt';
      const f = s.fuerza ?? 1;
      stroke(px, py, point.x, point.y, (2 + 6 * BRILLO) * f, rgba(tone, fade * (s.claro ? 0.1 : 0.2) * BRILLO * f));
      stroke(px, py, point.x, point.y, GROSOR * f, rgba(tone, fade));
      px = point.x;
      py = point.y;
    }
  };

  const drawHead = (s: AjustesEstrella, x: number, y: number, intensity: number) => {
    if (intensity <= 0) return;
    const reach = (12 + 40 * BRILLO) * (s.claro ? 0.6 : 1);
    const bloom = ctx.createRadialGradient(x, y, 0, x, y, reach);
    const strength = (s.claro ? 0.08 : 0.4) * BRILLO * intensity * (s.fuerza ?? 1);
    bloom.addColorStop(0, rgba(s.color, strength));
    bloom.addColorStop(0.2, rgba(s.color, strength * 0.4));
    bloom.addColorStop(0.5, rgba(s.color, strength * 0.1));
    bloom.addColorStop(1, rgba(s.color, 0));
    ctx.fillStyle = bloom;
    ctx.fillRect(x - reach, y - reach, reach * 2, reach * 2);
  };

  const draw = (s: AjustesEstrella, shape: Contorno) => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (state.width < 2 || state.height < 2) return;
    const offset = (BLEED + GROSOR / 2) * state.dpr;
    ctx.setTransform(state.dpr, 0, 0, state.dpr, offset, offset);
    ctx.globalCompositeOperation = s.claro ? 'source-over' : 'lighter';
    ctx.lineCap = 'butt';

    const total = shape.total;
    const speed = Math.abs(state.motion);
    const sign = state.motion >= 0 ? 1 : -1;
    const span = LARGO_ESTELA * DURACION;
    const length = Math.min(speed * span, total * 0.6);
    const intensity = 1 + 0.6 * state.flash;

    const ring = state.flash * (s.claro ? 0.18 : 0.32);
    if (ring > 0.005) {
      ctx.lineWidth = GROSOR + 2 * BRILLO;
      ctx.strokeStyle = rgba(s.color, ring);
      ctx.beginPath();
      ctx.roundRect(
        0,
        0,
        Math.max(1, state.width - GROSOR),
        Math.max(1, state.height - GROSOR),
        Math.max(0, shape.r)
      );
      ctx.stroke();
    }

    // Con movimiento reducido la estrella queda quieta con una estela corta.
    const still = clamp(1 - speed / Math.max(1, (total / DURACION) * 0.6), 0, 1) * Math.min(1, intensity);
    const rest = (10 + 14 * BRILLO + GROSOR * 2) * still;
    const head = state.phase;
    drawTrail(s, shape, head, length, sign, Math.min(1, intensity));
    if (still > 0.01) {
      drawTrail(s, shape, head, rest, 1, still, false);
      drawTrail(s, shape, head, rest, -1, still, false);
    }

    pulses.forEach(pulse => {
      const progress = pulse.age / 0.65;
      const fade = (1 - progress) ** 2;
      const travel = (total / 2) * (1 - (1 - Math.min(1, pulse.age / 0.5)) ** 2);
      const tail = Math.min(travel, total * 0.16);
      [1, -1].forEach(way => {
        const front = pulse.origin + way * travel;
        drawTrail(s, shape, front, tail, way, fade);
        pointAt(shape, front, point);
        drawHead(s, point.x, point.y, fade * 0.8);
      });
    });

    pointAt(shape, state.phase, point);
    drawHead(s, point.x, point.y, Math.min(1.3, intensity));
  };

  const frame = (now: number) => {
    raf = 0;
    if (!alive) return;
    const s = leer();
    const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
    last = now;
    state.time += dt;

    const shape = shapeFor();
    const total = shape.total;
    const cruise = reduce ? 0 : total / DURACION;

    state.flash *= Math.exp(-dt / 0.22);
    state.velocity += (cruise - state.velocity) * (1 - Math.exp(-dt / 0.45));
    let extra = 0;
    if (state.lap >= 0) {
      const before = ease(Math.min(1, state.lap / LAP));
      state.lap += dt;
      extra = (ease(Math.min(1, state.lap / LAP)) - before) * total;
      if (state.lap >= LAP) state.lap = -1;
    }
    state.motion = state.velocity + extra / dt;
    state.phase = wrap(state.phase + state.velocity * dt + extra, total);

    for (let i = pulses.length - 1; i >= 0; i--) {
      pulses[i].age += dt;
      if (pulses[i].age >= 0.65) pulses.splice(i, 1);
    }

    draw(s, shape);

    const settling = state.flash > 0.01 || pulses.length > 0;
    const moving = Math.abs(state.motion) > 0.05 || cruise !== 0 || state.lap >= 0;
    if (state.visible && (settling || moving)) raf = requestAnimationFrame(frame);
  };

  const wake = () => {
    if (raf || !alive || !state.visible) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  };

  const onEnter = () => {
    if (state.lap < 0 && !reduce) state.lap = 0;
    wake();
  };
  const pulse = (origin: number) => {
    pulses.push({ origin, age: 0 });
    if (pulses.length > 4) pulses.shift();
    state.flash = 1;
    wake();
  };
  const onDown = (event: PointerEvent) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    const [x, y] = local(event);
    pulse(project(shapeFor(), x - GROSOR / 2, y - GROSOR / 2));
  };
  const onClick = (event: MouseEvent) => {
    if (event.detail === 0) pulse(state.phase);
  };
  const onFocus = () => {
    if (root.matches(':focus-visible') && state.lap < 0 && !reduce) state.lap = 0;
    wake();
  };

  const resizeObserver = new ResizeObserver(measure);
  resizeObserver.observe(root);
  const visibility = new IntersectionObserver(entries => {
    state.visible = entries.some(entry => entry.isIntersecting);
    if (state.visible) wake();
  });
  visibility.observe(root);
  root.addEventListener('pointerenter', onEnter);
  root.addEventListener('pointerdown', onDown);
  root.addEventListener('click', onClick);
  root.addEventListener('focus', onFocus);
  measure();

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    resizeObserver.disconnect();
    visibility.disconnect();
    root.removeEventListener('pointerenter', onEnter);
    root.removeEventListener('pointerdown', onDown);
    root.removeEventListener('click', onClick);
    root.removeEventListener('focus', onFocus);
    canvas.remove();
    root.style.position = previo.position;
    root.style.isolation = previo.isolation;
  };
}

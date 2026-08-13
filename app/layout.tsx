import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JLB Systems — Agentes de WhatsApp a medida",
  description:
    "Agentes de IA para WhatsApp construidos a medida para negocios de servicios en LATAM. Responden en segundos, resuelven dudas, califican y agendan.",
};

// Corre antes del primer paint para que la página no aparezca con el tema
// equivocado y después salte. Por eso va inline y no en un componente.
const scriptTema = `
(function () {
  try {
    var guardado = localStorage.getItem('jlb-tema');
    var tema =
      guardado === 'light' || guardado === 'dark'
        ? guardado
        : window.matchMedia('(prefers-color-scheme: light)').matches
          ? 'light'
          : 'dark';
    document.documentElement.dataset.theme = tema;
  } catch (e) {
    document.documentElement.dataset.theme = 'dark';
  }
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      // El script de arriba escribe data-theme antes de hidratar.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
      </head>
      <body className="flex min-h-full flex-col bg-bg text-fg">{children}</body>
    </html>
  );
}

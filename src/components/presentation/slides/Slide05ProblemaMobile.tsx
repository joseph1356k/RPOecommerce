"use client";
import ProblemSlide from "./ProblemSlide";

export default function Slide05ProblemaMobile() {
  return (
    <ProblemSlide
      number="02"
      area="Mobile UX"
      title="Una versión encogida"
      italicTail="del desktop."
      why="80%+ del tráfico llega de Instagram, TikTok y WhatsApp. Touch targets pequeños, sin búsqueda mobile, sin bottom sheet de filtros, hero 100vh sin safe-area: cada uno es una fuga silenciosa."
      beforeText="Drawer básico, sin búsqueda, filtros en sidebar lateral, quick-add solo en hover, inputs sin font-size 16px (zoom forzado en iOS)."
      afterText="Drawer estructurado por intención, búsqueda overlay con sugerencias, filtros bottom sheet con drag handle, quick-add visible siempre, 44×44 touch targets."
      metric="−42%"
      metricLabel="Reducción esperada de abandono mobile"
    />
  );
}

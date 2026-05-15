"use client";
import ProblemSlide from "./ProblemSlide";

export default function Slide07ProblemaEmbudo() {
  return (
    <ProblemSlide
      number="04"
      area="Conversión"
      title="El embudo pierde"
      italicTail="sin que se note."
      why='Sin barra de envío gratis, sin "completa tu look", sin back-in-stock, sin recuperación de carrito. La visita más costosa es la que ya está dentro y se va sin comprar.'
      beforeText='Carrito = lista de productos. Producto agotado = página muerta. Sin recompra. Sin remarketing. La intención se pierde silenciosamente.'
      afterText='Cart drawer con free-shipping bar + cross-sell. Back-in-stock con captura de WhatsApp/email. Wishlist persistente. Exit intent ético.'
      metric="+80"
      metricLabel="Pedidos mensuales recuperados"
    />
  );
}

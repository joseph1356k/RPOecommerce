"use client";
import ProblemSlide from "./ProblemSlide";

export default function Slide06ProblemaProducto() {
  return (
    <ProblemSlide
      number="03"
      area="Producto"
      title="La PDP informa,"
      italicTail="no convence."
      why='Al decir solo "talla única en negro" perdemos la pregunta clave: ¿cómo se siente, a qué cuerpo le queda, para qué sirve? La duda mata el add-to-cart.'
      beforeText='"Talla única. Disponible en varios colores."'
      afterText='Story emocional + 4 features técnicos (sujeción, pretina, costuras, cobertura) + chips "hecho para" + reseñas verificadas con ciudad.'
      metric="+38%"
      metricLabel="Add-to-cart rate proyectado"
    />
  );
}

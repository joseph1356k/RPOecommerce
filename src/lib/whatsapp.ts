/**
 * WhatsApp helper — builds tracked URLs with contextual prefilled messages.
 *
 * Update WHATSAPP_NUMBER once RPO confirms the number.
 */
export const WHATSAPP_NUMBER = "573000000000";

type Ctx =
  | { kind: "general" }
  | { kind: "product"; title: string; color?: string }
  | { kind: "fit"; title?: string }
  | { kind: "stock"; title: string; city?: string }
  | { kind: "look"; title?: string };

function compose(ctx: Ctx): string {
  switch (ctx.kind) {
    case "product":
      return `Hola RPO 👋 Estoy viendo *${ctx.title}*${
        ctx.color ? ` en color ${ctx.color}` : ""
      } y quiero ayuda para elegir.`;
    case "fit":
      return `Hola RPO 👋 Quiero asesoría de ajuste${
        ctx.title ? ` para *${ctx.title}*` : ""
      }. ¿Me ayudan?`;
    case "stock":
      return `Hola RPO 👋 Quiero saber si tienen disponible *${ctx.title}*${
        ctx.city ? ` en ${ctx.city}` : ""
      }.`;
    case "look":
      return `Hola RPO 👋 Quiero ayuda para armar un look${
        ctx.title ? ` con *${ctx.title}*` : ""
      }. ¿Me asesoran?`;
    case "general":
    default:
      return "Hola RPO 👋 Quiero ayuda con mi compra.";
  }
}

export function whatsappUrl(ctx: Ctx = { kind: "general" }): string {
  const text = encodeURIComponent(compose(ctx));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

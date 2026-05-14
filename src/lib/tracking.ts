/**
 * Tracking shim compatible with GTM / GA4 / Meta Pixel.
 * Pushes events to window.dataLayer when available; no-ops on the server.
 *
 * Recommended GA4 events used in this app:
 *   view_item, add_to_cart, remove_from_cart, begin_checkout, purchase,
 *   add_to_wishlist, remove_from_wishlist, view_item_list,
 *   select_item, login, sign_up, generate_lead
 *
 * Custom events:
 *   rpo_quick_add, rpo_quick_view, rpo_filter_change, rpo_sort_change,
 *   rpo_quiz_start, rpo_quiz_complete, rpo_back_in_stock_submit,
 *   rpo_whatsapp_click, rpo_complete_look_add, rpo_recently_viewed_click,
 *   rpo_club_signup, rpo_store_locator_click
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: string, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...payload });
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.debug("[track]", event, payload ?? {});
    }
  } catch {
    /* swallow */
  }
}

export function trackPageView(path: string) {
  track("page_view", { page_path: path });
}

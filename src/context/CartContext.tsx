"use client";
import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import type { Product } from "@/types";
import { track } from "@/lib/tracking";

export interface CartItem {
  id: string;
  product: Product;
  qty: number;
  color?: string;
}

interface CartState {
  items: CartItem[];
}

type Action =
  | { type: "HYDRATE"; items: CartItem[] }
  | { type: "ADD"; product: Product; qty?: number; color?: string }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; qty: number }
  | { type: "CLEAR" };

const FREE_SHIPPING_THRESHOLD = 500_000;
const STORAGE_KEY = "rpo:cart";

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items };
    case "ADD": {
      const lineId = `${action.product.id}__${action.color ?? "default"}`;
      const existing = state.items.find((i) => i.id === lineId);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === lineId ? { ...i, qty: i.qty + (action.qty ?? 1) } : i
          ),
        };
      }
      return {
        items: [
          ...state.items,
          { id: lineId, product: action.product, qty: action.qty ?? 1, color: action.color },
        ],
      };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "SET_QTY":
      return {
        items: state.items
          .map((i) => (i.id === action.id ? { ...i, qty: Math.max(0, action.qty) } : i))
          .filter((i) => i.qty > 0),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  freeShippingGap: number;
  freeShippingProgress: number;
  freeShippingUnlocked: boolean;
  isOpen: boolean;
  hydrated: boolean;
  add: (product: Product, opts?: { qty?: number; color?: string }) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const items = JSON.parse(raw) as CartItem[];
        if (Array.isArray(items)) dispatch({ type: "HYDRATE", items });
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // Persist
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* ignore */
    }
  }, [state.items, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.reduce((s, i) => s + i.qty, 0);
    const subtotal = state.items.reduce(
      (s, i) => s + (i.product.priceValue ?? 0) * i.qty,
      0
    );
    const freeShippingGap = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
    const freeShippingProgress = Math.min(1, subtotal / FREE_SHIPPING_THRESHOLD);
    return {
      items: state.items,
      count,
      subtotal,
      freeShippingGap,
      freeShippingProgress,
      freeShippingUnlocked: freeShippingGap === 0 && subtotal > 0,
      isOpen,
      hydrated,
      add: (product, opts) => {
        dispatch({ type: "ADD", product, qty: opts?.qty, color: opts?.color });
        track("add_to_cart", {
          item_id: product.id,
          item_name: product.title,
          item_category: product.type,
          item_collection: product.collection,
          price: product.priceValue,
          quantity: opts?.qty ?? 1,
        });
        setOpen(true);
      },
      remove: (id) => {
        const item = state.items.find((i) => i.id === id);
        if (item) {
          track("remove_from_cart", {
            item_id: item.product.id,
            item_name: item.product.title,
            price: item.product.priceValue,
            quantity: item.qty,
          });
        }
        dispatch({ type: "REMOVE", id });
      },
      setQty: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
      clear: () => dispatch({ type: "CLEAR" }),
      openDrawer: () => setOpen(true),
      closeDrawer: () => setOpen(false),
    };
  }, [state.items, isOpen, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export { FREE_SHIPPING_THRESHOLD };

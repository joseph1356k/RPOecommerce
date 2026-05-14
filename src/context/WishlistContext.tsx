"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { track } from "@/lib/tracking";

const STORAGE_KEY = "rpo:wishlist";

interface WishlistContextValue {
  ids: string[];
  count: number;
  hydrated: boolean;
  has: (id: string) => boolean;
  toggle: (id: string, meta?: { title?: string }) => void;
  clear: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setIds(parsed);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      /* ignore */
    }
  }, [ids, hydrated]);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback(
    (id: string, meta?: { title?: string }) => {
      setIds((prev) => {
        if (prev.includes(id)) {
          track("remove_from_wishlist", { item_id: id, item_name: meta?.title });
          return prev.filter((x) => x !== id);
        }
        track("add_to_wishlist", { item_id: id, item_name: meta?.title });
        return [...prev, id];
      });
    },
    []
  );

  const value = useMemo<WishlistContextValue>(
    () => ({ ids, count: ids.length, hydrated, has, toggle, clear: () => setIds([]) }),
    [ids, hydrated, has, toggle]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}

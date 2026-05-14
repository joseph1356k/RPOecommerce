"use client";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import CartDrawer from "./CartDrawer";
import ExitIntentModal from "./ExitIntentModal";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        {children}
        <CartDrawer />
        <ExitIntentModal />
      </WishlistProvider>
    </CartProvider>
  );
}

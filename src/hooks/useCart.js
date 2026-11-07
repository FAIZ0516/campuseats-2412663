import { useContext } from "react";
import { CartContext } from "../context/cart-context.js";

export function useCart() {
  const context = useContext(CartContext);

  // null means there is no <CartProvider> above this component
  if (context === null) {
    throw new Error("useCart() must be used inside <CartProvider>");
  }

  return context;
}

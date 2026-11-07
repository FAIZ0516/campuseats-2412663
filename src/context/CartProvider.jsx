import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { CartContext } from "./cart-context.js";

// Owns the cart and the list of past orders. Both are saved in
// localStorage, so a refresh does not empty the cart.
function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage("campuseats-cart", []);
  const [orders, setOrders] = useLocalStorage("campuseats-orders", []);

  // derived from the cart on every render, not stored
  const count = cart.reduce((sum, line) => sum + line.qty, 0);
  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0);

  function addToCart(item) {
    setCart((prevCart) => {
      const existing = prevCart.find((line) => line.item.id === item.id);

      if (existing) {
        return prevCart.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line,
        );
      }

      return [...prevCart, { item, qty: 1 }];
    });
  }

  function changeQty(itemId, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line,
        )
        .filter((line) => line.qty > 0),
    );
  }

  function removeFromCart(itemId) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId));
  }

  // details = { name, mahallah, pickupTime } from the checkout form
  function placeOrder(details) {
    const order = {
      id: Date.now(),
      ...details,
      items: cart,
      total,
      placedAt: new Date().toISOString(),
    };

    setOrders((prevOrders) => [order, ...prevOrders]); // newest first
    setCart([]);
  }

  const value = {
    cart,
    orders,
    count,
    total,
    addToCart,
    changeQty,
    removeFromCart,
    placeOrder,
  };

  return <CartContext value={value}>{children}</CartContext>;
}

export default CartProvider;

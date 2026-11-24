import { startTransition, useState } from "react";
import { Link, useNavigate } from "react-router";
import CartItem from "../components/CartItem.jsx";
import CheckoutForm from "../components/CheckoutForm.jsx";
import { useCart } from "../hooks/useCart.js";
import { useAuth } from "../hooks/useAuth.js";
import { placeOrders } from "../services/orders.js";

function CartPage() {
  const { cart, total, changeQty, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // CheckoutForm only calls this when all three fields are valid.
  async function handlePlaceOrder(details) {
    setError("");
    try {
      await placeOrders(user, cart, details);
      startTransition(() => {
        clearCart();
        navigate("/orders");
      });
    } catch (err) {
      setError(`Could not place the order: ${err.message}`);
    }
  }

  if (cart.length === 0) {
    return (
      <>
        <h2 className="section-title">Your cart</h2>
        <p className="muted">
          Your cart is empty.{" "}
          <Link to="/">Pick something from a menu first.</Link>
        </p>
      </>
    );
  }

  return (
    <>
      <h2 className="section-title">Your cart</h2>
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
      <div className="cart-layout">
        <div className="card">
          <ul className="cart-list">
            {cart.map((line) => (
              <CartItem
                key={line.item.id}
                line={line}
                onChangeQty={changeQty}
                onRemove={removeFromCart}
              />
            ))}
          </ul>
          <p className="cart-total">Total: RM {total.toFixed(2)}</p>
        </div>
        <CheckoutForm
          defaultName={user?.displayName ?? ""}
          onPlaceOrder={handlePlaceOrder}
        />
      </div>
    </>
  );
}

export default CartPage;

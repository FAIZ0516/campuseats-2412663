import { startTransition } from "react";
import { Link, useNavigate } from "react-router";
import CartItem from "../components/CartItem.jsx";
import CheckoutForm from "../components/CheckoutForm.jsx";
import { useCart } from "../hooks/useCart.js";

function CartPage() {
  const { cart, total, changeQty, removeFromCart, placeOrder } = useCart();
  const navigate = useNavigate();

  // CheckoutForm only calls this when all three fields are valid.
  // React Router changes pages inside a transition, so clearing the cart is
  // put in the same transition. Otherwise "Your cart is empty" flashes for a
  // moment before the Orders page shows up.
  function handlePlaceOrder(details) {
    startTransition(() => {
      placeOrder(details);
      navigate("/orders");
    });
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
        <CheckoutForm onPlaceOrder={handlePlaceOrder} />
      </div>
    </>
  );
}

export default CartPage;

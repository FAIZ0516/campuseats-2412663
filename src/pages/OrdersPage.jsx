import { Link } from "react-router";
import { useCart } from "../hooks/useCart.js";

function OrdersPage() {
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <>
        <h2 className="section-title">My orders</h2>
        <p className="muted">
          No orders yet. <Link to="/">Browse the vendors</Link>
        </p>
      </>
    );
  }

  return (
    <>
      <h2 className="section-title">My orders</h2>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="card">
            <div className="row">
              <h3>Order for {order.name}</h3>
              <strong>RM {order.total.toFixed(2)}</strong>
            </div>
            <p className="muted">
              Placed {new Date(order.placedAt).toLocaleString()}
            </p>
            <p>
              Pickup at <strong>{order.pickupTime}</strong>, Mahallah{" "}
              <strong>{order.mahallah}</strong>
            </p>
            <ul>
              {order.items.map((line) => (
                <li key={line.item.id}>
                  {line.qty} &times; {line.item.name} (RM{" "}
                  {(line.item.price * line.qty).toFixed(2)})
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}

export default OrdersPage;

import { Link } from "react-router";
import OrderStatus from "../components/OrderStatus.jsx";
import OrderActions from "../components/OrderActions.jsx";
import { Loading, ErrorMessage } from "../components/Status.jsx";
import { useMyOrders } from "../hooks/useMyOrders.js";

function OrdersPage() {
  const { orders, loading, error } = useMyOrders(); // replaces useCart().orders

  if (loading) return <Loading />;
  if (error) {
    return (
      <ErrorMessage message={error} onRetry={() => window.location.reload()} />
    );
  }

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
      <p className="muted">Status updates appear here live.</p>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="card">
            <p className="cart-name">
              {order.vendorName} &middot; pickup {order.pickupTime}
            </p>
            <p className="muted">
              {order.items.map((i) => `${i.qty}× ${i.name}`).join(", ")}
            </p>
            {/* createdAt is null for a moment until the server fills it in */}
            <p className="muted">
              Placed{" "}
              {order.createdAt
                ? order.createdAt.toDate().toLocaleString("en-MY")
                : "just now"}
            </p>
            <p className="price">RM {order.total.toFixed(2)}</p>
            <OrderStatus status={order.status} />
            {order.status === "Received" && <OrderActions order={order} />}
          </li>
        ))}
      </ul>
    </>
  );
}

export default OrdersPage;

import { useState } from "react";
import { getOrder } from "../services/api";

function OrderTracker() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!orderId.trim()) {
      setError("Please enter an order ID.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setOrder(null);

      const token = localStorage.getItem("shopassist_token");

const data = await getOrder(orderId.trim(), token);

      setOrder(data);
    } catch (err) {
      setError("Order not found. Please check the order ID.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="order-tracker">
      <h2>Track your order</h2>

      <p>
        Enter your order ID to see the latest delivery information.
      </p>

      <div className="order-search">
        <input
          type="text"
          placeholder="e.g. ORD-10482"
          value={orderId}
          onChange={(event) => setOrderId(event.target.value)}
        />

        <button onClick={handleSearch}>
          {loading ? "Checking..." : "Track Order"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {order && (
        <div className="order-result">
          <h3>{order.product_name}</h3>

          <p>
            <strong>Order ID:</strong> {order.order_id}
          </p>

          <p>
            <strong>Status:</strong> {order.status}
          </p>

          <p>
            <strong>Expected delivery:</strong>{" "}
            {order.expected_delivery}
          </p>

          <p>
            <strong>Tracking number:</strong>{" "}
            {order.tracking_number}
          </p>

          <p>
            <strong>Total:</strong> ₹{order.total_amount}
          </p>
        </div>
      )}
    </div>
  );
}

export default OrderTracker;
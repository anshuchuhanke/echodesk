import { useState } from "react";
import { getRefund } from "../services/api";

function RefundChecker() {
  const [orderId, setOrderId] = useState("");
  const [refund, setRefund] = useState(null);
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
      setRefund(null);

      const token = localStorage.getItem("shopassist_token");

const data = await getRefund(
  orderId.trim(),
  token
);

      setRefund(data);
    } catch (err) {
      setError("No refund found for this order.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="refund-checker">
      <h2>Check your refund</h2>

      <p>
        Enter your order ID to see the current refund status.
      </p>

      <div className="order-search">
        <input
          type="text"
          placeholder="e.g. ORD-10483"
          value={orderId}
          onChange={(event) => setOrderId(event.target.value)}
        />

        <button onClick={handleSearch}>
          {loading ? "Checking..." : "Check Refund"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {refund && (
        <div className="refund-result">
          <h3>Refund {refund.refund_id}</h3>

          <p>
            <strong>Order:</strong> {refund.order_id}
          </p>

          <p>
            <strong>Amount:</strong> ₹{refund.amount}
          </p>

          <p>
            <strong>Status:</strong> {refund.status}
          </p>

          <p>
            <strong>Expected date:</strong> {refund.expected_date}
          </p>
        </div>
      )}
    </div>
  );
}

export default RefundChecker;
import { useState } from "react";
import {
  checkReturnEligibility,
  createReturnRequest,
} from "../services/api";

function ReturnManager() {
  const [orderId, setOrderId] = useState("");
  const [eligibility, setEligibility] = useState(null);
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCheck() {
    if (!orderId.trim()) {
      setError("Please enter an order ID.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");
      setEligibility(null);

      const data = await checkReturnEligibility(orderId.trim());

      setEligibility(data);
    } catch (err) {
      setError("Could not check return eligibility.");
    } finally {
      setLoading(false);
    }
  }

  async function handleReturn() {
    if (!reason.trim()) {
      setError("Please enter a reason for the return.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const token = localStorage.getItem("shopassist_token");

const data = await createReturnRequest(
  {
    orderId,
    productId: eligibility.product_id,
    reason,
  },
  token
);

      setMessage(
        `Return request created successfully. Return ID: ${data.return.id}`
      );

      setReason("");
    } catch (err) {
      setError("Could not create the return request.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="return-manager">
      <h2>Returns & Issues</h2>

      <p>
        Check whether your order is eligible for a return.
      </p>

      <div className="order-search">
        <input
          type="text"
          placeholder="e.g. ORD-10483"
          value={orderId}
          onChange={(event) => setOrderId(event.target.value)}
        />

        <button onClick={handleCheck}>
          {loading ? "Checking..." : "Check Return"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {eligibility && (
        <div className="return-result">
          {eligibility.eligible ? (
            <>
              <h3>Return eligible ✓</h3>

              <p>
                <strong>Product:</strong>{" "}
                {eligibility.product_name}
              </p>

              <p>
                Your order is eligible for a return.
              </p>

              <textarea
                placeholder="Why are you returning this item?"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
              />

              <button
                className="return-button"
                onClick={handleReturn}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Request Return"}
              </button>
            </>
          ) : (
            <>
              <h3>Return not available</h3>

              <p>{eligibility.reason}</p>
            </>
          )}
        </div>
      )}

      {message && <p className="success">{message}</p>}
    </div>
  );
}

export default ReturnManager;
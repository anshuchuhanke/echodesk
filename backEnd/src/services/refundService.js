const pool = require("../db/database");

async function getCustomerRefund(orderId, customerId) {
  const result = await pool.query(
    `
    SELECT
      r.id AS refund_id,
      r.order_id,
      r.amount,
      r.status,
      r.initiated_at,
      r.expected_date
    FROM refunds r
    JOIN orders o
      ON r.order_id = o.id
    WHERE r.order_id = $1
      AND o.customer_id = $2
    `,
    [orderId, customerId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}

module.exports = {
  getCustomerRefund,
};
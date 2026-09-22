const pool = require("../db/database");

async function checkReturnEligibility(orderId, customerId) {
  const result = await pool.query(
    `
    SELECT
      o.id AS order_id,
      o.status AS order_status,
      o.order_date,
      p.id AS product_id,
      p.name AS product_name,
      p.returnable
    FROM orders o
    JOIN order_items oi
      ON o.id = oi.order_id
    JOIN products p
      ON oi.product_id = p.id
    WHERE o.id = $1
      AND o.customer_id = $2
    `,
    [orderId, customerId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const order = result.rows[0];

  if (order.order_status !== "DELIVERED") {
    return {
      eligible: false,
      reason: "Order has not been delivered yet",
    };
  }

  if (!order.returnable) {
    return {
      eligible: false,
      reason: "This product is not returnable",
    };
  }

  return {
    eligible: true,
    order_id: order.order_id,
    product_id: order.product_id,
    product_name: order.product_name,
    message: "This order is eligible for return",
  };
}

module.exports = {
  checkReturnEligibility,
};
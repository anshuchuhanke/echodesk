const pool = require("../db/database");

async function getCustomerOrder(orderId, customerId) {
  const result = await pool.query(
    `
    SELECT
      o.id AS order_id,
      o.status,
      o.order_date,
      o.expected_delivery,
      o.tracking_number,
      o.total_amount,
      p.name AS product_name
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

  return result.rows[0];
}

module.exports = {
  getCustomerOrder,
};
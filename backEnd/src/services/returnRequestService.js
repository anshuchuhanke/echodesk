const pool = require("../db/database");

async function createReturnRequest(
    orderId,
    productId,
    reason,
    customerId
) {
    const eligibility = await pool.query(
        `
        SELECT
            o.id AS order_id,
            o.customer_id,
            o.status AS order_status,
            p.id AS product_id,
            p.name AS product_name,
            p.returnable
        FROM orders o
        JOIN order_items oi
            ON o.id = oi.order_id
        JOIN products p
            ON oi.product_id = p.id
        WHERE o.id = $1
          AND p.id = $2
          AND o.customer_id = $3
        `,
        [orderId, productId, customerId]
    );

    if (eligibility.rows.length === 0) {
        return {
            success: false,
            error: "Order or product not found"
        };
    }

    const order = eligibility.rows[0];

    if (order.order_status !== "DELIVERED") {
        return {
            success: false,
            error: "Order is not eligible because it has not been delivered"
        };
    }

    if (!order.returnable) {
        return {
            success: false,
            error: "Product is not returnable"
        };
    }

    const returnId = `RET-${Date.now()}`;

    const result = await pool.query(
        `
        INSERT INTO returns
        (id, order_id, product_id, reason, status)
        VALUES
        ($1, $2, $3, $4, 'REQUESTED')
        RETURNING *
        `,
        [
            returnId,
            orderId,
            productId,
            reason
        ]
    );

    return {
        success: true,
        returnRequest: result.rows[0],
        productName: order.product_name
    };
}

module.exports = {
    createReturnRequest
};
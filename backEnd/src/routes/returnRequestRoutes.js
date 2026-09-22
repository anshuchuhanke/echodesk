const express = require("express");
const pool = require("../db/database");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/",authenticateToken, async (req, res) => {
    try {
        const { orderId, productId, reason } = req.body;
        const customerId = req.customerId;

        if (!orderId || !productId || !reason) {
            return res.status(400).json({
                error: "orderId, productId and reason are required"
            });
        }

        const eligibility = await pool.query(
    `
    SELECT
        o.id AS order_id,
        o.customer_id,
        o.status AS order_status,
        p.id AS product_id,
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
            return res.status(404).json({
                error: "Order or product not found"
            });
        }

        const order = eligibility.rows[0];

        if (order.order_status !== "DELIVERED") {
            return res.status(400).json({
                error: "Order is not eligible because it has not been delivered"
            });
        }

        if (!order.returnable) {
            return res.status(400).json({
                error: "Product is not returnable"
            });
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
            [returnId, orderId, productId, reason]
        );

        res.status(201).json({
            message: "Return request created",
            return: result.rows[0]
        });

    } catch (error) {
        console.error("Return creation error:", error);

        res.status(500).json({
            error: "Internal server error"
        });
    }
});

module.exports = router;
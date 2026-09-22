const express = require("express");
const pool = require("../db/database");

const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");

router.get("/eligibility/:orderId",authenticateToken, async (req, res) => {
    try {
        const { orderId } = req.params;
        const customerId = req.customerId;

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
            [orderId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Order not found"
            });
        }

        const order = result.rows[0];

        if (order.order_status !== "DELIVERED") {
            return res.json({
                eligible: false,
                reason: "Order has not been delivered yet"
            });
        }

        if (!order.returnable) {
            return res.json({
                eligible: false,
                reason: "This product is not returnable"
            });id = $1
        }

        res.json({
            eligible: true,
            order_id: order.order_id,
            product_id: order.product_id,
            product_name: order.product_name,
            message: "This order is eligible for return"
        });

    } catch (error) {
        console.error("Return eligibility error:", error);

        res.status(500).json({
            error: "Internal server error"
        });
    }
});

module.exports = router;
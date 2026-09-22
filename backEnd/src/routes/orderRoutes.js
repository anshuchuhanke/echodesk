const express = require("express");
const pool = require("../db/database");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:orderId", authenticateToken, async (req, res) => {
    try {
        const { orderId } = req.params;
        const customerId = req.customerId;

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
            return res.status(404).json({
                error: "Order not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error("Order lookup error:", error);

        res.status(500).json({
            error: "Internal server error"
        });
    }
});

module.exports = router;
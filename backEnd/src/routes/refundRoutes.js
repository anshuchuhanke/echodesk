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
            return res.status(404).json({
                error: "Refund not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error("Refund lookup error:", error);

        res.status(500).json({
            error: "Internal server error"
        });
    }
});

module.exports = router;
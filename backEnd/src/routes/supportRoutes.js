const express = require("express");
const pool = require("../db/database");

const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");

router.get("/:me", authenticateToken , async (req, res) => {
    try {
        const  customerId  = req.customerId;

        const result = await pool.query(
            `
            SELECT
                t.id AS ticket_id,
                t.order_id,
                t.issue,
                t.priority,
                t.status,
                t.created_at
            FROM support_tickets t
            WHERE t.customer_id = $1
            ORDER BY t.created_at DESC
            `,
            [customerId]
        );

        res.json(result.rows);

    } catch (error) {
        console.error("Ticket lookup error:", error);

        res.status(500).json({
            error: "Internal server error"
        });
    }
});

router.post("/",authenticateToken, async (req, res) => {
    try {
        const {
    orderId,
    issue,
    priority
} = req.body;

const customerId = req.customerId;

        if (!customerId || !issue) {
            return res.status(400).json({
                error: "customerId and issue are required"
            });
        }

        // If an order was provided, verify that it exists
        if (orderId) {
            const orderResult = await pool.query(
                `
                SELECT id
                FROM orders
                WHERE id = $1
                `,
                [orderId]
            );

            if (orderResult.rows.length === 0) {
                return res.status(404).json({
                    error: "Order not found"
                });
            }
        }

        const ticketId = `TKT-${Date.now()}`;

        const result = await pool.query(
            `
            INSERT INTO support_tickets
            (
                id,
                customer_id,
                order_id,
                issue,
                priority,
                status
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4,
                $5,
                'OPEN'
            )
            RETURNING *
            `,
            [
                ticketId,
                customerId,
                orderId || null,
                issue,
                priority || "MEDIUM"
            ]
        );

        res.status(201).json({
            message: "Support ticket created",
            ticket: result.rows[0]
        });

    } catch (error) {
        console.error("Support ticket error:", error);

        res.status(500).json({
            error: "Internal server error"
        });
    }
});

module.exports = router;
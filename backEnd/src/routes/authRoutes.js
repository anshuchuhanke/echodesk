const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const pool = require("../db/database");

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required"
            });
        }

        const result = await pool.query(
            `
            SELECT
                id,
                name,
                email,
                phone,
                password_hash
            FROM customers
            WHERE email = $1
            `,
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        const customer = result.rows[0];

        const passwordValid = await bcrypt.compare(
            password,
            customer.password_hash
        );

        if (!passwordValid) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                customerId: customer.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );

        res.json({
            message: "Login successful",
            token,
            customer: {
                id: customer.id,
                name: customer.name,
                email: customer.email,
                phone: customer.phone
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            error: "Internal server error"
        });
    }
});

module.exports = router;
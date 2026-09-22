require("dotenv").config();

const bcrypt = require("bcryptjs");
const pool = require("../db/database");

const users = [
    {
        id: "C1001",
        name: "Rahul Sharma",
        email: "rahul@example.com",
        phone: "+919876543210",
        password: "Rahul123!"
    },
    {
        id: "C1002",
        name: "Priya Singh",
        email: "priya@example.com",
        phone: "+919876543211",
        password: "Priya123!"
    },
    {
        id: "C1003",
        name: "Arjun Mehta",
        email: "arjun@example.com",
        phone: "+919876543212",
        password: "Arjun123!"
    },
    {
        id: "C1004",
        name: "Simran Kaur",
        email: "simran@example.com",
        phone: "+919876543213",
        password: "Simran123!"
    },
    {
        id: "C1005",
        name: "Aman Verma",
        email: "aman@example.com",
        phone: "+919876543214",
        password: "Aman123!"
    }
];

async function createUsers() {
    try {
        for (const user of users) {
            const passwordHash = await bcrypt.hash(user.password, 10);

            await pool.query(
                `
                INSERT INTO customers
                (id, name, email, phone, password_hash)
                VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT (id)
                DO UPDATE SET
                    name = EXCLUDED.name,
                    email = EXCLUDED.email,
                    phone = EXCLUDED.phone,
                    password_hash = EXCLUDED.password_hash
                `,
                [
                    user.id,
                    user.name,
                    user.email,
                    user.phone,
                    passwordHash
                ]
            );

            console.log(`Created user: ${user.email}`);
        }

        console.log("Demo users ready.");
    } catch (error) {
        console.error("Error creating users:", error);
    } finally {
        await pool.end();
    }
}

createUsers();
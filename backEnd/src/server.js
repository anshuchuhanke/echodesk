require("dotenv").config();

const express = require("express");
const cors = require("cors");

const refundRoutes = require("./routes/refundRoutes");
const orderRoutes = require("./routes/orderRoutes");
const returnRoutes = require("./routes/returnRoutes");
const returnRequestRoutes = require("./routes/returnRequestRoutes");
const supportRoutes = require("./routes/supportRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.json({
        message: "ShopAssist API is running"
    });
});

app.use("/api/orders", orderRoutes);
app.use("/api/refunds", refundRoutes);
app.use("/api/returns", returnRoutes);
app.use("/api/returns", returnRequestRoutes);
app.use("/api/support/tickets", supportRoutes);
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`ShopAssist backend running on http://localhost:${PORT}`);
});
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

app.get("/api/speech-token", async (req, res) => {
  try {
    const response = await fetch(
      `https://${process.env.SPEECH_REGION}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
      {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.SPEECH_KEY,
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": "0"
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error("Speech token error:", errorText);

      return res.status(response.status).json({
        error: "Failed to get Speech token"
      });
    }

    const token = await response.text();

    res.json({
      token,
      region: process.env.SPEECH_REGION
    });
  } catch (error) {
    console.error("Speech token error:", error);

    res.status(500).json({
      error: "Failed to generate Speech token"
    });
  }
});
const { askFoundry } = require("./services/foundryService");

app.get("/api/test-foundry", async (req, res) => {
  try {
    const reply = await askFoundry(
      "Hello, introduce yourself as the ShopAssist customer support assistant."
    );

    res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Foundry error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
    console.log(`ShopAssist backend running on http://localhost:${PORT}`);
});
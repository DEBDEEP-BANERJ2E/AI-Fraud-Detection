const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");

dotenv.config();

const app = express();

// ✅ Enable CORS for frontend
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());

const PORT = process.env.PORT || 5001;

// ✅ Connect to database first
connectDB();

// Routes
app.use("/api/auth", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Handle Uncaught Errors
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
  process.exit(1);
});

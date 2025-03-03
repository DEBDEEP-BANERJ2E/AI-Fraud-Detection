require("dotenv").config();
const express = require("express");
const cors = require("cors");
const transactionRoutes = require("./routes/transactionRoutes");
require("./config/db");

const app = express();
app.use(express.json());
// app.use(cors());
app.use(cors({
    origin: "http://localhost:3000", // Adjust this to match your frontend URL
    methods: ["GET", "POST"],
    credentials: true
}));

app.use("/api", transactionRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

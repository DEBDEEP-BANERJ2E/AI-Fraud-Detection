const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { exec } = require("child_process");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint to predict fraud risk
app.post("/predict-fraud", (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({ error: "User ID is required" });
    }

    // Run Python script with user_id as an argument
    exec(`python3 p2.py ${user_id}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error.message}`);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (stderr) {
            console.error(`Python Script Error: ${stderr}`);
            return res.status(500).json({ error: "Error in Python script" });
        }

        // Extract fraud risk score from Python output
        const match = stdout.match(/Fraud Risk Score for selected transaction: (\d+\.\d+)/);
        const fraudRisk = match ? parseFloat(match[1]) : null;

        res.json({ user_id, fraudRisk });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

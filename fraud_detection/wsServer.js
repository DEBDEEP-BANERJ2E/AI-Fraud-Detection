const WebSocket = require("ws");
const db = require("./config/db");

const PORT = 8082;
const wss = new WebSocket.Server({ port: PORT });

console.log(`✅ WebSocket Server started on ws://localhost:${PORT}`);

// Function to generate random transactions
const generateTransaction = () => {
    const user_id = Math.floor(Math.random() * 100) + 1;
    const amount = (Math.random() * 1000).toFixed(2);
    const transaction_type = Math.random() > 0.5 ? "credit" : "debit";
    const locations = ["New York", "San Francisco", "London", "Berlin", "Tokyo"];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const transaction_id = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;

    const transaction = { transaction_id, user_id, amount, transaction_type, location };

    // Insert transaction into the database
    const sql = `INSERT INTO transactions (transaction_id, user_id, amount, transaction_type, location) VALUES (?, ?, ?, ?, ?)`;

    db.query(sql, [transaction_id, user_id, amount, transaction_type, location], (err) => {
        if (err) {
            console.error("❌ Error inserting transaction:", err);
            return;
        }
        console.log("✅ New transaction added:", transaction);

        // Broadcast transaction to all connected WebSocket clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(transaction));
            }
        });
    });
};

// Generate transactions every second
setInterval(generateTransaction, 1000);

wss.on("connection", (ws) => {
    console.log("🔗 New client connected.");

    ws.on("close", () => {
        console.log("❌ Client disconnected.");
    });
});

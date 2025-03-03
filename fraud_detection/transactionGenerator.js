const WebSocket = require("ws");

const WS_SERVER_URL = "ws://localhost:8082"; // Connect to WebSocket Server
let ws = new WebSocket(WS_SERVER_URL);

console.log(`🚀 Connecting to WebSocket Server at ${WS_SERVER_URL}...`);

// Function to generate random transactions
const generateTransaction = () => {
    const user_id = Math.floor(Math.random() * 100) + 1;
    const amount = (Math.random() * 1000).toFixed(2);
    const transaction_type = Math.random() > 0.5 ? "credit" : "debit";
    const locations = ["New York", "San Francisco", "London", "Berlin", "Tokyo"];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const transaction_id = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;

    const transaction = { transaction_id, user_id, amount, transaction_type, location };

    console.log("📤 Sending transaction to WebSocket Server:", transaction);

    // Send transaction to WebSocket Server
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(transaction));
    } else {
        console.error("⚠️ WebSocket not connected. Cannot send transaction.");
    }
};

// Start transaction generation when WebSocket connects
ws.on("open", () => {
    console.log("✅ Connected to WebSocket Server!");
    setInterval(generateTransaction, 1000); // Generate transaction every second
});

ws.on("error", (err) => {
    console.error("❌ WebSocket Error:", err);
});

ws.on("close", () => {
    console.error("❌ WebSocket Connection Closed. Reconnecting...");
    setTimeout(() => {
        ws = new WebSocket(WS_SERVER_URL); // Attempt Reconnect
    }, 5000);
});

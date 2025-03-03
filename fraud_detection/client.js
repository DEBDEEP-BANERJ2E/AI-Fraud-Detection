const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:8080");

ws.on("open", () => {
    console.log("📡 Connected to WebSocket Server");

    // Simulate a new transaction every 3 seconds
    setInterval(() => {
        const transaction = {
            transaction_id: Math.random().toString(36).substring(2, 10),
            user_id: "U" + Math.floor(Math.random() * 1000),
            amount: (Math.random() * 5000).toFixed(2),
            transaction_type: ["credit_card", "debit_card", "UPI", "bank_transfer"][Math.floor(Math.random() * 4)],
            location: ["New York", "London", "Mumbai", "Berlin"][Math.floor(Math.random() * 4)],
            device_id: "D" + Math.floor(Math.random() * 100),
            ip_address: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
        };

        console.log("📩 Sending Transaction:", transaction);
        ws.send(JSON.stringify(transaction));
    }, 3000);
});

ws.on("message", message => {
    console.log("✅ Transaction Broadcasted:", JSON.parse(message));
});

ws.on("close", () => console.log("❌ Disconnected from Server"));

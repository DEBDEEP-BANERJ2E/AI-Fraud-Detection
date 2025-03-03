import React, { useState, useEffect } from "react";
import { getTransactions } from "../services/api";
import "../styles/TransactionTable.css"; // Import CSS file

const TransactionTable = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTransactions();
                console.log("🔹 Initial Transactions:", data);
                setTransactions(data);
            } catch (error) {
                console.error("❌ Error fetching transactions:", error);
            }
        };
        fetchData();

        const ws = new WebSocket("ws://localhost:8082");

        ws.onopen = () => console.log("✅ WebSocket Connected");

        ws.onmessage = (event) => {
            try {
                const newTransaction = JSON.parse(event.data);
                console.log("📩 New Transaction:", newTransaction);

                setTransactions((prevTransactions) => [
                    newTransaction,
                    ...prevTransactions.slice(0, 19), // Keep only the latest 20 transactions
                ]);
            } catch (error) {
                console.error("❌ Error processing WebSocket message:", error);
            }
        };

        ws.onerror = (error) => console.error("❌ WebSocket Error:", error);
        ws.onclose = () => console.log("❌ WebSocket Disconnected");

        return () => {
            ws.close();
        };
    }, []);

    return (
        <div className="table-container">
            <table className="transaction-table">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>User ID</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((tx, index) => (
                        <tr key={tx.transaction_id || index}>
                            <td>{tx.transaction_id}</td>
                            <td>{tx.user_id}</td>
                            <td>${tx.amount}</td>
                            <td className={tx.transaction_type === "credit" ? "credit" : "debit"}>
                                {tx.transaction_type}
                            </td>
                            <td>{tx.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;

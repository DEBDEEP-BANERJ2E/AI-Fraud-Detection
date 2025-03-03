const Transaction = require("../models/transactionModel");

exports.addTransaction = (req, res) => {
    const { transaction_id, user_id, amount, transaction_type, location, device_id, ip_address } = req.body;

    Transaction.create([transaction_id, user_id, amount, transaction_type, location, device_id, ip_address], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Transaction added successfully!" });
    });
};

exports.getTransactions = (req, res) => {
    Transaction.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

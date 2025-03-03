const db = require("../config/db");

const Transaction = {
    create: (data, callback) => {
        const sql = `INSERT INTO transactions (transaction_id, user_id, amount, transaction_type, location, device_id, ip_address)
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;
        db.query(sql, data, callback);
    },
    getAll: callback => {
        db.query("SELECT * FROM transactions ORDER BY timestamp DESC", callback);
    }
};

module.exports = Transaction;

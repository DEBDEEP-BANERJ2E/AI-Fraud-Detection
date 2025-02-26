const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const connectDB = async () => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("❌ Database connection failed:", err);
      process.exit(1);
    } else {
      console.log("✅ MySQL Connected!");
      connection.release();
    }
  });
};

module.exports = { pool, connectDB };

const express = require("express");
const router = express.Router();
const { addTransaction, getTransactions } = require("../controllers/transactionController");

router.post("/transaction", addTransaction);
router.get("/transactions", getTransactions);

module.exports = router;

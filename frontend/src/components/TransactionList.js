import React, { useContext } from "react";
import { FraudContext } from "../context/FraudContext";

const TransactionList = () => {
  const { transactions = [] } = useContext(FraudContext);

  return (
    <div className="space-y-4">
      {transactions.length === 0 ? (
        <p className="text-gray-500 text-center">No transactions found.</p>
      ) : (
        transactions.map((transaction, index) => (
          <div
            key={index}
            className="bg-gray-50 shadow-md p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                {transaction.description}
              </h3>
              <p className="text-sm text-gray-500">
                {new Date(transaction.date).toLocaleString()}
              </p>
            </div>
            <p
              className={`text-lg font-semibold ${
                transaction.amount < 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              ${transaction.amount.toFixed(2)}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionList;

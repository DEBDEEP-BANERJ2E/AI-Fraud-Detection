import React, { createContext, useState } from "react";

// Create the FraudContext
export const FraudContext = createContext();

// FraudProvider component to wrap the app
export const FraudProvider = ({ children }) => {
  const [fraudAlerts, setFraudAlerts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Function to add a fraud alert
  const addFraudAlert = (alert) => {
    setFraudAlerts((prevAlerts) => [...prevAlerts, alert]);
  };

  // Function to add a transaction
  const addTransaction = (transaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, transaction]);
  };

  return (
    <FraudContext.Provider value={{ fraudAlerts, addFraudAlert, transactions, addTransaction }}>
      {children}
    </FraudContext.Provider>
  );
};

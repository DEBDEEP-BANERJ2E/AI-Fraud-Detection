// src/components/FraudAlertModal.js
import React from "react";
const FraudAlertModal = ({ isOpen, onClose, alert }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-red-600 font-bold">Fraud Alert!</h2>
          <p>{alert.message}</p>
          <button className="bg-red-500 text-white px-4 py-2 mt-4" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };
  
  export default FraudAlertModal;
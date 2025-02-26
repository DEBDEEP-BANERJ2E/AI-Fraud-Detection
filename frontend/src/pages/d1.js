import React, { useContext } from "react";
import FraudAlertModal from "../components/FraudAlertModal";
import TransactionList from "../components/TransactionList";
import { FraudContext } from "../context/FraudContext";

const Dashboard = () => {
  const { fraudAlerts = [] } = useContext(FraudContext);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Dashboard Header */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transactions Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Recent Transactions
          </h2>
          <TransactionList />
        </div>

        {/* Fraud Alerts Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            Fraud Alerts
          </h2>
          {fraudAlerts.length > 0 ? (
            <FraudAlertModal />
          ) : (
            <p className="text-gray-500">No fraud alerts detected.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

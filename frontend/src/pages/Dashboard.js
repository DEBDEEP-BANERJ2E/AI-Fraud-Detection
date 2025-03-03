import React from "react";
import "../styles/Dashboard.css"; // Import the new CSS file
import TransactionTable from "../components/TransactionTable";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">FraudShield</h2>
        <ul className="menu">
          <li className="active">Dashboard</li>
          <li>Transactions </li>
          <li>Fraud Alerts</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* Main Dashboard Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Welcome to Your Dashboard</h1>
        </header>

        {/* Overview Cards */}
        <section className="dashboard-overview">
          <div className="card">
            <h3>Total Transactions</h3>
            <p>1,245</p>
          </div>
          <div className="card">
            <h3>Fraud Alerts</h3>
            <p>12</p>
          </div>
          <div className="card">
            <h3>Pending Reviews</h3>
            <p>8</p>
          </div>
        </section>

        {/* Activity Feed */}
        <section className="dashboard-activity">
          <h2>Recent Activity</h2>
          <ul>
            <li>
              <span role="img" aria-label="flag">🔹</span> Transaction #1234 flagged for review
            </li>
            <li>
              <span role="img" aria-label="check">✅</span> Fraud case #567 resolved successfully
            </li>
            <li>
              <span role="img" aria-label="rocket">🚀</span> New security update applied
            </li>
          </ul>
        </section>
        <TransactionTable />
      </main>
    </div>
  );
};

export default Dashboard;

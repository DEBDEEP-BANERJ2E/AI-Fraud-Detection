import React from "react";
import { Link } from "react-router-dom";
import { FaShieldAlt, FaChartLine, FaLock } from "react-icons/fa";
import "../styles/HomePage.css"; // Import the CSS file

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <header className="hero">
        <h1>AI-Powered Financial Fraud Detection</h1>
        <p>Secure your transactions with real-time AI fraud detection.</p>
        <Link to="/register" className="cta-button">Get Started</Link>
      </header>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-item">
          <FaShieldAlt />
          <h3>AI-Powered Security</h3>
          <p>Advanced AI detects fraudulent transactions instantly.</p>
        </div>
        <div className="feature-item">
          <FaChartLine />
          <h3>Real-Time Monitoring</h3>
          <p>Monitor and prevent fraud with real-time alerts.</p>
        </div>
        <div className="feature-item">
          <FaLock />
          <h3>Secure Transactions</h3>
          <p>Encryption ensures safe financial operations.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-item">
          <p>"This system saved us from fraud multiple times. Highly recommended!"</p>
          <h3>- John Doe, Finance Manager</h3>
        </div>
        <div className="testimonial-item">
          <p>"AI detection is fast and accurate. Great security boost!"</p>
          <h3>- Sarah Lee, Business Owner</h3>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 AI Fraud Detection. All rights reserved.</p>
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Sign Up</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

import { useState } from "react";
import "./App.css";

import Login from "./pages/Login";

import OrderTracker from "./components/OrderTracker";
import RefundChecker from "./components/RefundChecker";
import ReturnManager from "./components/ReturnManager";
import TicketList from "./components/TicketList";
import AIChat from "./components/AIChat";

function App() {
  const [customer, setCustomer] = useState(() => {
    const savedCustomer = localStorage.getItem("shopassist_customer");

    return savedCustomer
      ? JSON.parse(savedCustomer)
      : null;
  });

  function handleLogin(customerData) {
    setCustomer(customerData);
  }

  function handleLogout() {
    localStorage.removeItem("shopassist_token");
    localStorage.removeItem("shopassist_customer");

    setCustomer(null);
  }

  // If the user is not logged in,
  // show the Login page.
  if (!customer) {
    return <Login onLogin={handleLogin} />;
  }

  // User is authenticated.
  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">ShopAssist</div>

        <nav>
          <span>Hi, {customer.name}</span>

          <button onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      <main>
        <section className="hero">
          <p className="eyebrow">
            AI-POWERED CUSTOMER SUPPORT
          </p>

          <h1>
            How can we help you today?
          </h1>

          <p className="hero-text">
            Get instant help with orders, returns, refunds,
            and delivery issues.
          </p>

          <button className="ai-button">
            🎙️ Talk to AI Support
          </button>
        </section>

        <section className="support-section">
          <h2>
            What do you need help with?
          </h2>

          <div className="support-grid">

            <div className="support-card">
              <div className="card-icon">📦</div>

              <h3>
                Track an Order
              </h3>

              <p>
                Check your order status, delivery date,
                and tracking details.
              </p>

              <button>
                Track Order →
              </button>
            </div>

            <div className="support-card">
              <div className="card-icon">↩️</div>

              <h3>
                Returns & Issues
              </h3>

              <p>
                Check return eligibility or report a
                problem with your order.
              </p>

              <button>
                Get Help →
              </button>
            </div>

            <div className="support-card">
              <div className="card-icon">💳</div>

              <h3>
                Refund Status
              </h3>

              <p>
                Check whether your refund has been
                initiated or processed.
              </p>

              <button>
                Check Refund →
              </button>
            </div>

            <div className="support-card">
              <div className="card-icon">🎫</div>

              <h3>
                My Support Tickets
              </h3>

              <p>
                View your existing support requests
                and their current status.
              </p>

              <button>
                View Tickets →
              </button>
            </div>

          </div>
        </section>

        <AIChat />

        <OrderTracker />

        <RefundChecker />

        <ReturnManager />

        <TicketList />

      </main>
    </div>
  );
}

export default App;
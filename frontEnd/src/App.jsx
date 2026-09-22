import { useState } from "react";
import "./App.css";

import Login from "./pages/Login";

import OrderTracker from "./components/OrderTracker";
import RefundChecker from "./components/RefundChecker";
import ReturnManager from "./components/ReturnManager";
import TicketList from "./components/TicketList";
import AIChat from "./components/AIChat";

const NAV_ITEMS = [
  {
    id: "chat",
    label: "AI Assistant",
    description: "Chat with ShopAssist AI",
    icon: "✦",
  },
  {
    id: "orders",
    label: "Track Order",
    description: "Delivery status & tracking",
    icon: "📦",
  },
  {
    id: "returns",
    label: "Returns & Issues",
    description: "Eligibility & requests",
    icon: "↩️",
  },
  {
    id: "refunds",
    label: "Refund Status",
    description: "Track a refund",
    icon: "💳",
  },
  {
    id: "tickets",
    label: "Support Tickets",
    description: "Your open requests",
    icon: "🎫",
  },
];

function App() {
  const [customer, setCustomer] = useState(() => {
    const savedCustomer = localStorage.getItem("shopassist_customer");

    return savedCustomer
      ? JSON.parse(savedCustomer)
      : null;
  });

  const [activeView, setActiveView] = useState("chat");

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

  const initials = customer.name
    ? customer.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("")
    : "U";

  const activeItem =
    NAV_ITEMS.find((item) => item.id === activeView) ||
    NAV_ITEMS[0];

  // User is authenticated.
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark">✦</div>

          <div className="brand-text">
            <span className="brand-name">ShopAssist</span>
            <span className="brand-tag">AI Support Agent</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={
                "nav-item" +
                (activeView === item.id ? " active" : "")
              }
              onClick={() => setActiveView(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-chip">
            <div className="user-avatar">{initials}</div>

            <div className="user-meta">
              <span className="user-name">{customer.name}</span>
              <span className="user-email">{customer.email}</span>
            </div>
          </div>

          <button className="logout-button" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <div className="topbar-heading">
            <p className="topbar-eyebrow">ShopAssist AI</p>
            <h1 className="topbar-title">{activeItem.label}</h1>
          </div>

          <div className="agent-status">
            <span className="status-dot" />
            AI Agent Online
          </div>
        </header>

        <main className="content">
          <div className="panel">
            {activeView === "chat" && <AIChat />}
            {activeView === "orders" && <OrderTracker />}
            {activeView === "returns" && <ReturnManager />}
            {activeView === "refunds" && <RefundChecker />}
            {activeView === "tickets" && <TicketList />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

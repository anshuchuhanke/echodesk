import { useState } from "react";
import { loginUser } from "../services/api";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await loginUser(email, password);

      localStorage.setItem("shopassist_token", data.token);
      localStorage.setItem(
        "shopassist_customer",
        JSON.stringify(data.customer)
      );

      onLogin(data.customer);
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-logo">
          ShopAssist
        </div>

        <h1>Welcome back</h1>

        <p className="login-subtitle">
          Sign in to access your orders, returns, refunds,
          and support tickets.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Email</label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

        </form>

        <div className="demo-login">
          <strong>Demo account</strong>

          <p>
            rahul@example.com
          </p>

          <p>
            Password: Rahul123!
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;
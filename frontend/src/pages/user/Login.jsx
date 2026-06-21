import React, { useMemo, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import "./Login.css";

import { api, saveSession } from "../../services/api";

const DEMO_ACCOUNTS = {
  user: {
    email: "user@lumixplay.com",
    password: "user123",
    label: "Viewer Demo",
    helper: "Browse movies, watch trailers, manage watchlist.",
  },
  admin: {
    email: "admin@lumixplay.com",
    password: "admin123",
    label: "Admin Demo",
    helper: "Manage movies, users, watch history and reports.",
  },
};

function Login({ initialRole = "user" }) {
  const navigate = useNavigate();
  const [role, setRole] = useState(initialRole);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const selectedDemo = useMemo(() => DEMO_ACCOUNTS[role], [role]);

  const switchRole = (nextRole) => {
    setRole(nextRole);
    setForm({ email: "", password: "" });
  };

  const fillDemo = () => {
    setForm({
      email: selectedDemo.email,
      password: selectedDemo.password,
    });
  };

  const submit = async (event) => {
    event.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const data = await api(role === "admin" ? "/auth/admin-login/" : "/auth/login/", {
        method: "POST",
        body: JSON.stringify(form),
      });

      saveSession(data);
      toast.success(role === "admin" ? "Admin login successful" : "User login successful");
      navigate(role === "admin" ? "/admin/dashboard" : "/home");
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-shell">
        <section className="login-brand-panel">
          <span className="login-kicker">Final project preview</span>
          <h1>LumixPlay</h1>
          <p>
            A full-stack movie streaming platform with dedicated viewer and admin experiences.
          </p>

          <div className="login-preview-grid">
            <div>
              <strong>User</strong>
              <span>Browse, watch, save movies</span>
            </div>
            <div>
              <strong>Admin</strong>
              <span>Movies, users, reports</span>
            </div>
          </div>
        </section>

        <section className="login-card">
          <div className="role-toggle" aria-label="Choose login type">
            <button
              type="button"
              className={role === "user" ? "active-role" : ""}
              onClick={() => switchRole("user")}
            >
              User Login
            </button>
            <button
              type="button"
              className={role === "admin" ? "active-role" : ""}
              onClick={() => switchRole("admin")}
            >
              Admin Login
            </button>
          </div>

          <h2>{selectedDemo.label}</h2>
          <p>{selectedDemo.helper}</p>

          <button type="button" className="demo-fill-btn" onClick={fillDemo}>
            Use demo credentials
          </button>

          <form className="login-form" onSubmit={submit}>
            <input
              type="email"
              placeholder={role === "admin" ? "Admin Email" : "Email Address"}
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : role === "admin" ? "Enter Admin Dashboard" : "Start Watching"}
            </button>
          </form>

          {role === "user" && (
            <div className="register-link">
              New viewer?
              <Link to="/register">
                <span>Create account</span>
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import "./Login.css";

import { api, saveSession } from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const data = await api("/auth/login/", {
        method: "POST",
        body: JSON.stringify(form),
      });

      saveSession(data);

      toast.success("Login successful 🎉");

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay">
        <div className="login-card">
          <h1>LumixPlay</h1>

          <h2>Welcome Back</h2>

          <p>Login to continue streaming</p>

          <form className="login-form" onSubmit={submit}>
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(event) =>
                setForm({
                  ...form,
                  email: event.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(event) =>
                setForm({
                  ...form,
                  password: event.target.value,
                })
              }
            />

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="register-link">
            Don't have an account?
            <Link to="/register">
              <span> Register</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import "./Register.css";

import { api, saveSession } from "../../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirm
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const data = await api("/auth/register/", {
        method: "POST",
        body: JSON.stringify(form),
      });

      saveSession(data);

      toast.success("Account created successfully 🎉");

      setTimeout(() => {
      navigate("/home");
      }, 1000);
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-overlay">
        <div className="register-card">
          <h1>LumixPlay</h1>

          <h2>Create Account</h2>

          <p>Start your streaming journey</p>

          <form className="register-form" onSubmit={submit}>
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(event) =>
                setForm({
                  ...form,
                  name: event.target.value,
                })
              }
            />

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

            <input
              type="password"
              placeholder="Confirm Password"
              value={form.confirm}
              onChange={(event) =>
                setForm({
                  ...form,
                  confirm: event.target.value,
                })
              }
            />

            <button type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="login-link">
            Already have an account?
            <Link to="/login">
              <span> Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

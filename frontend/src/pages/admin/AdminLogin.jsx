import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import "./AdminLogin.css";

import { api, saveSession } from "../../services/api";

function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const data = await api("/auth/admin-login/", {
        method: "POST",
        body: JSON.stringify(form),
      });
      saveSession(data);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1>LumixPlay Admin</h1>
        <p>Manage movies, users and reports</p>

        <form className="admin-login-form" onSubmit={submit}>
          <input type="email" placeholder="Admin Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          <input type="password" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
          {error && <p className="form-error">{error}</p>}
          <button type="submit">Login to Dashboard</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;

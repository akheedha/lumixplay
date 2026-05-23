import React from "react";

import "./AdminLogin.css";

function AdminLogin() {

  return (

    <div className="admin-login-page">

      <div className="admin-login-card">

        <h1>
          LumixPlay Admin
        </h1>

        <p>
          Manage movies, users and reports
        </p>

        <form className="admin-login-form">

          <input
            type="email"
            placeholder="Admin Email"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button type="submit">
            Login to Dashboard
          </button>

        </form>

      </div>

    </div>

  );

}

export default AdminLogin;
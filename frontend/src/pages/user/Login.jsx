import React from "react";

import "./Login.css";

function Login() {

  return (

    <div className="login-page">

      {/* BACKGROUND OVERLAY */}

      <div className="login-overlay">

        {/* LOGIN CARD */}

        <div className="login-card">

          <h1>
            LumixPlay
          </h1>

          <h2>
            Welcome Back
          </h2>

          <p>
            Login to continue streaming
          </p>

          {/* FORM */}

          <form className="login-form">

            <input
              type="email"
              placeholder="Email Address"
            />

            <input
              type="password"
              placeholder="Password"
            />

            <div className="login-options">

              <label>

                <input type="checkbox" />

                Remember Me

              </label>

              <span>
                Forgot Password?
              </span>

            </div>

            <button type="submit">
              Login
            </button>

          </form>

          <div className="register-link">

            Don’t have an account?

            <span>
              Register
            </span>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Login;
import React from "react";

import "./Register.css";

function Register() {

  return (

    <div className="register-page">

      <div className="register-overlay">

        {/* REGISTER CARD */}

        <div className="register-card">

          <h1>
            LumixPlay
          </h1>

          <h2>
            Create Account
          </h2>

          <p>
            Start your streaming journey
          </p>

          {/* FORM */}

          <form className="register-form">

            <input
              type="text"
              placeholder="Full Name"
            />

            <input
              type="email"
              placeholder="Email Address"
            />

            <input
              type="password"
              placeholder="Password"
            />

            <input
              type="password"
              placeholder="Confirm Password"
            />

            <button type="submit">
              Create Account
            </button>

          </form>

          <div className="login-link">

            Already have an account?

            <span>
              Login
            </span>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Register;
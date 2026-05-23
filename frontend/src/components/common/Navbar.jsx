import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="lumix-navbar">

      <div className="container-fluid">

        <div className="navbar-content">

          {/* LOGO */}
          <div className="logo">
            LumixPlay
          </div>

          {/* DESKTOP MENU */}
          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>

            <li>Home</li>
            <li>Movies</li>
            <li>TV Shows</li>
            <li>Watchlist</li>

          </ul>

          {/* RIGHT SIDE */}
          <div className="nav-right">

            <button className="search-btn">
              🔍
            </button>

            <div className="profile-icon">
              👤
            </div>

            {/* MOBILE MENU BUTTON */}
            <div
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </div>

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
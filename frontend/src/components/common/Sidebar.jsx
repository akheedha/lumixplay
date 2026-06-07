import React from "react";

import {
  FaHome,
  FaSearch,
  FaHeart,
  FaUser
} from "react-icons/fa";

import {
  Link,
  useLocation
} from "react-router-dom";

import logo from "../../assets/logo.png";

import "./Sidebar.css";

function Sidebar() {

  const location = useLocation();

  return (

    <div className="sidebar">

      {/* LOGO */}

      <div className="sidebar-logo">

        <img
          src={logo}
          alt="LumixPlay"
        />

        <h1>
          Lumix<span>Play</span>
        </h1>

      </div>

      {/* MENU */}

      <div className="sidebar-menu">

        <Link
          to="/"
          className={
            location.pathname === "/"
            ? "sidebar-item active"
            : "sidebar-item"
          }
        >
          <FaHome />
          <span>Home</span>
        </Link>

        <Link
          to="/search"
          className={
            location.pathname === "/search"
            ? "sidebar-item active"
            : "sidebar-item"
          }
        >
          <FaSearch />
          <span>Search</span>
        </Link>

        <Link
          to="/watchlist"
          className={
            location.pathname === "/watchlist"
            ? "sidebar-item active"
            : "sidebar-item"
          }
        >
          <FaHeart />
          <span>Watchlist</span>
        </Link>

        <Link
          to="/profile"
          className={
            location.pathname === "/profile"
            ? "sidebar-item active"
            : "sidebar-item"
          }
        >
          <FaUser />
          <span>Profile</span>
        </Link>

      </div>

    </div>

  );

}

export default Sidebar;
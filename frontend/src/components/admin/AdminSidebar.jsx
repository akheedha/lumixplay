import React from "react";

import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

import {
  FaHome,
  FaFilm,
  FaUsers,
  FaChartBar,
  FaSignOutAlt
} from "react-icons/fa";

import "./AdminSidebar.css";
import { clearSession } from "../../services/api";

function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    clearSession();
    navigate("/admin/login");
  };

  const itemClass = (path) => (
    location.pathname === path ? "admin-menu-item active-admin" : "admin-menu-item"
  );

  return (

    <div className="admin-sidebar">

      <div className="admin-logo">
        LumixPlay
      </div>

      <div className="admin-menu">

        <Link to="/admin/dashboard" className={itemClass("/admin/dashboard")}>
          <FaHome />
          <span>Dashboard</span>
        </Link>

        <Link to="/admin/movies" className={itemClass("/admin/movies")}>
          <FaFilm />
          <span>Movies</span>
        </Link>

        <Link to="/admin/users" className={itemClass("/admin/users")}>
          <FaUsers />
          <span>Users</span>
        </Link>

        <Link to="/admin/reports" className={itemClass("/admin/reports")}>
          <FaChartBar />
          <span>Reports</span>
        </Link>

      </div>

      <div className="admin-logout" onClick={logout}>

        <FaSignOutAlt />

        <span>Logout</span>

      </div>

    </div>

  );

}

export default AdminSidebar;

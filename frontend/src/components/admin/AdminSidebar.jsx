import React from "react";

import {
  FaHome,
  FaFilm,
  FaUsers,
  FaChartBar,
  FaSignOutAlt
} from "react-icons/fa";

import "./AdminSidebar.css";

function AdminSidebar() {

  return (

    <div className="admin-sidebar">

      <div className="admin-logo">
        LumixPlay
      </div>

      <div className="admin-menu">

        <div className="admin-menu-item active-admin">
          <FaHome />
          <span>Dashboard</span>
        </div>

        <div className="admin-menu-item">
          <FaFilm />
          <span>Movies</span>
        </div>

        <div className="admin-menu-item">
          <FaUsers />
          <span>Users</span>
        </div>

        <div className="admin-menu-item">
          <FaChartBar />
          <span>Reports</span>
        </div>

      </div>

      <div className="admin-logout">

        <FaSignOutAlt />

        <span>Logout</span>

      </div>

    </div>

  );

}

export default AdminSidebar;
import React, { useEffect, useState } from "react";

import "./Dashboard.css";

import { api } from "../../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    total_movies: 0,
    total_users: 0,
    total_views: 0,
    watchlist_adds: 0,
  });

  useEffect(() => {
    api("/admin/dashboard/").then(setStats).catch(console.error);
  }, []);

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>

      <div className="dashboard-stats">
        <div className="dashboard-card">
          <h2>{stats.total_movies}</h2>
          <p>Total Movies</p>
        </div>
        <div className="dashboard-card">
          <h2>{stats.total_users}</h2>
          <p>Total Users</p>
        </div>
        <div className="dashboard-card">
          <h2>{stats.total_views}</h2>
          <p>Total Views</p>
        </div>
        <div className="dashboard-card">
          <h2>{stats.watchlist_adds}</h2>
          <p>Watchlist Adds</p>
        </div>
      </div>

      <div className="recent-section">
        <h2>Recent Activity</h2>
        <div className="activity-card">
          <p>Movie catalog connected to backend API</p>
          <p>Users can register, login, watch movies and manage watchlists</p>
          <p>Admin reports are ordered by movie view count</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

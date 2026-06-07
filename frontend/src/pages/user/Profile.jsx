import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import "./Profile.css";

import { api, clearSession, getUser } from "../../services/api";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUser());
  const [history, setHistory] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [passwords, setPasswords] = useState({ old_password: "", new_password: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    api("/auth/me/").then((data) => setUser(data.user)).catch(console.error);
    api("/history/").then((data) => setHistory(data.history)).catch(console.error);
    api("/watchlist/").then((data) => setWatchlist(data.movies)).catch(console.error);
  }, []);

  const changePassword = async () => {
    setMessage("");
    try {
      const data = await api("/auth/change-password/", {
        method: "POST",
        body: JSON.stringify(passwords),
      });
      setMessage(data.message);
      setPasswords({ old_password: "", new_password: "" });
    } catch (err) {
      setMessage(err.message);
    }
  };

  const logout = () => {
    clearSession();
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">{(user?.name || "U").slice(0, 2).toUpperCase()}</div>
        <div className="profile-info">
          <h1>{user?.name || "Lumix User"}</h1>
          <p>{user?.email}</p>
          <span className="premium-badge">Member</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>{history.length}</h2>
          <p>Movies Watched</p>
        </div>
        <div className="stat-card">
          <h2>{watchlist.length}</h2>
          <p>Watchlist Items</p>
        </div>
        <div className="stat-card">
          <h2>{history.reduce((total, item) => total + item.view_count, 0)}</h2>
          <p>Total Views</p>
        </div>
      </div>

      <div className="settings-section">
        <h2>Account Settings</h2>
        <div className="settings-card">
          <div className="setting-item">
            <div>
              <h3>Change Password</h3>
              <p>Update your account password</p>
              <input type="password" placeholder="Current password" value={passwords.old_password} onChange={(event) => setPasswords({ ...passwords, old_password: event.target.value })} />
              <input type="password" placeholder="New password" value={passwords.new_password} onChange={(event) => setPasswords({ ...passwords, new_password: event.target.value })} />
              {message && <p>{message}</p>}
            </div>
            <button onClick={changePassword}>Update</button>
          </div>

          <div className="setting-item">
            <div>
              <h3>Logout</h3>
              <p>Sign out from LumixPlay</p>
            </div>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

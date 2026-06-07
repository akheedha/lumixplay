import React, { useCallback, useEffect, useState } from "react";

import "./Users.css";

import { EmptyState } from "../../components/common/StateBlocks";
import { api } from "../../services/api";

function Users() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedHistory, setSelectedHistory] = useState([]);

  const load = useCallback(async () => {
    const data = await api(`/admin/users/?q=${encodeURIComponent(query)}`);
    setUsers(data.users);
  }, [query]);

  const toggle = async (userId) => {
    await api(`/admin/users/${userId}/toggle-block/`, { method: "POST" });
    load().catch(console.error);
  };

  const showHistory = async (userId) => {
    const data = await api(`/admin/users/${userId}/history/`);
    setSelectedHistory(data.history);
  };

  useEffect(() => {
    load().catch(console.error);
  }, [load]);

  return (
    <div className="users-page">
      <div className="users-header">
        <h1>User Management</h1>
      </div>

      <div className="users-search">
        <input type="text" placeholder="Search users..." value={query} onChange={(event) => setQuery(event.target.value)} />
      </div>

      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4">
                  <EmptyState title="No users found" message="Try a different search term." />
                </td>
              </tr>
            ) : users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={user.is_active ? "status-active" : "status-blocked"}>
                    {user.is_active ? "Active" : "Blocked"}
                  </span>
                </td>
                <td>
                  <button className={user.is_active ? "block-btn" : "unblock-btn"} onClick={() => toggle(user.id)}>
                    {user.is_active ? "Block" : "Unblock"}
                  </button>
                  <button className="unblock-btn" onClick={() => showHistory(user.id)}>History</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedHistory.length > 0 && (
        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>Watched Movie</th>
                <th>Views</th>
                <th>Last Watched</th>
              </tr>
            </thead>
            <tbody>
              {selectedHistory.map((row) => (
                <tr key={row.movie.id}>
                  <td>{row.movie.title}</td>
                  <td>{row.view_count}</td>
                  <td>{new Date(row.watched_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Users;

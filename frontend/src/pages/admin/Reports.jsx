import React, { useEffect, useState } from "react";

import "./Reports.css";

import { EmptyState } from "../../components/common/StateBlocks";
import { api } from "../../services/api";

function Reports() {
  const [report, setReport] = useState({
    total_views: 0,
    active_users: 0,
    movies: [],
  });

  useEffect(() => {
    api("/admin/reports/").then(setReport).catch(console.error);
  }, []);

  const topViews = report.movies[0]?.view_count || 1;

  return (
    <div className="reports-page">
      <h1>Reports & Analytics</h1>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h2>{report.total_views}</h2>
          <p>Total Views</p>
        </div>
        <div className="analytics-card">
          <h2>{report.active_users}</h2>
          <p>Active Users</p>
        </div>
        <div className="analytics-card">
          <h2>{report.movies.length}</h2>
          <p>Movies Tracked</p>
        </div>
      </div>

      <div className="top-movies-section">
        <h2>Top Viewed Movies</h2>
        <div className="top-movies-list">
          {report.movies.length === 0 ? (
            <EmptyState title="No report data yet" message="Views will appear after users watch movies." />
          ) : report.movies.slice(0, 5).map((movie) => (
            <div className="top-movie-item" key={movie.id}>
              <div>
                <h3>{movie.title}</h3>
                <p>{movie.view_count} Views</p>
              </div>
              <div className="movie-progress">
                <div
                  className="movie-progress-fill"
                  style={{ width: `${Math.max(8, (movie.view_count / topViews) * 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="report-table-wrapper">
        <table className="report-table">
          <thead>
            <tr>
              <th>Movie</th>
              <th>Views</th>
              <th>Watchlist Adds</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {report.movies.length === 0 ? (
              <tr>
                <td colSpan="4">
                  <EmptyState title="No movie views yet" message="Reports are ordered by view count once playback begins." />
                </td>
              </tr>
            ) : report.movies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.title}</td>
                <td>{movie.view_count}</td>
                <td>{movie.watchlist_count}</td>
                <td>{movie.genre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;

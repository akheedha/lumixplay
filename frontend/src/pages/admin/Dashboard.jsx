import React from "react";

import "./Dashboard.css";

function Dashboard() {

  return (

    <div className="dashboard-page">

      <h1>
        Dashboard
      </h1>

      {/* STATS */}

      <div className="dashboard-stats">

        <div className="dashboard-card">

          <h2>
            120
          </h2>

          <p>
            Total Movies
          </p>

        </div>

        <div className="dashboard-card">

          <h2>
            3,245
          </h2>

          <p>
            Total Users
          </p>

        </div>

        <div className="dashboard-card">

          <h2>
            82K
          </h2>

          <p>
            Views This Month
          </p>

        </div>

        <div className="dashboard-card">

          <h2>
            1,240
          </h2>

          <p>
            Watchlist Adds
          </p>

        </div>

      </div>

      {/* RECENT ACTIVITY */}

      <div className="recent-section">

        <h2>
          Recent Activity
        </h2>

        <div className="activity-card">

          <p>
            🎬 New movie added: Interstellar
          </p>

          <p>
            👤 25 new users registered today
          </p>

          <p>
            📈 Avengers Endgame reached 10K views
          </p>

          <p>
            ❤️ Batman added to 500+ watchlists
          </p>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;
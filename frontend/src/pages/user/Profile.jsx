import React from "react";

import "./Profile.css";

function Profile() {

  return (

    <div className="profile-page">

      {/* PROFILE HEADER */}

      <div className="profile-header">

        <div className="profile-avatar">
          AJ
        </div>

        <div className="profile-info">

          <h1>
            Akheedha Jan
          </h1>

          <p>
            akheedha@gmail.com
          </p>

          <span className="premium-badge">
            Premium Member
          </span>

        </div>

      </div>

      {/* STATS */}

      <div className="stats-grid">

        <div className="stat-card">

          <h2>
            128
          </h2>

          <p>
            Movies Watched
          </p>

        </div>

        <div className="stat-card">

          <h2>
            54
          </h2>

          <p>
            Watchlist Items
          </p>

        </div>

        <div className="stat-card">

          <h2>
            340h
          </h2>

          <p>
            Total Watch Time
          </p>

        </div>

      </div>

      {/* ACCOUNT SETTINGS */}

      <div className="settings-section">

        <h2>
          Account Settings
        </h2>

        <div className="settings-card">

          <div className="setting-item">

            <div>

              <h3>
                Change Password
              </h3>

              <p>
                Update your account password
              </p>

            </div>

            <button>
              Update
            </button>

          </div>

          <div className="setting-item">

            <div>

              <h3>
                Manage Subscription
              </h3>

              <p>
                Upgrade or manage your plan
              </p>

            </div>

            <button>
              Manage
            </button>

          </div>

          <div className="setting-item">

            <div>

              <h3>
                Logout
              </h3>

              <p>
                Sign out from LumixPlay
              </p>

            </div>

            <button className="logout-btn">
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Profile;
import React from "react";

import "./Reports.css";

function Reports() {

  const topMovies = [

    {
      title: "Interstellar",
      views: "25K"
    },

    {
      title: "Avengers Endgame",
      views: "22K"
    },

    {
      title: "Batman",
      views: "18K"
    },

    {
      title: "Joker",
      views: "15K"
    }

  ];

  return (

    <div className="reports-page">

      <h1>
        Reports & Analytics
      </h1>

      {/* ANALYTICS CARDS */}

      <div className="analytics-grid">

        <div className="analytics-card">

          <h2>
            120K
          </h2>

          <p>
            Total Views
          </p>

        </div>

        <div className="analytics-card">

          <h2>
            3,245
          </h2>

          <p>
            Active Users
          </p>

        </div>

        <div className="analytics-card">

          <h2>
            87%
          </h2>

          <p>
            User Engagement
          </p>

        </div>

      </div>

      {/* TOP MOVIES */}

      <div className="top-movies-section">

        <h2>
          Top Viewed Movies
        </h2>

        <div className="top-movies-list">

          {
            topMovies.map((movie, index) => (

              <div
                className="top-movie-item"
                key={index}
              >

                <div>

                  <h3>
                    {movie.title}
                  </h3>

                  <p>
                    {movie.views} Views
                  </p>

                </div>

                <div className="movie-progress">

                  <div
                    className="movie-progress-fill"
                    style={{
                      width:
                      `${90 - index * 15}%`
                    }}
                  ></div>

                </div>

              </div>

            ))
          }

        </div>

      </div>

      {/* REPORT TABLE */}

      <div className="report-table-wrapper">

        <table className="report-table">

          <thead>

            <tr>

              <th>Movie</th>

              <th>Views</th>

              <th>Watchlist Adds</th>

              <th>Rating</th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td>Interstellar</td>

              <td>25K</td>

              <td>4.2K</td>

              <td>8.7</td>

            </tr>

            <tr>

              <td>Batman</td>

              <td>18K</td>

              <td>3.1K</td>

              <td>8.3</td>

            </tr>

            <tr>

              <td>Joker</td>

              <td>15K</td>

              <td>2.8K</td>

              <td>8.5</td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Reports;
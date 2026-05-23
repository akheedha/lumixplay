import React from "react";

import "./Watchlist.css";

function Watchlist() {

  const movies = [

    {
      title: "Interstellar",
      image:
        "https://wallpapercave.com/wp/wp1817978.jpg"
    },

    {
      title: "Batman",
      image:
        "https://wallpapercave.com/wp/wp5344288.jpg"
    },

    {
      title: "Joker",
      image:
        "https://wallpapercave.com/wp/wp1945903.jpg"
    },

    {
      title: "Avengers",
      image:
        "https://wallpapercave.com/wp/wp4431823.jpg"
    }

  ];

  return (

    <div className="watchlist-page">

      <h1 className="watchlist-title">
        My Watchlist
      </h1>

      {/* CONTINUE WATCHING */}

      <div className="continue-section">

        <h2>
          Continue Watching
        </h2>

        <div className="continue-card">

          <img
            src="https://wallpapercave.com/wp/wp1817978.jpg"
            alt="movie"
          />

          <div className="continue-content">

            <h3>
              Interstellar
            </h3>

            <p>
              1h 12m watched
            </p>

            <div className="progress-bar">

              <div className="progress-fill"></div>

            </div>

          </div>

        </div>

      </div>

      {/* SAVED MOVIES */}

      <div className="saved-section">

        <h2>
          Saved Movies
        </h2>

        <div className="watchlist-grid">

          {
            movies.map((movie, index) => (

              <div className="watchlist-card" key={index}>

                <img
                  src={movie.image}
                  alt={movie.title}
                />

                <div className="watchlist-overlay">

                  <h3>
                    {movie.title}
                  </h3>

                  <div className="watchlist-buttons">

                    <button>
                      ▶ Watch
                    </button>

                    <button className="remove-btn">
                      Remove
                    </button>

                  </div>

                </div>

              </div>

            ))
          }

        </div>

      </div>

    </div>

  );

}

export default Watchlist;
import React from "react";

import { Link } from "react-router-dom";

import "./Home.css";

import MovieRow from "../../components/user/MovieRow";

function Home() {

  return (

    <div className="home-page">

      {/* HERO SECTION */}

      <div className="hero-banner">

        <div className="hero-overlay">

          <div className="hero-content">

            <h1>
              INTERSTELLAR
            </h1>

            <p>
              A team of explorers travel through a wormhole
              in space in an attempt to ensure humanity's
              survival.
            </p>

            <div className="hero-buttons">

              <Link to="/player">

                <button className="watch-btn">
                  ▶ Watch Now
                </button>

              </Link>

              <button className="plus-btn">
                +
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* MOVIE ROWS */}

      <MovieRow title="Continue Watching" />

      <MovieRow title="Trending Now" />

      <MovieRow title="Popular Movies" />

      <MovieRow title="Top Rated" />

      <MovieRow title="Sci-Fi Collection" />

    </div>

  );

}

export default Home;
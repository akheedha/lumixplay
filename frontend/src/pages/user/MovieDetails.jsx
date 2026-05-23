import React from "react";

import { motion } from "framer-motion";

import {
  FaPlay,
  FaPlus,
  FaStar
} from "react-icons/fa";

import "./MovieDetails.css";

import MovieRow from "../../components/user/MovieRow";

function MovieDetails() {

  return (

    <motion.div
      className="movie-details-page"

      initial={{ opacity:0 }}
      animate={{ opacity:1 }}

      transition={{ duration:0.5 }}
    >

      {/* HERO BANNER */}

      <div className="details-hero">

        {/* OVERLAY */}

        <div className="details-overlay">

          <div className="details-content">

            {/* MOVIE INFO */}

            <div className="details-meta">

              <span>
                Sci-Fi
              </span>

              <span>
                Adventure
              </span>

              <span>
                2h 49m
              </span>

              <span className="rating">

                <FaStar />

                8.7

              </span>

            </div>

            {/* TITLE */}

            <h1>
              INTERSTELLAR
            </h1>

            {/* DESCRIPTION */}

            <p>
              A team of explorers travel through a wormhole
              in space in an attempt to ensure humanity's
              survival. As Earth faces extinction, Cooper
              and his crew embark on the most important
              mission in human history.
            </p>

            {/* BUTTONS */}

            <div className="details-buttons">

              <button className="play-btn">

                <FaPlay />

                Watch Now

              </button>

              <button className="watchlist-btn">

                <FaPlus />

                Watchlist

              </button>

            </div>

          </div>

        </div>

      </div>

      {/* STORY SECTION */}

      <div className="story-section">

        <div className="glass-card">

          <h2>
            Storyline
          </h2>

          <p>
            In the near future, Earth becomes uninhabitable.
            Former NASA pilot Cooper joins a mission through
            a mysterious wormhole to search for a new home
            for humanity. Facing black holes, time dilation,
            and emotional sacrifice, the crew fights to save
            civilization itself.
          </p>

        </div>

        {/* CAST */}

        <div className="glass-card">

          <h2>
            Cast
          </h2>

          <div className="cast-list">

            <div className="cast-item">
              Matthew McConaughey
            </div>

            <div className="cast-item">
              Anne Hathaway
            </div>

            <div className="cast-item">
              Jessica Chastain
            </div>

            <div className="cast-item">
              Michael Caine
            </div>

          </div>

        </div>

      </div>

      {/* RELATED MOVIES */}

      <MovieRow title="More Like This" />

    </motion.div>

  );

}

export default MovieDetails;
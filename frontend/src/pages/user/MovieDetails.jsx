import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { Link, useParams } from "react-router-dom";

import {
  FaPlay,
  FaPlus,
  FaStar
} from "react-icons/fa";

import "./MovieDetails.css";

import MovieRow from "../../components/user/MovieRow";
import { api, imageFor } from "../../services/api";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api(`/movies/${id}/`).then((data) => setMovie(data.movie)).catch(console.error);
    api("/movies/").then((data) => setMovies(data.movies)).catch(console.error);
  }, [id]);

  if (!movie) {
    return <div className="movie-details-page"></div>;
  }

  return (
    <motion.div
      className="movie-details-page"
      initial={{ opacity:0 }}
      animate={{ opacity:1 }}
      transition={{ duration:0.5 }}
    >
      <div
        className="details-hero"
        style={{ backgroundImage: `url(${imageFor(movie)})` }}
      >
        <div className="details-overlay">
          <div className="details-content">
            <div className="details-meta">
              <span>{movie.genre || "Movie"}</span>
              <span>{movie.release_year}</span>
              <span>{movie.view_count} views</span>
              <span className="rating">
                <FaStar />
                8.7
              </span>
            </div>

            <h1>{movie.title}</h1>
            <p>{movie.description}</p>

            <div className="details-buttons">
              <Link to={`/player/${movie.id}`}>
                <button className="play-btn">
                  <FaPlay />
                  Watch Now
                </button>
              </Link>

              <button
                className="watchlist-btn"
                onClick={() => api(`/watchlist/${movie.id}/`, { method: "POST" })}
              >
                <FaPlus />
                Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="story-section">
        <div className="glass-card">
          <h2>Storyline</h2>
          <p>{movie.description}</p>
        </div>

        <div className="glass-card">
          <h2>Stats</h2>
          <div className="cast-list">
            <div className="cast-item">{movie.view_count} views</div>
            <div className="cast-item">{movie.watchlist_count} watchlist adds</div>
          </div>
        </div>
      </div>

      <MovieRow title="More Like This" movies={movies.filter((item) => item.id !== movie.id)} />
    </motion.div>
  );
}

export default MovieDetails;

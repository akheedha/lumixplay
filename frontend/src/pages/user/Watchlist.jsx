import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import "./Watchlist.css";

import { EmptyState, LoadingGrid } from "../../components/common/StateBlocks";
import { api, imageFor } from "../../services/api";

function Watchlist() {
  const [movies, setMovies] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const [watchlistData, historyData] = await Promise.all([
        api("/watchlist/"),
        api("/history/"),
      ]);
      setMovies(watchlistData.movies);
      setHistory(historyData.history);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (movieId) => {
    await api(`/watchlist/${movieId}/`, { method: "DELETE" });
    load().catch(console.error);
  };

  useEffect(() => {
    load().catch(console.error);
  }, []);

  const latest = history[0]?.movie;

  return (
    <div className="watchlist-page">
      <h1 className="watchlist-title">My Watchlist</h1>

      <div className="continue-section">
        <h2>Continue Watching</h2>
        {latest ? (
          <Link to={`/player/${latest.id}`} className="continue-card">
            <img src={imageFor(latest)} alt={latest.title} />
            <div className="continue-content">
              <h3>{latest.title}</h3>
              <p>{history[0].view_count} view session{history[0].view_count > 1 ? "s" : ""}</p>
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
            </div>
          </Link>
        ) : (
          <EmptyState title="Nothing watched yet" message="Start a movie and it will appear here." />
        )}
      </div>

      <div className="saved-section">
        <h2>Saved Movies</h2>
        <div className="watchlist-grid">
          {loading ? (
            <LoadingGrid count={4} />
          ) : movies.length === 0 ? (
            <EmptyState title="Your watchlist is empty" message="Add movies from Home or Search to keep them here." />
          ) : movies.map((movie) => (
            <div className="watchlist-card" key={movie.id}>
              <img src={imageFor(movie)} alt={movie.title} loading="lazy" />
              <div className="watchlist-overlay">
                <h3>{movie.title}</h3>
                <div className="watchlist-buttons">
                  <Link to={`/player/${movie.id}`}><button>Watch</button></Link>
                  <button className="remove-btn" onClick={() => remove(movie.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Watchlist;

import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import "./Search.css";

import { EmptyState, LoadingGrid } from "../../components/common/StateBlocks";
import { api, imageFor } from "../../services/api";

function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      api(`/movies/?q=${encodeURIComponent(query)}`)
        .then((data) => setMovies(data.movies))
        .catch(console.error)
        .finally(() => setLoading(false));
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="search-page">
      <div className="search-header">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <div className="search-filters">
        <button className="active-filter">All</button>
        <button>Movies</button>
        <button>Action</button>
        <button>Sci-Fi</button>
        <button>Drama</button>
      </div>

      <div className="search-grid">
        {loading ? (
          <LoadingGrid count={6} />
        ) : movies.length === 0 ? (
          <EmptyState title="No matches found" message="Try a different title or clear your search." />
        ) : movies.map((movie) => (
          <div className="search-card" key={movie.id}>
            <img src={imageFor(movie)} alt={movie.title} loading="lazy" />
            <div className="search-overlay">
              <h3>{movie.title}</h3>
              <Link to={`/player/${movie.id}`}>
                <button>Watch</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;

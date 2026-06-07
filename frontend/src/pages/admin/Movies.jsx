import React, { useCallback, useEffect, useState } from "react";

import {
  FaEdit,
  FaTrash
} from "react-icons/fa";

import { Link } from "react-router-dom";

import "./Movies.css";

import { EmptyState } from "../../components/common/StateBlocks";
import { api } from "../../services/api";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    const data = await api(`/movies/?q=${encodeURIComponent(query)}`);
    setMovies(data.movies);
  }, [query]);

  const remove = async (movieId) => {
    await api(`/movies/${movieId}/`, { method: "DELETE" });
    load().catch(console.error);
  };

  useEffect(() => {
    load().catch(console.error);
  }, [load]);

  return (
    <div className="movies-page">
      <div className="movies-header">
        <h1>Movies Management</h1>
        <Link to="/admin/add-movie">
          <button className="add-movie-btn">+ Add Movie</button>
        </Link>
      </div>

      <div className="movies-search">
        <input type="text" placeholder="Search movies..." value={query} onChange={(event) => setQuery(event.target.value)} />
      </div>

      <div className="movies-table-wrapper">
        <table className="movies-table">
          <thead>
            <tr>
              <th>Movie</th>
              <th>Genre</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.length === 0 ? (
              <tr>
                <td colSpan="4">
                  <EmptyState title="No movies found" message="Add a movie or adjust your search." />
                </td>
              </tr>
            ) : movies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.title}</td>
                <td>{movie.genre}</td>
                <td>{movie.release_year}</td>
                <td>
                  <div className="action-buttons">
                    <Link to={`/admin/add-movie?id=${movie.id}`}>
                      <button className="edit-btn"><FaEdit /></button>
                    </Link>
                    <button className="delete-btn" onClick={() => remove(movie.id)}><FaTrash /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Movies;

import React, { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import "./AddMovie.css";

import { api } from "../../services/api";

const emptyMovie = {
  title: "",
  genre: "",
  release_year: "",
  description: "",
  thumbnail_url: "",
  video_url: "",
};

function AddMovie() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const movieId = params.get("id");
  const [form, setForm] = useState(emptyMovie);
  const [error, setError] = useState("");

  useEffect(() => {
    if (movieId) {
      api(`/movies/${movieId}/`).then((data) => setForm(data.movie)).catch(console.error);
    }
  }, [movieId]);

  const update = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await api(movieId ? `/movies/${movieId}/` : "/movies/", {
        method: movieId ? "PUT" : "POST",
        body: JSON.stringify(form),
      });
      navigate("/admin/movies");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="add-movie-page">
      <h1>{movieId ? "Edit Movie" : "Add New Movie"}</h1>

      <form className="movie-form" onSubmit={submit}>
        <div className="form-group">
          <label>Movie Title</label>
          <input type="text" placeholder="Enter movie title" value={form.title} onChange={(event) => update("title", event.target.value)} />
        </div>

        <div className="form-group">
          <label>Genre</label>
          <input type="text" placeholder="Action, Drama, Sci-Fi" value={form.genre} onChange={(event) => update("genre", event.target.value)} />
        </div>

        <div className="form-group">
          <label>Release Year</label>
          <input type="number" placeholder="2026" value={form.release_year || ""} onChange={(event) => update("release_year", event.target.value)} />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea rows="5" placeholder="Movie description..." value={form.description} onChange={(event) => update("description", event.target.value)}></textarea>
        </div>

        <div className="form-group">
          <label>Thumbnail URL</label>
          <input type="url" placeholder="https://..." value={form.thumbnail_url || ""} onChange={(event) => update("thumbnail_url", event.target.value)} />
        </div>

        <div className="form-group">
          <label>Movie Video URL</label>
          <input type="url" placeholder="YouTube or MP4 URL" value={form.video_url || ""} onChange={(event) => update("video_url", event.target.value)} />
        </div>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="submit-movie-btn">Save Movie</button>
      </form>
    </div>
  );
}

export default AddMovie;

import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import "./VideoPlayer.css";

import { api, imageFor } from "../../services/api";

function youtubeEmbedUrl(url) {
  if (!url) {
    return "";
  }
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : "";
}

function VideoPlayer() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api(`/movies/${id}/watch/`, { method: "POST" })
      .then((data) => setMovie(data.movie))
      .catch(console.error);
    api("/movies/").then((data) => setMovies(data.movies)).catch(console.error);
  }, [id]);

  if (!movie) {
    return <div className="player-page"></div>;
  }

  const youtubeUrl = youtubeEmbedUrl(movie.video_url);

  return (
    <div className="player-page">
      <div className="video-container">
        {youtubeUrl ? (
          <iframe
            className="movie-video"
            src={youtubeUrl}
            title={movie.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ) : (
          <video className="movie-video" controls autoPlay poster={imageFor(movie)}>
            <source src={movie.video_url || "https://www.w3schools.com/html/mov_bbb.mp4"} type="video/mp4" />
          </video>
        )}

        <div className="video-overlay">
          <div className="player-top">
            <h1>{movie.title}</h1>
            <span>{movie.genre} - {movie.release_year}</span>
          </div>
        </div>
      </div>

      <div className="next-section">
        <h2>Up Next</h2>
        <div className="next-grid">
          {movies.filter((item) => item.id !== movie.id).slice(0, 3).map((item) => (
            <Link to={`/player/${item.id}`} className="next-card" key={item.id}>
              <img src={imageFor(item)} alt={item.title} />
              <h3>{item.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;

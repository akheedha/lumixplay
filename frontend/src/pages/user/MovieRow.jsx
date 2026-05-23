import React from "react";
import {
  FaPlay,
  FaPlus
} from "react-icons/fa";

import "./MovieRow.css";

function MovieRow({ title }) {

  const movies = [

    {
      name: "The Dark Knight",
      image:
        "https://wallpapercave.com/wp/wp4056410.jpg",
      year: "2008",
      duration: "2h 32m"
    },

    {
      name: "Interstellar",
      image:
        "https://wallpapercave.com/wp/wp1817978.jpg",
      year: "2014",
      duration: "2h 49m"
    },

    {
      name: "Avengers Endgame",
      image:
        "https://wallpapercave.com/wp/wp4431823.jpg",
      year: "2019",
      duration: "3h 1m"
    },

    {
      name: "Joker",
      image:
        "https://wallpapercave.com/wp/wp1945903.jpg",
      year: "2019",
      duration: "2h 2m"
    },

    {
      name: "Batman",
      image:
        "https://wallpapercave.com/wp/wp5344288.jpg",
      year: "2022",
      duration: "2h 56m"
    }

  ];

  return (

    <div className="movie-row-section">

      <h2 className="movie-row-title">
        {title}
      </h2>

      <div className="movie-row-container">

        {
          movies.map((movie, index) => (

            <div className="movie-card" key={index}>

              <img
                src={movie.image}
                alt={movie.name}
              />

              {/* FLOATING CARD */}

              <div className="hover-preview">

                <img
                  src={movie.image}
                  alt={movie.name}
                />

                <div className="preview-content">

                  <div className="preview-buttons">

                    <button className="watch-now">
                      <FaPlay />
                    </button>

                    <button className="add-btn">
                      <FaPlus />
                    </button>

                  </div>

                  <h3>
                    {movie.name}
                  </h3>

                  <p>
                    {movie.year} • {movie.duration}
                  </p>

                </div>

              </div>

            </div>

          ))
        }

      </div>

    </div>

  );

}

export default MovieRow;
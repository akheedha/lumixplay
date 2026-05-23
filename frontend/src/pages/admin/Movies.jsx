import React from "react";

import {
  FaEdit,
  FaTrash
} from "react-icons/fa";

import "./Movies.css";

function Movies() {

  const movies = [

    {
      title: "Interstellar",
      genre: "Sci-Fi",
      year: "2014"
    },

    {
      title: "Batman",
      genre: "Action",
      year: "2022"
    },

    {
      title: "Joker",
      genre: "Drama",
      year: "2019"
    },

    {
      title: "Avengers Endgame",
      genre: "Action",
      year: "2019"
    }

  ];

  return (

    <div className="movies-page">

      {/* HEADER */}

      <div className="movies-header">

        <h1>
          Movies Management
        </h1>

        <button className="add-movie-btn">
          + Add Movie
        </button>

      </div>

      {/* SEARCH */}

      <div className="movies-search">

        <input
          type="text"
          placeholder="Search movies..."
        />

      </div>

      {/* TABLE */}

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

            {
              movies.map((movie, index) => (

                <tr key={index}>

                  <td>{movie.title}</td>

                  <td>{movie.genre}</td>

                  <td>{movie.year}</td>

                  <td>

                    <div className="action-buttons">

                      <button className="edit-btn">

                        <FaEdit />

                      </button>

                      <button className="delete-btn">

                        <FaTrash />

                      </button>

                    </div>

                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Movies;
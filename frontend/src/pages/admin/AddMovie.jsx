import React from "react";

import "./AddMovie.css";

function AddMovie() {

  return (

    <div className="add-movie-page">

      <h1>
        Add New Movie
      </h1>

      <form className="movie-form">

        {/* TITLE */}

        <div className="form-group">

          <label>
            Movie Title
          </label>

          <input
            type="text"
            placeholder="Enter movie title"
          />

        </div>

        {/* GENRE */}

        <div className="form-group">

          <label>
            Genre
          </label>

          <select>

            <option>
              Select Genre
            </option>

            <option>
              Action
            </option>

            <option>
              Drama
            </option>

            <option>
              Sci-Fi
            </option>

            <option>
              Thriller
            </option>

          </select>

        </div>

        {/* YEAR */}

        <div className="form-group">

          <label>
            Release Year
          </label>

          <input
            type="number"
            placeholder="2025"
          />

        </div>

        {/* DESCRIPTION */}

        <div className="form-group">

          <label>
            Description
          </label>

          <textarea
            rows="5"
            placeholder="Movie description..."
          ></textarea>

        </div>

        {/* POSTER */}

        <div className="form-group">

          <label>
            Upload Poster
          </label>

          <input type="file" />

        </div>

        {/* VIDEO */}

        <div className="form-group">

          <label>
            Upload Movie Video
          </label>

          <input type="file" />

        </div>

        {/* BUTTON */}

        <button
          type="submit"
          className="submit-movie-btn"
        >
          Save Movie
        </button>

      </form>

    </div>

  );

}

export default AddMovie;
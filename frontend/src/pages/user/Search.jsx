import React from "react";

import "./Search.css";

function Search() {

  const movies = [

    {
      title: "Interstellar",
      image:
        "https://wallpapercave.com/wp/wp1817978.jpg"
    },

    {
      title: "Batman",
      image:
        "https://wallpapercave.com/wp/wp5344288.jpg"
    },

    {
      title: "Avengers",
      image:
        "https://wallpapercave.com/wp/wp4431823.jpg"
    },

    {
      title: "Joker",
      image:
        "https://wallpapercave.com/wp/wp1945903.jpg"
    },

    {
      title: "Dark Knight",
      image:
        "https://wallpapercave.com/wp/wp4056410.jpg"
    },

    {
      title: "Matrix",
      image:
        "https://wallpapercave.com/wp/wp2014282.jpg"
    }

  ];

  return (

    <div className="search-page">

      {/* SEARCH BAR */}

      <div className="search-header">

        <input
          type="text"
          placeholder="Search movies, shows..."
        />

      </div>

      {/* FILTERS */}

      <div className="search-filters">

        <button className="active-filter">
          All
        </button>

        <button>
          Movies
        </button>

        <button>
          TV Shows
        </button>

        <button>
          Action
        </button>

        <button>
          Sci-Fi
        </button>

      </div>

      {/* MOVIE GRID */}

      <div className="search-grid">

        {
          movies.map((movie, index) => (

            <div className="search-card" key={index}>

              <img
                src={movie.image}
                alt={movie.title}
              />

              <div className="search-overlay">

                <h3>
                  {movie.title}
                </h3>

                <button>
                  ▶ Watch
                </button>

              </div>

            </div>

          ))
        }

      </div>

    </div>

  );

}

export default Search;
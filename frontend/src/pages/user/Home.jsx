import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

import { Link } from "react-router-dom";

import { toast } from "react-hot-toast";

import "./Home.css";

import MovieRow from "../../components/user/MovieRow";
import { LoadingGrid } from "../../components/common/StateBlocks";
import { api, imageFor } from "../../services/api";

function Home() {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const featured = movies[0];

  const trending = useMemo(
    () =>
      [...movies].sort(
        (a, b) => b.view_count - a.view_count
      ),
    [movies]
  );

  const popular = useMemo(
    () => movies.slice().reverse(),
    [movies]
  );

  const newReleases = useMemo(
    () =>
      [...movies].sort(
        (a, b) =>
          (b.release_year || 0) -
          (a.release_year || 0)
      ),
    [movies]
  );

  const sciFi = useMemo(
    () =>
      movies.filter((movie) =>
        movie.genre.includes("Sci-Fi")
      ),
    [movies]
  );

  const loadMovies = useCallback(async () => {

    try {

      const data = await api("/movies/");

      setMovies(data.movies);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }, []);

  useEffect(() => {

    loadMovies();

  }, [loadMovies]);

  const addFeaturedToWatchlist = async () => {

    if (!featured) return;

    try {

      const data = await api(
        `/watchlist/${featured.id}/`,
        {
          method: "POST"
        }
      );

      if (
        data.message &&
        data.message.toLowerCase().includes("removed")
      ) {
        toast("Removed from watchlist");
      } else {
        toast.success("Added to watchlist");
      }

      loadMovies();

    } catch (error) {

      toast.error(
        error.message ||
        "Failed to update watchlist"
      );

    }

  };

  return (

    <div className="home-page">

      <div
        className="hero-banner"
        style={
          featured
            ? {
                backgroundImage: `
                linear-gradient(
                  to right,
                  rgba(2,6,18,0.92),
                  rgba(2,6,18,0.26)
                ),
                url(${imageFor(featured)})
              `
              }
            : undefined
        }
      >

        <div className="hero-overlay">

          <div className="hero-content">

            <h1>
              {featured
                ? featured.title
                : "LumixPlay"}
            </h1>

            <p>
              {featured
                ? featured.description
                : "Loading movies..."}
            </p>

            <div className="hero-buttons">

              <Link
                to={
                  featured
                    ? `/player/${featured.id}`
                    : "/login"
                }
              >
                <button className="watch-btn">
                  Watch Now
                </button>
              </Link>

              <button
                className="plus-btn"
                onClick={addFeaturedToWatchlist}
              >
                +
              </button>

            </div>

          </div>

        </div>

      </div>

      {loading ? (

        <div className="home-loading">
          <LoadingGrid count={6} />
        </div>

      ) : (

        <>
          <MovieRow
            title="Browse Movies"
            movies={movies}
            onChanged={loadMovies}
          />

          <MovieRow
            title="Trending Now"
            movies={trending}
            onChanged={loadMovies}
          />

          <MovieRow
            title="Popular Movies"
            movies={popular}
            onChanged={loadMovies}
          />

          <MovieRow
            title="New Releases"
            movies={newReleases}
            onChanged={loadMovies}
          />

          <MovieRow
            title="Sci-Fi Collection"
            movies={sciFi}
            onChanged={loadMovies}
          />
        </>

      )}

    </div>

  );

}

export default Home;
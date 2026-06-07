import React from "react";

import {
  Swiper,
  SwiperSlide
} from "swiper/react";

import {
  Navigation
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import {
  Link
} from "react-router-dom";

import {
  FaPlay,
  FaPlus
} from "react-icons/fa";

import { toast } from "react-hot-toast";

import "./MovieRow.css";

import { EmptyState } from "../common/StateBlocks";
import { api, imageFor } from "../../services/api";

function MovieRow({ title, movies = [], onChanged }) {

  const addToWatchlist = async (movieId) => {

    try {

      const data = await api(
        `/watchlist/${movieId}/`,
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

      if (onChanged) {
        onChanged();
      }

    } catch (error) {

      toast.error(
        error.message || "Failed to update watchlist"
      );

    }

  };

  return (

    <div className="movie-row">

      <div className="movie-row-header">

        <h2>{title}</h2>

        <span>See All</span>

      </div>

      {movies.length === 0 ? (

        <EmptyState
          title="No movies yet"
          message="New titles will appear here as soon as they are added."
        />

      ) : (

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          breakpoints={{
            320: {
              slidesPerView: 2
            },
            768: {
              slidesPerView: 3
            },
            1024: {
              slidesPerView: 5
            },
            1400: {
              slidesPerView: 6
            }
          }}
        >

          {movies.map((movie) => (

            <SwiperSlide key={movie.id}>

              <div className="movie-card">

                <img
                  src={imageFor(movie)}
                  alt={movie.title}
                  loading="lazy"
                />

                <div className="movie-overlay">

                  <h3>{movie.title}</h3>

                  <div className="movie-buttons">

                    <Link to={`/player/${movie.id}`}>
                      <button>
                        <FaPlay />
                      </button>
                    </Link>

                    <button
                      onClick={() =>
                        addToWatchlist(movie.id)
                      }
                    >
                      <FaPlus />
                    </button>

                  </div>

                </div>

              </div>

            </SwiperSlide>

          ))}

        </Swiper>

      )}

    </div>

  );

}

export default React.memo(MovieRow);
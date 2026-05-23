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
  FaPlay,
  FaPlus
} from "react-icons/fa";

import "./MovieRow.css";

const movies = [

  {
    title:"Batman",
    image:"https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg"
  },

  {
    title:"Joker",
    image:"https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
  },

  {
    title:"Interstellar",
    image:"https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
  },

  {
    title:"John Wick",
    image:"https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg"
  },

  {
    title:"Avengers",
    image:"https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
  },

  {
    title:"Oppenheimer",
    image:"https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
  }

];

function MovieRow({ title }) {

  return (

    <div className="movie-row">

      <div className="movie-row-header">

        <h2>{title}</h2>

        <span>See All</span>

      </div>

      <Swiper

        modules={[Navigation]}

        navigation

        spaceBetween={20}

        breakpoints={{

          320:{
            slidesPerView:2
          },

          768:{
            slidesPerView:3
          },

          1024:{
            slidesPerView:5
          },

          1400:{
            slidesPerView:6
          }

        }}

      >

        {
          movies.map((movie,index)=>(

            <SwiperSlide key={index}>

              <div className="movie-card">

                <img
                  src={movie.image}
                  alt={movie.title}
                />

                {/* HOVER OVERLAY */}

                <div className="movie-overlay">

                  <h3>
                    {movie.title}
                  </h3>

                  <div className="movie-buttons">

                    <button>
                      <FaPlay />
                    </button>

                    <button>
                      <FaPlus />
                    </button>

                  </div>

                </div>

              </div>

            </SwiperSlide>

          ))
        }

      </Swiper>

    </div>

  );

}

export default MovieRow;
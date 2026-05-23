import React from "react";

import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaExpand,
  FaStepForward
} from "react-icons/fa";

import "./VideoPlayer.css";

function VideoPlayer() {

  return (

    <div className="player-page">

      {/* VIDEO SECTION */}

      <div className="video-container">

        <video
          className="movie-video"
          controls
          autoPlay
        >

          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />

        </video>

        {/* OVERLAY */}

        <div className="video-overlay">

          {/* TOP */}

          <div className="player-top">

            <h1>
              Interstellar
            </h1>

            <span>
              Sci-Fi • Adventure • 2h 49m
            </span>

          </div>

          {/* CENTER */}

          <div className="player-center">

            <button className="skip-btn">
              Skip Intro
            </button>

          </div>

          {/* BOTTOM CONTROLS */}

          <div className="player-controls">

            {/* PROGRESS */}

            <div className="progress-wrapper">

              <div className="progress-bar-player">

                <div className="progress-fill-player"></div>

              </div>

            </div>

            {/* CONTROLS */}

            <div className="controls-row">

              <div className="left-controls">

                <button>
                  <FaPlay />
                </button>

                <button>
                  <FaPause />
                </button>

                <button>
                  <FaVolumeUp />
                </button>

              </div>

              <div className="right-controls">

                <button>
                  <FaStepForward />
                </button>

                <button>
                  <FaExpand />
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* NEXT MOVIES */}

      <div className="next-section">

        <h2>
          Up Next
        </h2>

        <div className="next-grid">

          <div className="next-card">

            <img
              src="https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg"
              alt=""
            />

            <h3>
              Batman
            </h3>

          </div>

          <div className="next-card">

            <img
              src="https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg"
              alt=""
            />

            <h3>
              John Wick
            </h3>

          </div>

          <div className="next-card">

            <img
              src="https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
              alt=""
            />

            <h3>
              Oppenheimer
            </h3>

          </div>

        </div>

      </div>

    </div>

  );

}

export default VideoPlayer;
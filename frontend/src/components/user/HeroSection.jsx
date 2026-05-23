import React from "react";
import "./HeroSection.css";

function HeroSection() {

  return (

    <section className="hero-section">

      <div className="hero-overlay">

        <div className="hero-content container">

          <h1 className="hero-title">
            THE DARK KNIGHT
          </h1>

          <p className="hero-description">
            Batman raises the stakes in his war on crime.
            With the help of Lt. Jim Gordon and District
            Attorney Harvey Dent, Batman sets out to dismantle
            the remaining criminal organizations that plague Gotham.
          </p>

          <div className="hero-buttons">

            <button className="play-btn">
              ▶ Play Now
            </button>

            <button className="info-btn">
              More Info
            </button>

          </div>

        </div>

      </div>

    </section>

  );

}

export default HeroSection;
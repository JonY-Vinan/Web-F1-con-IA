// src/pages/HomeTrackAction.jsx
import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-track-action">
      <div className="overlay-track-action"></div>
      <div className="content-track-action">
        <h1 className="title-track-action">Adrenalina pura, en cada <span className="highlight-track-action">vuelta</span></h1>
        <p className="description-track-action">
          No te pierdas los momentos más emocionantes de la temporada. ¡La competición está más viva que nunca!
        </p>
        <a href="#" className="btn-track-action">Ver Carreras</a>
      </div>
    </div>
  );
}
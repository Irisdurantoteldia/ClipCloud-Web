import React from "react";
import { useParams } from "react-router-dom";
import "./VideoPlayer.css";

export default function VideoPlayer() {
  const { videoId } = useParams(); // Agafem el videoId des de la URL

  return (
    <div className="video-player-container">
      <iframe
        className="video-frame"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allowFullScreen
      ></iframe>
    </div>
  );
}

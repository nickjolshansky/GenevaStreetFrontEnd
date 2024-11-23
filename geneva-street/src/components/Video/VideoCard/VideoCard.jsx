import React, { useState } from "react";
import "./VideoCard.css";
import { thumbnailsrc } from "./../../../utils/source";

function VideoCard({ video }) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("/static.jpg");
  const thumbnailUrl = `${thumbnailsrc}${video.thumbnail}`;

  const handleImageLoad = () => {
    setHasLoaded(true);
    setImageSrc(thumbnailUrl);
  };

  return (
    <div className="video-card">
      <img
        src={imageSrc}
        alt={video.title}
        onLoad={handleImageLoad}
        onError={() => setHasLoaded(true)}
        style={{ width: "100%", height: "auto" }}
      />
      <h5>{video.title.toUpperCase()}</h5>
      <p>{video.year ?? ""}</p>
    </div>
  );
}

export default VideoCard;

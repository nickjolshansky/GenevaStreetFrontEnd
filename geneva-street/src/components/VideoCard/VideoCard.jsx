import React, { useState } from "react";
import "./VideoCard.css";
import { rootsrc } from "./../../utils/source";

function VideoCard({ video }) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("/thumbnailTemp.jpg");
  const thumbnailUrl = `${rootsrc}/videos/thumbnail-src/${video.thumbnail}`;

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
      <h4>{video.title.toUpperCase()}</h4>
      <h5>{video.year ?? ""}</h5>
    </div>
  );
}

export default VideoCard;

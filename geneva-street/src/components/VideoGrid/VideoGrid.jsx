import React from "react";
import { Link } from "react-router-dom";
import "./VideoGrid.css";
import VideoCard from "../VideoCard/VideoCard";

function VideoGrid({ videos = [] }) {
  return (
    <>
      <div className="video-grid">
        {videos.length !== 0 &&
          videos.map((video) => (
            <Link
              key={video.id}
              to={`/videos/${video.id}`}
              style={{ textDecoration: "none" }}
            >
              <VideoCard video={video} />
            </Link>
          ))}

        {videos.length === 0 && <div>NO VIDEOS FOUND</div>}
      </div>
    </>
  );
}

export default VideoGrid;

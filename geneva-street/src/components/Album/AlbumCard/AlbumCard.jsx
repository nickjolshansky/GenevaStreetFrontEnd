import React from "react";
import "./AlbumCard.css";
import { albumsrc, rootsrc } from "./../../../utils/source.jsx";

function AlbumCard({ album }) {
  let year = album.year ?? "";
  let location = album.location === null ? "" : album.location;

  console.log(album);
  console.log(`year - ${year}`);
  console.log(`loc - ${location}`);

  return (
    <div className="album-card">
      <img src={`${albumsrc}${album.thumbnail_file_name}`} alt={album.title} />
      <div className="album-card-text">
        <div className="album-card-title">{album.title.toUpperCase()}</div>
        <div className="album-card-metadata">
          {year} <br />
          {location}
        </div>
      </div>
    </div>
  );
}

export default AlbumCard;

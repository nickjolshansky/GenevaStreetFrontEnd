import React, { useState, useEffect } from "react";
import "./AlbumCard.css";
import { albumsrc, rootsrc } from "./../../../utils/source.jsx";

function AlbumCard({ album }) {
  return (
    <div className="album-card">
      <img
        src={`${albumsrc}${album.thumbnail_file_name}`}
        alt={album.title}
        style={{ width: "100%", height: "auto" }}
      />
      <div className="album-card-text">
        <div className="album-card-title">{album.title.toUpperCase()}</div>
        <div className="album-card-metadata">
          {(
            <>
              {album.year} <br />
            </>
          ) ?? ""}
          {album.location ?? ""}
        </div>
      </div>
    </div>
  );
}

export default AlbumCard;

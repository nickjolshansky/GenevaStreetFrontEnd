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
      <h3>{album.title.toUpperCase()}</h3>
      <h4>
        {(
          <>
            {album.year} <br />
          </>
        ) ?? ""}
        {album.location ?? ""}
      </h4>
    </div>
  );
}

export default AlbumCard;

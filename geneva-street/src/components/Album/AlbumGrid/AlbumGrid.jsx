import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AlbumGrid.css";
import AlbumCard from "../AlbumCard/AlbumCard.jsx";
import { rootsrc } from "./../../../utils/source.jsx";
import AlbumForm from "../AlbumForm/AlbumForm.jsx";

function AlbumGrid() {
  const [searchedAlbums, setSearchedAlbums] = useState([]);

  //all albums
  useEffect(() => {
    fetch(`${rootsrc}/albums`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchedAlbums(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching album data:", error);
      });
  }, []);

  return (
    <div className="album-page-container">
      <h1>Photo Albums</h1>
      <AlbumForm />
      <div className="album-grid">
        {searchedAlbums.length !== 0 &&
          searchedAlbums.map((album) => (
            <Link
              key={album.id}
              to={`/albums/${album.id}`}
              style={{ textDecoration: "none" }}
            >
              <AlbumCard album={album} />
            </Link>
          ))}

        {searchedAlbums.length === 0 && <div>NO ALBUMS FOUND</div>}
      </div>
    </div>
  );
}

export default AlbumGrid;

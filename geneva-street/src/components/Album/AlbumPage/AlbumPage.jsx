import React, { useState, useEffect } from "react";
import "./AlbumPage.css";
import {
  rootsrc,
  picturesrc,
  albumsrc,
  profilesrc,
} from "../../../utils/source.jsx";
import { useParams } from "react-router-dom";
import { Button, Modal } from "@mui/material";
import PictureUploader from "./PictureUploader.jsx";
import {
  Box,
  Select,
  OutlinedInput,
  Chip,
  MenuItem,
  InputLabel,
  Tooltip,
} from "@mui/material";

function AlbumPage() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [pictures, setPictures] = useState([]);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [openModal, setModalOpen] = useState(false);
  const [picturePeople, setPicturePeople] = useState([]);
  const [allPeople, setAllPeople] = useState([]);
  const [newTaggedPeople, setNewTaggedPeople] = useState([]);

  // Fetch album data
  useEffect(() => {
    fetch(`${rootsrc}/albums/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAlbum(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
      });
  }, [id]);

  // Fetch pictures data
  useEffect(() => {
    if (album) {
      fetch(`${rootsrc}/pictures/album/${album.id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setPictures(data);
            console.log(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching pictures data:", error);
        });
    }
  }, [album]);

  // fetch picture people
  useEffect(() => {
    if (selectedPicture && openModal) {
      fetch(`${rootsrc}/pp/picture/${selectedPicture.id}`)
        .then((response) => {
          if (!response.ok) {
            setPicturePeople([]);
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setPicturePeople(data);
        })
        .catch((error) => {
          console.error("Error fetching picturePeople data:", error);
          setPicturePeople([]);
        });
    }
  }, [selectedPicture, openModal]);

  //all people
  useEffect(() => {
    fetch(`${rootsrc}/people`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAllPeople(data);
      })
      .catch((error) => {
        console.error("Error fetching all people data:", error);
      });
  }, []);

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedPicture(null);
    setPicturePeople([]);
  };

  const handleModalOpen = (picture) => {
    setSelectedPicture(picture);
    setModalOpen(true);
  };

  const onTagSubmit = async () => {
    try {
      if (newTaggedPeople.length > 0) {
        for (const person of newTaggedPeople) {
          await fetch(
            `${rootsrc}/pp/?personId=${person.id}&pictureId=${selectedPicture.id}`,
            {
              method: "POST",
            }
          );
        }
        // Trigger refresh of picture people
        setSelectedPicture({ ...selectedPicture });
        // Clear the selected people after successful submission
        setNewTaggedPeople([]);
      }
    } catch (error) {
      console.error("Error making Tag API call:", error);
    }
  };

  const handleUploadSuccess = () => {
    window.location.reload();
  };

  return (
    <>
      {album === null ? null : (
        <div className="album-title-card">
          <img
            src={`${albumsrc}${album.thumbnail_file_name}`}
            className="album-title-card-thumbnail"
          />
          <div className="album-title-card-info">
            <div className="album-title-card-metadata">
              <b>{album.title}</b>
              <div>{album.year}</div>
              <div>{album.location}</div>
              <div>{album.description}</div>
            </div>

            <div>
              Created by:
              {` ${album.creator.first_name} ${album.creator.last_name}`}
              <PictureUploader
                albumId={id}
                onUploadSuccess={handleUploadSuccess}
              />
            </div>
          </div>
        </div>
      )}

      {pictures.length === 0 && (
        <div className="no-pictures">NO PICTURES FOUND</div>
      )}
      <div className="picture-masonry">
        {pictures.length !== 0 &&
          pictures.map((picture) => (
            <img
              className="picture"
              key={picture.id}
              src={`${picturesrc}${picture.file_name}`}
              alt={picture.title || "Album picture"}
              onClick={() => handleModalOpen(picture)}
            />
          ))}

        <Modal
          open={openModal}
          onClose={handleModalClose}
          className="modal-container"
        >
          <div
            className={`modal-content ${
              picturePeople.length === 0 ? "no-tagged-people" : ""
            }`}
          >
            {selectedPicture ? (
              <>
                <img
                  className="modal-picture"
                  src={`${picturesrc}${selectedPicture.file_name}`}
                  alt={selectedPicture.title || "Album picture"}
                />
                {selectedPicture !== null && picturePeople.length > 0 && (
                  <div className="icon-container-picture">
                    {picturePeople.map((albumPerson) => (
                      <Tooltip
                        title={albumPerson.first_name}
                        key={albumPerson.id}
                      >
                        <img
                          className="icon"
                          src={`${profilesrc}${albumPerson.picture}`}
                          alt={albumPerson.first_name}
                        />
                      </Tooltip>
                    ))}
                  </div>
                )}
                <div className="person-select">
                  <div>
                    <InputLabel id="person-label">Tag a person</InputLabel>
                    <Select
                      sx={{
                        width: "100%",
                        "& .MuiMenuItem-root.Mui-selected": {
                          backgroundColor: "#2196f3", // bright blue background for selected items
                          color: "white", // white text for selected items
                          "&:hover": {
                            backgroundColor: "#1976d2", // slightly darker blue on hover
                          },
                        },
                      }}
                      labelId="person-label"
                      id="select-multiple-chip"
                      multiple
                      value={newTaggedPeople}
                      onChange={(e) => setNewTaggedPeople(e.target.value)}
                      input={<OutlinedInput label="Person" />}
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((person) => (
                            <Chip
                              key={person.id}
                              label={`${person.first_name} ${
                                person.last_name
                              } ${person.suffix || ""}`}
                            />
                          ))}
                        </Box>
                      )}
                    >
                      {allPeople
                        .sort((a, b) => {
                          const firstNameCompare = a.first_name.localeCompare(
                            b.first_name
                          );
                          if (firstNameCompare !== 0) return firstNameCompare;
                          return a.last_name.localeCompare(b.last_name);
                        })
                        .map((person) => (
                          <MenuItem key={person.id} value={person}>
                            {person.first_name} {person.last_name}
                            {person.suffix || ""}
                          </MenuItem>
                        ))}
                    </Select>
                  </div>
                  <Button variant="contained" onClick={onTagSubmit}>
                    submit
                  </Button>
                </div>
              </>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
}

export default AlbumPage;

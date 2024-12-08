import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  FormControl,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
} from "@mui/material";
import { rootsrc } from "../../../utils/source";
import "./AlbumForm.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { jwtDecode } from "jwt-decode";

function AlbumForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [allLocations, setAllLocations] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [userId, setUserId] = useState(null);

  // Fetch all locations
  useEffect(() => {
    fetch(`${rootsrc}/videos/locations`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAllLocations(data);
      })
      .catch((error) => {
        console.error("Error fetching all location data:", error);
      });
  }, []);

  //get user id
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const decodedToken = jwtDecode(jwt);
      setUserId(parseInt(decodedToken.sub));
    }
  }, []);

  const handleThumbnailChange = (event) => {
    setThumbnailFile(event.target.files[0]);
  };

  // Form validation
  useEffect(() => {
    if (title && thumbnailFile) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [title, thumbnailFile]);

  const onFormSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", selectedLocation);
      formData.append("year", year);
      formData.append("creator_id", userId);
      formData.append("thumbnail", thumbnailFile);

      const response = await fetch(`${rootsrc}/albums`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      window.location.reload();
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div className="album-form-container">
      <Accordion className="album-form-accordion">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Create a new album
        </AccordionSummary>
        <AccordionDetails>
          <div className="album-form">
            <FormControl>
              <TextField
                label="Title"
                variant="filled"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <TextField
                label="Year (Not required)"
                variant="filled"
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Autocomplete
                freeSolo
                fullWidth
                value={selectedLocation}
                onChange={(e, newValue) => setSelectedLocation(newValue)}
                options={allLocations}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    label="Location (Not required)"
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              />
            </FormControl>
            <FormControl>
              <TextField
                label="Description (Not required)"
                variant="filled"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <input
                style={{ display: "none" }}
                id="picture-upload"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
              />
              <label htmlFor="picture-upload">
                <Button variant="contained" component="span" fullWidth>
                  Upload Album Thumbnail
                </Button>
              </label>
            </FormControl>
            <FormControl>
              <Button
                variant="contained"
                onClick={onFormSubmit}
                sx={{ marginTop: "10px" }}
                disabled={isSubmitDisabled}
              >
                Submit
              </Button>
            </FormControl>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AlbumForm;

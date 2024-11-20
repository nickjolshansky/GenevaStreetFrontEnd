import React, { useState, useEffect, useRef } from "react";
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

function AlbumForm() {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const yearRef = useRef();
  const thumbnailFileInput = useRef();

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [allLocations, setAllLocations] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);

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

  const handleThumbnailChange = (event) => {
    setThumbnailFile(event.target.files[0]);
  };

  const onFormSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", titleRef.current.value);
      formData.append("description", descriptionRef.current.value);
      formData.append("location", selectedLocation);
      formData.append("year", yearRef.current.value);
      formData.append("creator_id", "1");
      formData.append("thumbnail", thumbnailFile);

      const response = await fetch(`${rootsrc}/albums`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      window.location.reload();
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="album-form-container">
      <Accordion sx={{}} className="album-form-accordion">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Create a new album
        </AccordionSummary>
        <AccordionDetails>
          <div className="album-form">
            <FormControl>
              <TextField
                id="standard-basic"
                label="Title"
                variant="outlined"
                inputRef={titleRef}
              />
            </FormControl>
            <FormControl>
              <TextField
                id="standard-basic"
                label="Year"
                variant="outlined"
                inputRef={yearRef}
                type="number"
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
                    label="Search Location"
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              />
            </FormControl>
            <FormControl>
              <TextField
                id="standard-basic"
                label="Description"
                variant="outlined"
                inputRef={descriptionRef}
                multiline
                rows={4}
              />
            </FormControl>
            <FormControl>
              Upload Thumbnail
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                ref={thumbnailFileInput}
              />
            </FormControl>
            <FormControl>
              <Button
                className="location-button"
                variant="contained"
                onClick={onFormSubmit}
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

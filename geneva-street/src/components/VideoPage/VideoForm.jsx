import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  TextField,
  Autocomplete,
  Box,
  Select,
  OutlinedInput,
  Chip,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { rootsrc } from "../../utils/source";
import "./VideoForm.css";

function VideoForm({ video }) {
  const [allPeople, setAllPeople] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [newTaggedPeople, setNewTaggedPeople] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const yearRef = useRef();

  //all people
  useEffect(() => {
    fetch(`${rootsrc}/people`)
      .then((response) => response.json())
      .then((data) => {
        setAllPeople(data);
      })
      .catch((error) => {
        console.error("Error fetching all people data:", error);
      });
  }, []);

  //all locations
  useEffect(() => {
    fetch(`${rootsrc}/videos/locations`)
      .then((response) => response.json())
      .then((data) => {
        setAllLocations(data);
      })
      .catch((error) => {
        console.error("Error fetching all location data:", error);
      });
  }, []);

  const onFormSubmit = async () => {
    try {
      const updateData = {};

      if (yearRef.current?.value && !isNaN(yearRef.current?.value))
        updateData.year = yearRef.current.value;

      if (selectedLocation) updateData.location = selectedLocation;

      if (newTaggedPeople.length > 0) {
        for (const person of newTaggedPeople) {
          await fetch(
            `${rootsrc}/pv/?personId=${person.id}&videoId=${video.id}`,
            {
              method: "POST",
            }
          );
        }
      }

      await fetch(`${rootsrc}/Videos/${video.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  return (
    <div className="video-form">
      <FormControl>
        <TextField
          id="standard-basic"
          label="Year"
          variant="outlined"
          inputRef={yearRef}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
        />
      </FormControl>
      <FormControl>
        <Autocomplete
          freeSolo
          value={selectedLocation}
          onChange={(event, newValue) => setSelectedLocation(newValue)}
          options={allLocations}
          getOptionLabel={(option) => option}
          isOptionEqualToValue={(option, value) => option === value}
          renderInput={(params) => <TextField {...params} label="Location" />}
        />
      </FormControl>
      <FormControl>
        <InputLabel id="person-label">Person</InputLabel>
        <Select
          labelId="person-label"
          id="select-multiple-chip"
          multiple
          value={newTaggedPeople}
          onChange={(e) => setNewTaggedPeople(e.target.value)}
          input={<OutlinedInput label="Person" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((person) => (
                <Chip
                  key={person.id}
                  label={`${person.first_name} ${person.last_name} ${
                    person.suffix || ""
                  }`}
                />
              ))}
            </Box>
          )}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 224,
                width: 250,
              },
            },
          }}
        >
          {allPeople.map((person) => (
            <MenuItem key={person.id} value={person}>
              {person.first_name} {person.last_name} {person.suffix || ""}
            </MenuItem>
          ))}
        </Select>
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
  );
}

export default VideoForm;

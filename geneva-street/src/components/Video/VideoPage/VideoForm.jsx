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
import { rootsrc } from "../../../utils/source";
import "./VideoForm.css";

function VideoForm({ video }) {
  const [yearValue, setYearValue] = useState(null);
  const [allPeople, setAllPeople] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [newTaggedPeople, setNewTaggedPeople] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);

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

  //all locations
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

  const onFormSubmit = async () => {
    try {
      setSubmitStatus("submitting");
      const updateData = {};

      if (yearValue && !isNaN(yearValue)) updateData.year = yearValue;

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

      const response = await fetch(`${rootsrc}/Videos/${video.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) throw new Error("Submission failed");
      setSubmitStatus("success");
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error("Error making API call:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  return (
    <div className="video-form">
      <FormControl>
        <TextField
          sx={{
            color: "black",
            bgcolor: "accent.main",
            borderRadius: "4px",
          }}
          id="standard-basic"
          label="Year (Not required)"
          variant="outlined"
          value={yearValue}
          onChange={(e) => setYearValue(e.target.value)}
          type="number"
        />
      </FormControl>
      <FormControl>
        <Autocomplete
          freeSolo
          value={selectedLocation}
          onChange={(event, newValue) => setSelectedLocation(newValue)}
          options={allLocations.sort()}
          getOptionLabel={(option) => option}
          isOptionEqualToValue={(option, value) => option === value}
          renderInput={(params) => (
            <TextField {...params} label="Location (Not required)" />
          )}
        />
      </FormControl>
      <FormControl>
        <InputLabel id="person-label">People (Not required)</InputLabel>
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
          {allPeople
            .sort((a, b) => {
              const firstNameCompare = a.first_name.localeCompare(b.first_name);
              if (firstNameCompare !== 0) return firstNameCompare;
              return a.last_name.localeCompare(b.last_name);
            })
            .map((person) => (
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
          disabled={
            submitStatus === "submitting" ||
            (!selectedLocation && !yearValue && newTaggedPeople.length === 0)
          }
        >
          {submitStatus === "submitting" ? "Submitting..." : "Submit"}
        </Button>
        {submitStatus === "success" && (
          <Box sx={{ color: "success.main", textAlign: "center", mt: 1 }}>
            Video updated successfully!
          </Box>
        )}
        {submitStatus === "error" && (
          <Box sx={{ color: "error.main", textAlign: "center", mt: 1 }}>
            Failed to update video. Please try again.
          </Box>
        )}
      </FormControl>
    </div>
  );
}

export default VideoForm;

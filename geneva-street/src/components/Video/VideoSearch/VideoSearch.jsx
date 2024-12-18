import React, { useState, useEffect, useRef } from "react";
import "./VideoSearch.css";
import { rootsrc, profilesrc } from "../../../utils/source";
import {
  TextField,
  Slider,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Tooltip,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import VideoGrid from "../VideoGrid/VideoGrid";

function VideoSearch() {
  const [allPeople, setAllPeople] = useState([]);
  const [allLocations, setAllLocations] = useState([]);

  const [selectedPeople, setSelectedPeople] = useState([]);
  const [yearRange, setYearRange] = useState([1960, 2024]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [searchedVideos, setSearchedVideos] = useState([]);

  const [searchExpanded, setSearchExpanded] = useState(false);
  const searchTitleRef = useRef(null);

  //Just for getting all video data
  useEffect(() => {
    fetch(`${rootsrc}/videos`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchedVideos(data);
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
      });
  }, []);

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

  //scrolling on people
  useEffect(() => {
    const iconContainer = document.getElementById("icon-container-id");

    const handleWheel = (event) => {
      if (iconContainer.scrollWidth > iconContainer.clientWidth) {
        event.preventDefault();
        iconContainer.scrollLeft += event.deltaY;
      }
    };

    iconContainer.addEventListener("wheel", handleWheel);

    return () => {
      iconContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const onPersonSelect = (e, person) => {
    setSelectedPeople((prevSelected) => {
      if (prevSelected.includes(person.id)) {
        return prevSelected.filter((id) => id !== person.id);
      } else {
        return [...prevSelected, person.id];
      }
    });
  };

  function onSubmit() {
    if (searchExpanded) {
      let searchTerms = {
        title: searchTitleRef.current.value,
        yearRange:
          yearRange[0] === 1960 && yearRange[1] === 2024 ? null : yearRange,
        people: selectedPeople.length === 0 ? null : selectedPeople,
        location: selectedLocation,
      };

      fetch(`${rootsrc}/Videos/search/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchTerms),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setSearchedVideos(Array.isArray(data) ? data : []);
        })
        .catch((error) => {
          console.error("Error fetching all location data:", error);
        });
    } else {
      fetch(`${rootsrc}/Videos/title/${searchTitleRef.current.value}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setSearchedVideos(Array.isArray(data) ? data : []);
        })
        .catch((error) => {
          console.error("Error fetching all location data:", error);
        });
    }
  }

  return (
    <>
      <div className="search-accordion-container">
        <h1 style={{ textAlign: "center" }}>Videos</h1>
        <Accordion
          disableGutters
          onChange={(e, isExpanded) => setSearchExpanded(isExpanded)}
        >
          <AccordionSummary expandIcon={<TuneIcon />}>
            <div className="search-input">
              <TextField
                fullWidth
                inputRef={searchTitleRef}
                label="Search Keyword"
                variant="filled"
                onClick={(e) => e.stopPropagation()}
              />
              <Button
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
                  onSubmit();
                }}
              >
                Submit
              </Button>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="search-accordion">
              <div id="icon-container-id" className="icon-container">
                {allPeople.length > 0 &&
                  allPeople.map((person) => (
                    <Tooltip title={person.first_name} key={person.id}>
                      <img
                        key={person.id}
                        className={`icon ${
                          selectedPeople.includes(person.id)
                            ? "icon-selected"
                            : ""
                        }`}
                        src={`${profilesrc}${person.picture}`}
                        alt={person.first_name}
                        onClick={(e) => onPersonSelect(e, person)}
                      />
                    </Tooltip>
                  ))}
              </div>
              <div className="search-slider">
                <span>{yearRange[0]}</span>
                <Slider
                  value={yearRange}
                  onChange={(e, newValue) => setYearRange(newValue)}
                  valueLabelDisplay="auto"
                  min={1960}
                  max={2024}
                />
                <span>{yearRange[1]}</span>
              </div>
              <div className="search-location">
                <Autocomplete
                  freeSolo
                  fullWidth
                  value={selectedLocation}
                  onChange={(e, newValue) => setSelectedLocation(newValue)}
                  options={allLocations.sort()}
                  getOptionLabel={(option) => option}
                  isOptionEqualToValue={(option, value) => option === value}
                  renderInput={(params) => (
                    <TextField
                      variant="filled"
                      {...params}
                      label="Search Location"
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <VideoGrid videos={searchedVideos} />
    </>
  );
}

export default VideoSearch;

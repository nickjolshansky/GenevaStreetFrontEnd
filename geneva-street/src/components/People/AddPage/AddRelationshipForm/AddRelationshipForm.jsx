import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Autocomplete,
  FormControl,
} from "@mui/material";
import { rootsrc } from "../../../../utils/source";

const AddRelationshipForm = () => {
  const [allPeople, setAllPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedRelatedPerson, setSelectedRelatedPerson] = useState(null);
  const [relType, setRelType] = useState(null);
  const relTypes = ["parent", "sibling", "partner", "child"];
  const [submitStatus, setSubmitStatus] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedPerson || !selectedRelatedPerson || !relType) return null;

    setSubmitStatus("submitting");

    const formData = {
      person_id: selectedPerson.id,
      related_person_id: selectedRelatedPerson.id,
      relationship_type: relType,
    };

    fetch(`${rootsrc}/relationship`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Submission failed");
        setSubmitStatus("success");
        setTimeout(() => setSubmitStatus(null), 3000);
      })
      .catch((error) => {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus(null), 3000);
      });
  };

  const getPersonLabel = (person) => {
    if (!person) return "";
    return `${person.first_name} ${person.last_name} ${
      person.suffix ?? ""
    }`.trim();
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mt: 4,
          backgroundColor: "green.main",
          color: "green.contrast",
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Connect two people together
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <FormControl fullWidth margin="normal">
            <Autocomplete
              id="related-person-select"
              options={allPeople.sort((a, b) => {
                const firstNameCompare = a.first_name.localeCompare(
                  b.first_name
                );
                if (firstNameCompare !== 0) return firstNameCompare;
                return a.last_name.localeCompare(b.last_name);
              })}
              value={selectedRelatedPerson}
              onChange={(e, newValue) => setSelectedRelatedPerson(newValue)}
              getOptionLabel={getPersonLabel}
              renderInput={(params) => (
                <TextField {...params} label="Select Person" variant="filled" />
              )}
            />
          </FormControl>
          <Typography
            variant="h5"
            component="h4"
            marginLeft="1rem"
            marginTop="0.4rem"
          >
            is a
          </Typography>
          <FormControl fullWidth margin="normal">
            <Autocomplete
              id="relationship-type"
              options={relTypes}
              value={relType}
              onChange={(e, newValue) => setRelType(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Relationship Type"
                  variant="filled"
                />
              )}
            />
          </FormControl>
          <Typography
            variant="h5"
            component="h2"
            marginLeft="1rem"
            marginTop="0.4rem"
          >
            of
          </Typography>
          <FormControl fullWidth margin="normal">
            <Autocomplete
              id="person-select"
              options={allPeople.sort((a, b) => {
                const firstNameCompare = a.first_name.localeCompare(
                  b.first_name
                );
                if (firstNameCompare !== 0) return firstNameCompare;
                return a.last_name.localeCompare(b.last_name);
              })}
              value={selectedPerson}
              onChange={(e, newValue) => setSelectedPerson(newValue)}
              getOptionLabel={getPersonLabel}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Related Person"
                  variant="filled"
                />
              )}
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={
              submitStatus === "submitting" ||
              !selectedPerson ||
              !selectedRelatedPerson ||
              !setRelType
            }
            sx={{ mt: 3, mb: 2 }}
          >
            {submitStatus === "submitting"
              ? "Submitting..."
              : "Add Relationship"}
          </Button>
          {submitStatus === "success" && (
            <Typography color="success.main" textAlign="center">
              Relationship added successfully!
            </Typography>
          )}
          {submitStatus === "error" && (
            <Typography color="error.main" textAlign="center">
              Failed to add relationship. Please try again.
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default AddRelationshipForm;

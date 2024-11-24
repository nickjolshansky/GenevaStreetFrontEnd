import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { rootsrc } from "../../../../utils/source";

const AddPersonForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    suffix: "",
    nick_name: "",
    date_of_birth: null,
    date_of_passing: null,
  });
  const [file, setFile] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (name) => (date) => {
    setFormData((prev) => ({
      ...prev,
      [name]: date,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const resetForm = () => {
    setFormData({
      first_name: "",
      last_name: "",
      suffix: "",
      nick_name: "",
      date_of_birth: null,
      date_of_passing: null,
    });
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formattedData = {
        ...formData,
        date_of_birth: formData.date_of_birth
          ? formData.date_of_birth.format("YYYY-MM-DD")
          : null,
        date_of_passing: formData.date_of_passing
          ? formData.date_of_passing.format("YYYY-MM-DD")
          : null,
      };

      const formDataToSend = new FormData();
      for (const key in formattedData) {
        if (formattedData[key] != null) {
          formDataToSend.append(key, formattedData[key]);
        }
      }

      if (file) {
        formDataToSend.append("file", file);
      }

      // Log form data
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      const response = await fetch(`${rootsrc}/people`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      setSubmitStatus("success");
      resetForm();

      setTimeout(() => {
        setSubmitStatus(null);
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(error.message);
      setSubmitStatus("error");

      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 4, backgroundColor: "green.main" }}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ color: "green.contrast" }}
        >
          Add New Person
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="first_name"
            label="First Name"
            name="first_name"
            variant="filled"
            value={formData.first_name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="last_name"
            label="Last Name"
            name="last_name"
            variant="filled"
            value={formData.last_name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="suffix"
            label="Suffix (eg. III) (not required)"
            name="suffix"
            variant="filled"
            value={formData.suffix}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="nick_name"
            label="Nickname (not required)"
            name="nick_name"
            variant="filled"
            value={formData.nick_name}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Birth (not required)"
              value={formData.date_of_birth}
              onChange={handleDateChange("date_of_birth")}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: "normal",
                  variant: "filled",
                },
              }}
            />
            <DatePicker
              label="Date of Passing (not required)"
              value={formData.date_of_passing}
              onChange={handleDateChange("date_of_passing")}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: "normal",
                  variant: "filled",
                },
              }}
            />
          </LocalizationProvider>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="picture"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="picture">
            <Button
              variant="contained"
              component="span"
              fullWidth
              sx={{ mt: 2, mb: 2 }}
            >
              Upload Profile Picture
            </Button>
          </label>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={
              isSubmitting || !formData.first_name || !formData.last_name
            }
          >
            {isSubmitting ? "Adding Person..." : "Add Person"}
          </Button>

          {submitStatus === "success" && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Person added successfully!
            </Alert>
          )}
          {submitStatus === "error" && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Failed to add person. Please try again.
            </Alert>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default AddPersonForm;

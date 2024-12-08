import React, { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";
import "./ContactPage.css";
import { rootsrc } from "../../utils/source";
import { jwtDecode } from "jwt-decode";

const ContactPage = () => {
  const [feedbackText, setFeedbackText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [userId, setUserId] = useState(null);

  //get user id
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const decodedToken = jwtDecode(jwt);
      setUserId(parseInt(decodedToken.sub));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedback = {
      feedbackText: feedbackText,
      feedbackPersonId: userId,
    };

    try {
      const response = await fetch(`${rootsrc}/feedbacks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error("Failed to submit feedback");
        console.log(response);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="contact-page-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <Typography variant="h5" component="h2">
          Feedback
        </Typography>
        <Typography component="h4">
          If you find something wrong or just want to leave a comment
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          multiline
          rows={4}
          id="feedbackText"
          label=""
          name="feedbackText"
          variant="filled"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!feedbackText}
        >
          Submit
        </Button>
        {submitted && (
          <p className="success-message">
            Thank you! I'll probably see this someday!
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactPage;

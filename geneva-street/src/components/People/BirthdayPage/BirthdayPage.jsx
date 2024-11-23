import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { rootsrc } from "../../../utils/source";

dayjs.extend(isSameOrBefore);

const BirthdayPage = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const today = dayjs();

  useEffect(() => {
    setLoading(true);
    fetch(`${rootsrc}/people`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch people");
        }
        return response.json();
      })
      .then((data) => {
        setPeople(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching all people data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          maxWidth: 600,
          margin: "0 auto",
          padding: 2,
          textAlign: "center",
        }}
      >
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  const birthdaysThisMonth = people
    .filter((person) => dayjs(person.date_of_birth).month() === today.month())
    .sort((a, b) => {
      const dayA = dayjs(a.date_of_birth).date();
      const dayB = dayjs(b.date_of_birth).date();
      return dayA - dayB;
    });

  const todaysBirthdays = birthdaysThisMonth.filter(
    (person) =>
      dayjs(person.date_of_birth).date() === today.date() &&
      dayjs(person.date_of_birth).month() === today.month()
  );

  const otherBirthdays = birthdaysThisMonth.filter(
    (person) =>
      !(
        dayjs(person.date_of_birth).date() === today.date() &&
        dayjs(person.date_of_birth).month() === today.month()
      )
  );

  return (
    <Box
      sx={{
        maxWidth: 600,
        maxHeight: "70dvh",
        overflowY: "auto",
        margin: "0 auto",
        padding: 2,
        textAlign: "center",
        backgroundColor: "green.main",
        color: "green.contrast",
      }}
    >
      {/* Today's Birthdays */}
      {todaysBirthdays.length > 0 && (
        <Box mb={3}>
          <Typography
            variant="h5"
            gutterBottom
            color="primary"
            sx={{ textAlign: "center", color: "green.contrast" }}
          >
            🎉 Today's Birthdays
          </Typography>
          {todaysBirthdays.map((person) => (
            <Card
              key={`${person.first_name}-${person.last_name}`}
              sx={{
                mb: 1,
                backgroundColor: "primary.light",
                color: "primary.contrastText",
                textAlign: "center",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  {person.first_name} {person.last_name}
                </Typography>
                <Typography variant="body2" sx={{ textAlign: "center" }}>
                  {dayjs(person.date_of_birth).format("MMMM D")}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Other Birthdays This Month */}
      <Paper
        elevation={2}
        sx={{ backgroundColor: "green.main", color: "green.contrast" }}
      >
        <Typography
          variant="h5"
          sx={{
            p: 1,
            backgroundColor: "green.main",
            textAlign: "center",
          }}
        >
          Birthdays This Month
        </Typography>
        <List sx={{ textAlign: "center", color: "green.contrast" }}>
          {otherBirthdays.map((person, index) => (
            <ListItem
              key={`${person.first_name}-${person.last_name}`}
              sx={{
                backgroundColor: index % 2 === 0 ? "green.dark" : "green.main", // Alternating background color
              }}
            >
              <ListItemText
                sx={{ textAlign: "center" }}
                primary={`${person.first_name} ${person.last_name}`}
                secondaryTypographyProps={{ sx: { color: "green.contrast" } }}
                secondary={dayjs(person.date_of_birth).format("MMMM D")}
              />
            </ListItem>
          ))}
          {otherBirthdays.length === 0 && (
            <ListItem>
              <ListItemText
                sx={{ textAlign: "center" }}
                primary="No birthdays this month"
              />
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default BirthdayPage;

import React, { useState, useEffect } from "react";
import {
  TextField,
  Autocomplete,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { rootsrc } from "../../../utils/source";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./LoginPage.css";

const LoginPage = () => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [allPeople, setAllPeople] = useState([]);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("jwt");

  // Fetch all people
  useEffect(() => {
    fetch(`${rootsrc}/people`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setAllPeople(data))
      .catch((error) => {
        console.error("Error fetching all people data:", error);
      });
  }, []);

  // Set user if already logged in
  useEffect(() => {
    if (isLoggedIn && allPeople.length > 0) {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        const decodedToken = jwtDecode(jwt);
        setUser(
          allPeople.find((person) => person.id === parseInt(decodedToken.sub))
        );
      }
    }
  }, [isLoggedIn, allPeople]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${rootsrc}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personId: selectedPerson.id,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid user ID or password");
      }

      const data = await response.json();
      setMessage("Login successful!");
      localStorage.setItem("jwt", data.token);

      const from = location.state?.from?.pathname || "/videos";
      navigate(from, { replace: true });

      window.location.reload();
    } catch (error) {
      setMessage("Invalid user ID or password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setMessage("Logged out successfully");
    navigate("/login");
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New passwords don't match!");
      return;
    }

    try {
      const response = await fetch(`${rootsrc}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          personId: user.id,
          oldPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to change password");
      }

      setMessage("Password changed successfully!");
      setShowChangePassword(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage(
        "Failed to change password. Please check your current password."
      );
    }
  };

  return (
    <Box className="login-page-container" sx={{ padding: 3 }}>
      {isLoggedIn && (
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Welcome back {user?.first_name || "Guest"}!
        </Typography>
      )}
      <Box
        className="login-form-container"
        sx={{
          width: "100%",
          maxWidth: 400,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {!showChangePassword ? (
          <form onSubmit={handleLogin} className="form">
            {!isLoggedIn && (
              <>
                <div>
                  <h2>Login</h2>
                  <p>You need to be logged in to view the site</p>
                </div>
                <Autocomplete
                  options={allPeople}
                  value={selectedPerson}
                  onChange={(event, newValue) => setSelectedPerson(newValue)}
                  getOptionLabel={(option) => {
                    if (!option || typeof option !== "object") return "";

                    const firstName = option.first_name || "";
                    const lastName = option.last_name || "";
                    const suffix = option.suffix || "";

                    return `${firstName} ${lastName} ${suffix}`.trim();
                  }}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      label="Who are you?"
                      variant="outlined"
                      required
                      sx={{ marginBottom: 2 }}
                    />
                  )}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  sx={{ marginBottom: 2 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ marginBottom: 2 }}
                >
                  Login
                </Button>
              </>
            )}
            {isLoggedIn && (
              <Box className="alter-login-buttons">
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleLogout}
                  sx={{ marginBottom: 1 }}
                >
                  Logout
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setShowChangePassword(true)}
                >
                  Change Password
                </Button>
              </Box>
            )}
            <Typography color="green.contrast" sx={{ marginTop: 2 }}>
              {message}
            </Typography>
          </form>
        ) : (
          <form onSubmit={handleChangePassword}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Change Password
            </Typography>
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              sx={{ marginBottom: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ marginBottom: 1 }}
            >
              Change Password
            </Button>
            <Button
              type="button"
              fullWidth
              variant="outlined"
              onClick={() => setShowChangePassword(false)}
            >
              Back to Login
            </Button>
            <Typography color="error" sx={{ marginTop: 2 }}>
              {message}
            </Typography>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default LoginPage;

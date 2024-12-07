import React from "react";
import { Routes, Route, HashRouter, Navigate } from "react-router-dom";
import "./App.css";
import VideoPage from "./components/Video/VideoPage/VideoPage.jsx";
import Nav from "./components/Nav/Nav.jsx";
import VideoSearch from "./components/Video/VideoSearch/VideoSearch";
import UnityTest from "./components/UnityTest/UnityTest.jsx";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme";
import "./theme/variables.css";
import AlbumGrid from "./components/Album/AlbumGrid/AlbumGrid.jsx";
import AlbumPage from "./components/Album/AlbumPage/AlbumPage.jsx";
import PersonPage from "./components/People/PersonPage/PersonPage.jsx";
import AddPage from "./components/People/AddPage/AddPage.jsx";
import BirthdayPage from "./components/People/BirthdayPage/BirthdayPage.jsx";
import ContactPage from "./components/Contact/ContactPage.jsx";
import LoginPage from "./components/People/Login/LoginPage.jsx";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("jwt");
  const isTokenValid = (token) => {
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem("jwt");
        console.log("removed");
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  if (!token || !isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <div className="app">
          <Nav />
          <div className="under-nav">
            <Routes>
              {/* Public route */}
              <Route path="/login" element={<LoginPage />} />

              {/* Protected routes */}
              <Route
                path="/unity"
                element={
                  <ProtectedRoute>
                    <UnityTest />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/videos"
                element={
                  <ProtectedRoute>
                    <VideoSearch />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/videos/:id"
                element={
                  <ProtectedRoute>
                    <VideoPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/albums"
                element={
                  <ProtectedRoute>
                    <AlbumGrid />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/albums/:id"
                element={
                  <ProtectedRoute>
                    <AlbumPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/person/:id"
                element={
                  <ProtectedRoute>
                    <PersonPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/birthdays"
                element={
                  <ProtectedRoute>
                    <BirthdayPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add"
                element={
                  <ProtectedRoute>
                    <AddPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/contact"
                element={
                  <ProtectedRoute>
                    <ContactPage />
                  </ProtectedRoute>
                }
              />

              {/* Redirect root to a default route */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Navigate to="/videos" replace />
                  </ProtectedRoute>
                }
              />

              {/* Catch all other routes */}
              <Route
                path="*"
                element={
                  <ProtectedRoute>
                    <Navigate to="/videos" replace />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Nav />
        <div className="under-nav">
          <Routes>
            <Route path="/unity" element={<UnityTest />} />
            <Route path="/videos" element={<VideoSearch />} />
            <Route path="/videos/:id" element={<VideoPage />} />
            <Route path="/albums" element={<AlbumGrid />} />
            <Route path="/albums/:id" element={<AlbumPage />} />
            <Route path="/person/:id" element={<PersonPage />} />
            <Route path="/birthdays" element={<BirthdayPage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

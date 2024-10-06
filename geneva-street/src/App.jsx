import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import VideoGrid from "./components/VideoGrid/VideoGrid.jsx";
import VideoPage from "./components/VideoPage/VideoPage.jsx";
import Nav from "./components/Nav/Nav.jsx";
import VideoSearch from "./components/VideoSearch/VideoSearch";

function App() {
  return (
    <div className="app">
      <Nav />
      <Routes>
        <Route path="/videos" element={<VideoSearch />} />
        <Route path="/videos/:id" element={<VideoPage />} />
      </Routes>
    </div>
  );
}

export default App;

//time stamp in thumbnail

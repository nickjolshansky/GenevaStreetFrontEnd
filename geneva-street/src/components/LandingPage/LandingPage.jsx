import React, { useState } from "react";
import {} from "@mui/material";
import "./LandingPage.css";
import logoImg from "../../../public/logo.png";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <img src={logoImg} width={"500"} />
      <div className="inspo-videos">
        <iframe
          src={`https://www.youtube.com/embed/oKOW30gSMuE`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <iframe
          src={`https://www.youtube.com/embed/wH6ZCIRjI14`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default LandingPage;

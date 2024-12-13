import React, { useState } from "react";
import {} from "@mui/material";
import "./LandingPage.css";
import logoImg from "../../../public/logo.png";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <img src={logoImg} className="logo" />
      <p>
        Geneva Street is a grassroots attempt to digitize the records of our
        predecessors.
        <br />
        <br />
        Physical recorded data decays with age and becomes obsolete. Film spools
        distort in their plastic chrysalis, exposed edges soften, fray, and
        yellow against exposure, voices warped out of recognition, and the
        identity of those captured are lost simply due to the loss of anyone
        that would recognize them. <br />
        <br />
        It is time travel preserved in imperfect, plastic amber, replayed by
        grandchildren on our magic mirrors. It is a method of reflection of not
        only those recorded, but of those watching. This property of physically
        recorded media- this creature, this endangered animal, is just as mortal
        as the figures it is tasked to preserve.
      </p>
      <div className="forgotten">
        Here is to the forgotten familiar things that hideout in our memories.
      </div>
      <p>
        Special thanks to the fathers and children behind the camera. <br />
        <br />
        Special thanks to the mothers who always knew to keep the tapes and kept
        them as safe as they knew how in a bin in storage for decades, waiting
        for the next generation to take up the task of preserving the first and
        last living records of those before us.
        <br />
        <br />
        <br />
        <br />
        And special thanks to these videos for providing insporation on this
        project.
      </p>
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

      <p>Version 1.0</p>
    </div>
  );
};

export default LandingPage;

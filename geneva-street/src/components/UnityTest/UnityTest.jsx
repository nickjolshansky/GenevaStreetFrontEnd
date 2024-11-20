import React from "react";
import "./UnityTest.css";
import { rootsrc } from "./../../utils/source";

function UnityTest() {
  return (
    <div className="unity-container">
      <iframe
        className="unity"
        src="https://nickjolshansky.github.io/WormWafu/"
        title="Worm Wafu"
        width="1280"
        height="720"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default UnityTest;

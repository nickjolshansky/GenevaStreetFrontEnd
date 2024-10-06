import React from "react";
import "./Nav.css";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import VideocamIcon from "@mui/icons-material/Videocam";
import CollectionsIcon from "@mui/icons-material/Collections";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="nav">
      <FamilyRestroomIcon />
      <Link to="/videos">
        <VideocamIcon />
      </Link>
      <CollectionsIcon />
      <VideogameAssetIcon />
      <PersonSearchIcon />
      <HowToVoteIcon />
    </div>
  );
}

export default Nav;
